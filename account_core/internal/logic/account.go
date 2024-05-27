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

type AccountLogic interface {
	CreateSession(ctx context.Context, in CreateSessionInput) (CreateSessionOutput, error)
	DeleteSession(ctx context.Context, in DeleteSessionInput) error
}

func NewAccountLogic(
	database database.Database,
	tokenLogic TokenLogic,
	takenAccountNameCache cache.TakenEmailCache,
	logger *zap.Logger,
) AccountLogic {
	return &accountLogic{
		database:        database,
		tokenLogic:      tokenLogic,
		takenEmailCache: takenAccountNameCache,
		logger:          logger,
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