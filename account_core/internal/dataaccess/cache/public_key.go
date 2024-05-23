package cache

import (
	"context"
	"encoding/base64"
	"errors"
	"fmt"
)

var (
	publicKeyIdPrefix string = "public_key:"
)

type PublicKeyCache interface {
	Set(ctx context.Context, publicKeyId string, publicKeyValue []byte) error
	Get(ctx context.Context, publicKeyId string) ([]byte, error)
}

func NewPublicKeyCache(client Client) (PublicKeyCache, error) {
	return &publicKeyCache{
		client: client,
	}, nil
}

type publicKeyCache struct {
	client Client
}

// Get implements TokenPublicKey.
func (p *publicKeyCache) Get(ctx context.Context, publicKeyId string) ([]byte, error) {
	key := p.getCacheKey(publicKeyId)
	value, err := p.client.Get(ctx, key)
	if err != nil {
		return []byte{}, err
	}

	stringValue, ok := value.(string)
	if !ok {
		return []byte{}, errors.New("cached value is not a string")
	}

	publicKeyValue, err := p.decodeBase64(stringValue)
	if err != nil {
		return []byte{}, err
	}

	return publicKeyValue, nil
}

// Set implements TokenPublicKey.
func (p *publicKeyCache) Set(ctx context.Context, publicKeyId string, publicKeyValue []byte) error {
	key := p.getCacheKey(publicKeyId)
	value := p.encodeBase64(publicKeyValue)
	return p.client.Set(ctx, key, value, 0)
}

func (p *publicKeyCache) encodeBase64(bytes []byte) string {
	return base64.StdEncoding.EncodeToString(bytes)
}

func (p *publicKeyCache) decodeBase64(s string) ([]byte, error) {
	return base64.StdEncoding.DecodeString(s)
}

func (p *publicKeyCache) getCacheKey(publicKeyId string) string {
	return fmt.Sprintf("%s:%s", publicKeyIdPrefix, publicKeyId)
}