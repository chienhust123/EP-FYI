package grpc

import (
	"context"
	"net"
	offer_servicev1 "offer_service/internal/generated/offer_service/v1"
	"offer_service/internal/pkg/configs"
	"offer_service/internal/pkg/utils"

	"github.com/grpc-ecosystem/go-grpc-middleware/v2/interceptors/validator"
	"go.uber.org/zap"
	"google.golang.org/grpc"
)

type Server interface {
	Start(context.Context) error
}

type server struct {
	config  configs.GRPC
	handler offer_servicev1.OfferCoreServiceServer
	logger  *zap.Logger
}

func NewServer(
	config configs.GRPC,
	handler offer_servicev1.OfferCoreServiceServer,
	logger *zap.Logger,
) Server {
	return &server{
		config:  config,
		handler: handler,
		logger:  logger,
	}
}

func (s *server) Start(ctx context.Context) error {
	logger := utils.LoggerWithContext(ctx, s.logger).Named("gRPC")

	listener, err := net.Listen("tcp", s.config.Address)
	if err != nil {
		logger.Error("failed to open tcp listener", zap.Error(err))
		return err
	}
	defer listener.Close()

	server := grpc.NewServer(
		grpc.ChainUnaryInterceptor(
			validator.UnaryServerInterceptor(),
		),
		grpc.ChainStreamInterceptor(
			validator.StreamServerInterceptor(),
		),
	)

	offer_servicev1.RegisterOfferCoreServiceServer(server, s.handler)

	logger.With(zap.String("address", s.config.Address)).Info("starting grpc server")
	return server.Serve(listener)
}
