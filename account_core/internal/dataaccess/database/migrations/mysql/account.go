package database

import (
	"context"
	"errors"
	"time"

	"go.uber.org/zap"
)

var (
	ErrAccountNotFound      = errors.New("account not found")
	ErrAccountAlreadyExists = errors.New("account already exists")
)

type Account struct {
	ID        uint64    `gorm:"column:id;primaryKey"`
	Email     string    `gorm:"column:email"`
	Name      string    `gorm:"column:name"`
	Picture   string    `gorm:"column:picture"`
	CreatedAt time.Time `gorm:"column:created_at"`
	UpdatedAt time.Time `gorm:"column:updated_at"`
}

type AccountDataAccessor interface {
	GetAccountByID(ctx context.Context, id uint64) (Account, error)
}

func NewAccountDataAccessor(database Database, logger *zap.Logger) AccountDataAccessor {
	return &accountDataAccessor{
		database: database,
		logger:   logger,
	}
}

type accountDataAccessor struct {
	database Database
	logger   *zap.Logger
}

// GetAccountByID implements AccountDataAccessor.
func (a *accountDataAccessor) GetAccountByID(ctx context.Context, id uint64) (Account, error) {
	panic("implement me")
}