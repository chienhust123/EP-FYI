package app

import (
	"context"
	"offer_service/internal/handlers/grpc"
	"offer_service/internal/handlers/http"
	"offer_service/internal/pkg/utils"
	"syscall"

	"go.uber.org/zap"
)

type StandaloneServer struct {
	httpServer  http.Server
	grpcServer  grpc.Server
	runWithHTTP bool
	logger      *zap.Logger
}

func NewStandaloneServer(
	httpServer http.Server,
	grpcServer grpc.Server,
	runWithHTTP bool,
	logger *zap.Logger,
) *StandaloneServer {
	return &StandaloneServer{
		httpServer:  httpServer,
		grpcServer:  grpcServer,
		runWithHTTP: runWithHTTP,
		logger:      logger,
	}
}

func (s StandaloneServer) Start() error {
	if s.runWithHTTP && s.httpServer != nil {
		go func() {
			httpServerErr := s.httpServer.Start(context.Background())
			s.logger.With(zap.Error(httpServerErr)).Info("http server stopped")
		}()
	}

	go func() {
		grpcStartErr := s.grpcServer.Start(context.Background())
		s.logger.With(zap.Error(grpcStartErr)).Info("grpc server stopped")
	}()

	utils.BlockUntilSignal(syscall.SIGINT, syscall.SIGTERM)
	return nil
}
