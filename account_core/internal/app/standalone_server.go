package app

import (
	"context"
	"syscall"

	"auth_service/internal/handler/grpc"
	"auth_service/internal/utils"
	"go.uber.org/zap"
)

type StandaloneServer struct {
	grpcServer grpc.Server
	logger     *zap.Logger
}

func NewStandaloneServer(
	grpcServer grpc.Server,
	logger *zap.Logger,
) (StandaloneServer, error) {
	return StandaloneServer{
		grpcServer: grpcServer,
		logger:     logger,
	}, nil
}

func (s *StandaloneServer) Start() {

	go func() {
		err := s.grpcServer.Start(context.Background())
		s.logger.With(zap.Error(err)).Error("gRPC server stopped")
	}()

	utils.WaitForSignals(syscall.SIGINT, syscall.SIGTERM)
}
