package grpc

import (
	"context"
	"fmt"
	"net"

	"auth_service/internal/configs"
	pb "auth_service/internal/generated/grpc/account_core"
	"github.com/grpc-ecosystem/go-grpc-middleware/v2/interceptors/validator"
	"google.golang.org/grpc"
)

type Server interface {
	Start(ctx context.Context) error
}

func NewServer(grpcConfig configs.GRPC, handler pb.AccountServiceServer) Server {
	return &server{
		grpcConfig: grpcConfig,
		handler:    handler,
	}
}

type server struct {
	grpcConfig configs.GRPC
	handler    pb.AccountServiceServer
}

// Start implements Server.
func (s *server) Start(ctx context.Context) error {
	listener, err := net.Listen("tcp", s.grpcConfig.Address)
	if err != nil {
		return err
	}
	defer listener.Close()

	var opts = []grpc.ServerOption{
		grpc.ChainUnaryInterceptor(
			validator.UnaryServerInterceptor(),
		),
		grpc.ChainStreamInterceptor(
			validator.StreamServerInterceptor(),
		),
	}
	server := grpc.NewServer(opts...)
	pb.RegisterAccountServiceServer(server, s.handler)

	fmt.Printf("gRPC server is running on %s\n", s.grpcConfig.Address)
	return server.Serve(listener)
}