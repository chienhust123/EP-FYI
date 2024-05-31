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
	GetAccountByID(ctx context.Context, id uint64) (*Account, error)
	GetAccountByEmail(ctx context.Context, email string) (*Account, error)
	CreateAccount(ctx context.Context, account Account) (*Account, error)
	UpdateAccount(ctx context.Context, account Account) (*Account, error)
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

func (a accountDataAccessor) GetAccountByID(ctx context.Context, id uint64) (*Account, error) {
	logger := a.logger.With(zap.Uint64("account_id", id))

	var account Account
	result := a.database.First(&account, id)
	if result.Error != nil {
		logger.With(zap.Error(result.Error)).Error("failed to get account")
		return nil, result.Error
	}

	return &account, nil
}

func (a accountDataAccessor) GetAccountByEmail(ctx context.Context, email string) (*Account, error) {
	logger := a.logger.With(zap.String("email", email))

	var account Account
	result := a.database.Where("email = ?", email).First(&account)
	if result.Error != nil {
		logger.With(zap.Error(result.Error)).Error("failed to get account by email")
		return nil, result.Error
	}

	return &account, nil
}

func (a accountDataAccessor) CreateAccount(ctx context.Context, account Account) (*Account, error) {
	logger := a.logger.With(zap.Any("account", account))

	result := a.database.Create(&account)
	if result.Error != nil {
		logger.With(zap.Error(result.Error)).Error("failed to create account")
		return nil, result.Error
	}

	return &account, nil
}

func (a accountDataAccessor) UpdateAccount(ctx context.Context, account Account) (*Account, error) {
	logger := a.logger.With(zap.Any("account", account))

	if account.ID == 0 {
		err := errors.New("account ID cannot be zero")
		logger.With(zap.Error(err)).Error("invalid account ID")
		return nil, err
	}

	result := a.database.Save(&account)
	if result.Error != nil {
		logger.With(zap.Error(result.Error)).Error("failed to update account")
		return nil, result.Error
	}

	return &account, nil
}
