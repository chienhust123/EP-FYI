package logic

import (
	"context"
	"time"

	"auth_service/internal/dataaccess/cache"
	"auth_service/internal/dataaccess/database"

	"go.uber.org/zap"

	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/status"
)

type Account struct {
	Id        uint64
	Email     string
	Name      string
	Picture   string
	CreatedAt time.Time
	UpdatedAt time.Time
}

type CreateSessionInput struct {
	AccountId uint64
}

type CreateSessionOutput struct {
	Token   string
	Account Account
}

type DeleteSessionInput struct {
	Token string
}

type GetAccountInput struct {
	AccountId uint64
}

type GetAccountOutput struct {
	Account Account
}

type CreateAccountInput struct {
	Name    string
	Email   string
	Picture string
}

type CreateAccountOutput struct {
	Account Account
}

type UpdateAccountInput struct {
	AccountId uint64
	Name      string
	Email     string
	Picture   string
}

type UpdateAccountOutput struct {
	Account Account
}

type AccountLogic interface {
	CreateSession(ctx context.Context, in CreateSessionInput) (CreateSessionOutput, error)
	DeleteSession(ctx context.Context, in DeleteSessionInput) error
	IsAccountEmailExists(ctx context.Context, email string) (bool, error)
	GetAccount(ctx context.Context, params GetAccountInput) (GetAccountOutput, error)
	CreateAccount(ctx context.Context, in CreateAccountInput) (CreateAccountOutput, error)
	UpdateAccount(ctx context.Context, params UpdateAccountInput) (UpdateAccountOutput, error)
}

func NewAccountLogic(
	database database.Database,
	tokenLogic TokenLogic,
	takenAccountNameCache cache.TakenEmailCache,
	logger *zap.Logger,
	accountDataAccessor database.AccountDataAccessor,
) AccountLogic {
	return &accountLogic{
		database:            database,
		accountDataAccessor: accountDataAccessor,
		tokenLogic:          tokenLogic,
		takenEmailCache:     takenAccountNameCache,
		logger:              logger,
	}
}

type accountLogic struct {
	logger *zap.Logger

	database            database.Database
	accountDataAccessor database.AccountDataAccessor

	tokenLogic      TokenLogic
	takenEmailCache cache.TakenEmailCache
}

// CreateSession implements Account.
func (a *accountLogic) CreateSession(ctx context.Context, in CreateSessionInput) (CreateSessionOutput, error) {
	logger := a.logger.With(zap.Any("create_session_input", in))

	foundAccount, err := a.accountDataAccessor.GetAccountByID(ctx, in.AccountId)
	if err != nil {
		logger.Error("failed to get account by id", zap.Error(err))
		return CreateSessionOutput{}, status.Error(codes.Internal, "error getting account")
	}
	if foundAccount.ID == 0 {
		return CreateSessionOutput{}, status.Error(codes.NotFound, "account not found")
	}

	stringToken, err := a.tokenLogic.CreateTokenString(ctx, in.AccountId)
	if err != nil {
		logger.Error("failed to create token", zap.Error(err))
		return CreateSessionOutput{}, status.Error(codes.Internal, "failed to create token")
	}

	return CreateSessionOutput{
		Token: stringToken,
		Account: Account{
			Id:        foundAccount.ID,
			Email:     foundAccount.Email,
			Name:      foundAccount.Name,
			Picture:   foundAccount.Picture,
			CreatedAt: foundAccount.CreatedAt,
			UpdatedAt: foundAccount.UpdatedAt,
		},
	}, nil
}

// DeleteSession implements AccountLogic.
func (a *accountLogic) DeleteSession(ctx context.Context, in DeleteSessionInput) error {
	logger := a.logger.With(zap.Any("delete_session_input", in))

	_, _, err := a.tokenLogic.VerifyTokenString(ctx, in.Token)
	if err != nil {
		logger.With(zap.Error(err)).Error("failed to verify token")
		return status.Error(codes.NotFound, "account not found")
	}

	return nil
}

func (a accountLogic) GetAccount(ctx context.Context, params GetAccountInput) (GetAccountOutput, error) {
	account, err := a.accountDataAccessor.GetAccountByID(ctx, params.AccountId)
	if err != nil {
		return GetAccountOutput{}, status.Error(codes.Internal, "failed to get account")
	}

	return GetAccountOutput{
		Account: Account{
			Id:        account.ID,
			Email:     account.Email,
			Name:      account.Name,
			Picture:   account.Picture,
			CreatedAt: account.CreatedAt,
			UpdatedAt: account.UpdatedAt,
		},
	}, nil
}

func (a accountLogic) IsAccountEmailExists(ctx context.Context, email string) (bool, error) {
	_, err := a.accountDataAccessor.GetAccountByEmail(ctx, email)
	if err != nil {
		return false, nil
	}

	return true, nil
}

func (a *accountLogic) CreateAccount(ctx context.Context, in CreateAccountInput) (CreateAccountOutput, error) {
	logger := a.logger.With(zap.Any("create_account_input", in))

	exists, err := a.IsAccountEmailExists(ctx, in.Email)
	if err != nil {
		logger.With(zap.Error(err)).Error("failed to check if email exists")
		return CreateAccountOutput{}, status.Error(codes.Internal, "error checking if email exists")
	}

	if exists {
		return CreateAccountOutput{}, status.Error(codes.AlreadyExists, "email already exists")
	}

	account, err := a.accountDataAccessor.CreateAccount(ctx, database.Account{
		Email:   in.Email,
		Name:    in.Name,
		Picture: in.Picture,
	})
	if err != nil {
		logger.With(zap.Error(err)).Error("failed to create account")
		return CreateAccountOutput{}, status.Error(codes.Internal, "error creating account")
	}

	return CreateAccountOutput{
		Account: Account{
			Id:        account.ID,
			Email:     account.Email,
			Name:      account.Name,
			Picture:   account.Picture,
			CreatedAt: account.CreatedAt,
			UpdatedAt: account.UpdatedAt,
		},
	}, nil
}

func (a accountLogic) UpdateAccount(ctx context.Context, params UpdateAccountInput) (UpdateAccountOutput, error) {
	account, err := a.accountDataAccessor.GetAccountByID(ctx, params.AccountId)
	if err != nil {
		return UpdateAccountOutput{}, status.Error(codes.Internal, "failed to get account")
	}

	if params.Name != "" {
		account.Name = params.Name
	}
	if params.Email != "" {
		account.Email = params.Email
	}
	if params.Picture != "" {
		account.Picture = params.Picture
	}

	updatedAccount, err := a.accountDataAccessor.UpdateAccount(ctx, database.Account{
		ID:        account.ID,
		Email:     account.Email,
		Name:      account.Name,
		Picture:   account.Picture,
		CreatedAt: account.CreatedAt,
	})
	if err != nil {
		return UpdateAccountOutput{}, status.Error(codes.Internal, "failed to update account")
	}

	return UpdateAccountOutput{
		Account: Account{
			Id:        updatedAccount.ID,
			Name:      updatedAccount.Name,
			Email:     updatedAccount.Email,
			Picture:   updatedAccount.Picture,
			CreatedAt: updatedAccount.CreatedAt,
			UpdatedAt: updatedAccount.UpdatedAt,
		},
	}, nil
}
