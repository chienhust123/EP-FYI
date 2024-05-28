package grpc

import (
	pb "auth_service/internal/generated/grpc/account_core"
	"auth_service/internal/logic"
	"context"

	"google.golang.org/grpc"
	"google.golang.org/grpc/metadata"
)

const (
	AuthTokenMetadataName = "AUTH_TOKEN"
)

func NewHandler() pb.AccountServiceServer {
	return &Handler{}
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