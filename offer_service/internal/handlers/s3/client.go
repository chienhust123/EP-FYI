package s3

import (
	"context"
	"offer_service/internal/pkg/configs"
	"time"

	"go.uber.org/zap"
)

//go:generate mockgen -source=./client.go -destination=../../../test/mocks/handlers/s3/client_mock.go -package=mocks3client
type Client interface {
	GeneratePresignedUploadURL(
		ctx context.Context,
		bucketName,
		key string,
		expiry time.Duration,
	) (string, error)
}

func NewClient(config configs.S3, logger *zap.Logger) (Client, error) {
	return NewMinioClient(config, logger)
}
