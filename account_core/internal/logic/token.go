package logic

import (
	"auth_service/internal/configs"
	"auth_service/internal/dataaccess/cache"
	"auth_service/internal/dataaccess/database"
	"context"
	"crypto/rand"
	"crypto/rsa"
	"crypto/x509"
	"encoding/pem"
	"errors"
	"fmt"
	"time"

	"github.com/golang-jwt/jwt/v5"
	"go.uber.org/zap"
)

type TokenLogic interface {
	CreateTokenString(ctx context.Context, accountId uint64) (tokenString string, err error)
	VerifyTokenString(ctx context.Context, tokenString string) (accountId uint64, expiresAt time.Time, err error)
}

func NewTokenLogic(
	logger *zap.Logger,
	publicKeyDataAccessor database.PublicKeyDataAccessor,
	publicKeyCache cache.PublicKeyCache,
	tokenConfig configs.Token,
) (TokenLogic, error) {

	rsaKeyPair, err := generateRSAKeyPair(int(tokenConfig.RS512KeyPairBitSize))
	if err != nil {
		logger.Error("failed to generate RSA key pair", zap.Error(err))
		return nil, err
	}

	publicKeyValueInBytes, err := pemEncodePublicKey(&rsaKeyPair.PublicKey)
	if err != nil {
		logger.Error("failed to encode public key in pem format", zap.Error(err))
		return nil, err
	}

	pubicKeyId, err := publicKeyDataAccessor.CreatePublicKey(
		context.Background(),
		publicKeyValueInBytes,
	)
	if err != nil {
		logger.Error("failed to create token public key", zap.Error(err))
		return nil, err
	}
	err = publicKeyCache.Set(context.Background(), fmt.Sprint(pubicKeyId), publicKeyValueInBytes)
	if err != nil {
		logger.With(zap.Error(err)).Warn("can not set public key in cache")
	}

	return &tokenLogic{
		logger:                logger,
		publicKeyDataAccessor: publicKeyDataAccessor,
		publicKeyCache:        publicKeyCache,
		publicKeyId:           pubicKeyId,
		privateKey:            rsaKeyPair,
		tokenConfig:           tokenConfig,
	}, nil
}

type tokenLogic struct {
	logger                *zap.Logger
	publicKeyDataAccessor database.PublicKeyDataAccessor
	publicKeyCache        cache.PublicKeyCache
	publicKeyId           uint64
	privateKey            *rsa.PrivateKey
	tokenConfig           configs.Token
}

// CreateTokenString implements TokenLogic.
func (t *tokenLogic) CreateTokenString(ctx context.Context, accountId uint64) (tokenString string, err error) {
	logger := t.logger

	expiresAt := time.Now().Add(t.tokenConfig.GetTokenDuration())
	token := jwt.NewWithClaims(jwt.SigningMethodRS512, jwt.MapClaims{
		"sub": accountId,
		"exp": expiresAt.Unix(),
		"kid": t.publicKeyId,
	})

	tokenString, err = token.SignedString(t.privateKey)
	if err != nil {
		logger.Error("failed signing token", zap.Error(err))
		return "", nil
	}

	return tokenString, nil
}

// VerifyTokenString implements TokenLogic.
func (t *tokenLogic) VerifyTokenString(ctx context.Context, tokenString string) (accountId uint64, expiresAt time.Time, err error) {
	logger := t.logger

	keyFunc := func(parsedToken *jwt.Token) (interface{}, error) {
		if _, ok := parsedToken.Method.(*jwt.SigningMethodRSA); !ok {
			logger.Error("unexpected signing method")
			return nil, errors.New("unexpected signing method")
		}

		claims, ok := parsedToken.Claims.(jwt.MapClaims)
		if !ok {
			logger.Error("cannot get token's claims")
			return nil, errors.New("cannot get token's claims")
		}

		publicKeyId, ok := claims["kid"].(float64)
		if !ok {
			logger.Error("cannot get token's kid claim")
			return nil, errors.New("cannot get token's kid claim")
		}

		publicKeyValue, err := t.getJWTPublicKeyValue(ctx, uint64(publicKeyId))
		if err != nil {
			logger.Error("cannot get public key's value")
			return nil, err
		}

		return publicKeyValue, nil
	}
	parsedToken, err := jwt.Parse(tokenString, keyFunc)
	if err != nil {
		logger.Error("cannot parse token", zap.Error(err))
		return 0, time.Time{}, err
	}

	if !parsedToken.Valid {
		logger.Error("invalid token")
		return 0, time.Time{}, errors.New("invalid token")
	}

	claims, ok := parsedToken.Claims.(jwt.MapClaims)
	if !ok {
		logger.Error("cannot get token's claims")
		return 0, time.Time{}, errors.New("cannot get token's claims")
	}

	accountID, ok := claims["sub"].(float64)
	if !ok {
		logger.Error("cannot get token's sub claim")
		return 0, time.Time{}, errors.New("cannot get token's sub claim")
	}

	expiresAtUnix, ok := claims["exp"].(float64)
	if !ok {
		logger.Error("cannot get token's exp claim")
		return 0, time.Time{}, errors.New("cannot get token's exp claim")
	}

	return uint64(accountID), time.Unix(int64(expiresAtUnix), 0), nil
}

func generateRSAKeyPair(bits int) (*rsa.PrivateKey, error) {
	privateKeyPair, err := rsa.GenerateKey(rand.Reader, bits)
	if err != nil {
		return nil, err
	}

	return privateKeyPair, nil
}

func (t *tokenLogic) getJWTPublicKeyValue(ctx context.Context, publicKeyId uint64) (*rsa.PublicKey, error) {
	logger := t.logger.With(zap.Uint64("publicKeyId", publicKeyId))

	var publicKey database.PublicKey

	cacheHit := true
	bytes, err := t.publicKeyCache.Get(ctx, fmt.Sprintf("%d", publicKeyId))
	if err != nil {
		logger.With(zap.Error(err)).Warn("failed to get publicKeyValue from cache, will fall back to database")
		cacheHit = false
	} else {
		publicKey = database.PublicKey{
			Id:    publicKeyId,
			Value: bytes,
		}
	}

	if !cacheHit {
		publicKey, err = t.publicKeyDataAccessor.GetPublicKey(ctx, publicKeyId)
		if err != nil {
			logger.Error("cannot get token's public key from database", zap.Error(err))
			return nil, err
		}
	}

	return jwt.ParseRSAPublicKeyFromPEM(publicKey.Value)
}

func pemEncodePublicKey(pubKey *rsa.PublicKey) ([]byte, error) {
	pubBytes, err := x509.MarshalPKIXPublicKey(pubKey)
	if err != nil {
		return nil, err
	}
	block := &pem.Block{
		Type:  "PUBLIC KEY",
		Bytes: pubBytes,
	}

	return pem.EncodeToMemory(block), nil
}