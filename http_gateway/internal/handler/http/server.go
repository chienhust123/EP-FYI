package http

import (
	"context"
	"fmt"
	"net/http"

	"github.com/grpc-ecosystem/grpc-gateway/v2/runtime"
	"go.uber.org/zap"
	"google.golang.org/grpc"
	"google.golang.org/grpc/credentials/insecure"

	pbAccountCore "account_core/pkg/generated/gprc/account_core"
	"http_gateway/internal/configs"
	"http_gateway/internal/handler/http/servemuxoption"
	pbOfferSerice "offer_service/pkg/generated/gprc/offer_service"
)

const (
	AuthCookieName        = "EPFYI_AUTH"
	AuthTokenMetadataName = "EPFYI_AUTH"
)

type Server interface {
	Start(ctx context.Context) error
}

func NewServer(
	httpConfig configs.Gateway,
	grpcConfig configs.GRPC,
	authConfig configs.Auth,
	logger *zap.Logger,
) Server {
	return &server{
		gatewayConfig: httpConfig,
		grpcConfig:    grpcConfig,
		authConfig:    authConfig,
		logger:        logger,
	}
}

type server struct {
	gatewayConfig configs.Gateway
	grpcConfig    configs.GRPC
	authConfig    configs.Auth
	logger        *zap.Logger
}

func (s *server) Start(ctx context.Context) error {
	mux := runtime.NewServeMux(
		servemuxoption.WithAuthCookieToAuthMetadata(AuthCookieName, AuthTokenMetadataName),
		servemuxoption.WithAuthMetadataToAuthCookie(AuthCookieName, AuthTokenMetadataName, s.authConfig.GetTokenDuration()),
	)

	opts := []grpc.DialOption{grpc.WithTransportCredentials(insecure.NewCredentials())}
	var err error

	// Connect to auth service
	err = pbAccountCore.RegisterAccountCoreHandlerFromEndpoint(
		ctx,
		mux,
		s.grpcConfig.AccountCoreAddress,
		opts,
	)
	if err != nil {
		return err
	}

	// Connect to offer service
	err = pbOfferSerice.RegisterOfferServiceHandlerFromEndpoint(
		ctx,
		mux,
		s.grpcConfig.OfferServiceAddress,
		opts,
	)
	if err != nil {
		return err
	}

	// Start HTTP server (and proxy calls to gRPC server endpoints)
	fmt.Printf("http server is running on %s\n", s.gatewayConfig.Address)
	return http.ListenAndServe(s.gatewayConfig.Address, mux)
}
