package database

import (
	"context"

	"go.uber.org/zap"
	"gorm.io/gorm"
)

type PublicKey struct {
	Id    uint64 `gorm:"column:id;primaryKey"`
	Value []byte `gorm:"column:value"`
}

type PublicKeyDataAccessor interface {
	CreatePublicKey(ctx context.Context, value []byte) (id uint64, err error)
	GetPublicKey(ctx context.Context, id uint64) (publicKey PublicKey, err error)
}

func NewPublicKeyDataAccessor(
	database Database,
	logger *zap.Logger,
) (PublicKeyDataAccessor, error) {
	return &publicKeyDataAccessor{
		database: database,
		logger:   logger,
	}, nil
}

type publicKeyDataAccessor struct {
	database Database
	logger   *zap.Logger
}

// CreatePublicKey implements PublicKeyDataAccessor.
func (p *publicKeyDataAccessor) CreatePublicKey(ctx context.Context, value []byte) (uint64, error) {
	var publicKey = PublicKey{
		Value: value,
	}

	txErr := p.database.Transaction(
		func(tx *gorm.DB) error {
			if err := tx.Create(&publicKey).Error; err != nil {
				return err
			}

			return nil
		},
	)
	if txErr != nil {
		p.logger.Error("failed to create public key", zap.Error(txErr))
		return 0, txErr
	}

	return publicKey.Id, nil
}

// GetPublicKey implements PublicKeyDataAccessor.
func (p *publicKeyDataAccessor) GetPublicKey(ctx context.Context, id uint64) (PublicKey, error) {
	var publicKey PublicKey
	err := p.database.First(&publicKey, id).Error
	if err != nil {
		p.logger.Error("failed to get public key", zap.Error(err))
		return PublicKey{}, err
	}

	return publicKey, nil
}