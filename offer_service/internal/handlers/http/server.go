package http

import (
	"context"
	"net/http"
	offer_servicev1 "offer_service/internal/generated/offer_service/v1"
	"offer_service/internal/pkg/configs"
	"offer_service/internal/pkg/utils"
	"time"

	"github.com/grpc-ecosystem/grpc-gateway/v2/runtime"
	"go.uber.org/zap"
	"google.golang.org/grpc"
	"google.golang.org/grpc/credentials/insecure"
)

type Server interface {
	Start(ctx context.Context) error
}

type server struct {
	config configs.Config
	logger *zap.Logger
}

func NewServer(
	config configs.Config,
	logger *zap.Logger,
) Server {
	return &server{
		config: config,
		logger: logger,
	}
}

func (s server) getGRPCGatewayHandler(ctx context.Context) (http.Handler, error) {
	grpcMux := runtime.NewServeMux()

	if err := offer_servicev1.RegisterOfferCoreServiceHandlerFromEndpoint(
		ctx,
		grpcMux,
		s.config.GRPC.Address,
		[]grpc.DialOption{
			grpc.WithTransportCredentials(insecure.NewCredentials()),
		},
	); err != nil {
		return nil, err
	}

	return grpcMux, nil
}

func (s server) Start(ctx context.Context) error {
	logger := utils.LoggerWithContext(ctx, s.logger).Named("HTTP")

	grpcMux, err := s.getGRPCGatewayHandler(ctx)
	if err != nil {
		logger.With(zap.Error(err)).Error("failed to set up grpc-gateway")
		return err
	}

	loggingMiddleware := LoggingMiddleware(s.logger)

	httpServer := http.Server{
		Addr:              s.config.HTTP.Address,
		Handler:           loggingMiddleware(grpcMux),
		ReadHeaderTimeout: time.Minute,
	}

	logger.With(zap.String("address", s.config.HTTP.Address)).Info("starting http server")
	return httpServer.ListenAndServe()
}
