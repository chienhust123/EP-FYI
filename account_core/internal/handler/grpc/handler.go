package grpc

import (
	"context"

	pb "auth_service/internal/generated/grpc/account_core"
	"auth_service/internal/logic"

	"google.golang.org/grpc"
	"google.golang.org/grpc/metadata"
)

const (
	AuthTokenMetadataName = "AUTH_TOKEN"
)

func NewHandler(
	accountLogic logic.AccountLogic,
) (pb.AccountServiceServer, error) {
	return &Handler{
		accountLogic: accountLogic,
	}, nil
}

type Handler struct {
	pb.UnimplementedAccountServiceServer
	accountLogic logic.AccountLogic
}

// CreateSession implements account_core.AccountServiceServer.
func (h *Handler) CreateSession(ctx context.Context, in *pb.CreateSessionRequest) (*pb.CreateSessionResponse, error) {
	output, err := h.accountLogic.CreateSession(
		ctx,
		logic.CreateSessionInput{
			AccountId: in.AccountId,
		},
	)
	if err != nil {
		return nil, err
	}

	err = grpc.SendHeader(ctx, metadata.Pairs(AuthTokenMetadataName, output.Token))
	if err != nil {
		return nil, err
	}

	return &pb.CreateSessionResponse{
		Account: &pb.Account{
			Id:        output.Account.Id,
			Email:     output.Account.Email,
			Name:      output.Account.Name,
			Picture:   output.Account.Picture,
			CreatedAt: output.Account.CreatedAt.String(),
			UpdatedAt: output.Account.UpdatedAt.String(),
		},
	}, nil
}

// DeleteSession implements account_core.AccountServiceServer.
func (h *Handler) DeleteSession(ctx context.Context, in *pb.DeleteSessionRequest) (*pb.DeleteSessionResponse, error) {
	err := h.accountLogic.DeleteSession(
		ctx,
		logic.DeleteSessionInput{
			Token: h.getAuthTokenFromMetadata(ctx),
		},
	)
	if err != nil {
		return nil, err
	}

	err = grpc.SendHeader(ctx, metadata.Pairs(AuthTokenMetadataName, ""))
	if err != nil {
		return nil, err
	}

	return &pb.DeleteSessionResponse{}, nil
}

func (h *Handler) getAuthTokenFromMetadata(ctx context.Context) string {
	md, ok := metadata.FromIncomingContext(ctx)
	if !ok {
		return ""
	}

	authTokenValues := md.Get(AuthTokenMetadataName)
	if len(authTokenValues) == 0 {
		return ""
	}

	return authTokenValues[0]
}

func (a Handler) GetAccount(ctx context.Context, request *pb.GetAccountRequest) (*pb.GetAccountResponse, error) {
	output, err := a.accountLogic.GetAccount(ctx, logic.GetAccountInput{
		AccountId: request.AccountId,
	})
	if err != nil {
		return nil, err
	}

	return &pb.GetAccountResponse{
		Account: &pb.Account{
			Id:        output.Account.Id,
			Name:      output.Account.Name,
			Email:     output.Account.Email,
			Picture:   output.Account.Picture,
			CreatedAt: output.Account.CreatedAt.String(),
			UpdatedAt: output.Account.UpdatedAt.String(),
		},
	}, nil
}

func (a Handler) CreateAccount(ctx context.Context, request *pb.CreateAccountRequest) (*pb.CreateAccountResponse, error) {
	output, err := a.accountLogic.CreateAccount(ctx, logic.CreateAccountInput{
		Name:    request.Account.Name,
		Email:   request.Account.Email,
		Picture: request.Account.Picture,
	})
	if err != nil {
		return nil, err
	}

	return &pb.CreateAccountResponse{
		Account: &pb.Account{
			Id:        output.Account.Id,
			Email:     output.Account.Email,
			Name:      output.Account.Name,
			Picture:   output.Account.Picture,
			CreatedAt: output.Account.CreatedAt.String(),
			UpdatedAt: output.Account.UpdatedAt.String(),
		},
	}, nil
}

func (a Handler) UpdateAccount(ctx context.Context, request *pb.UpdateAccountRequest) (*pb.UpdateAccountResponse, error) {
	output, err := a.accountLogic.UpdateAccount(ctx, logic.UpdateAccountInput{
		AccountId: request.Account.Id,
		Name:      request.Account.Name,
		Email:     request.Account.Email,
		Picture:   request.Account.Picture,
	})
	if err != nil {
		return nil, err
	}

	return &pb.UpdateAccountResponse{
		Account: &pb.Account{
			Id:        output.Account.Id,
			Name:      output.Account.Name,
			Email:     output.Account.Email,
			Picture:   output.Account.Picture,
			CreatedAt: output.Account.CreatedAt.String(),
			UpdatedAt: output.Account.UpdatedAt.String(),
		},
	}, nil
}
