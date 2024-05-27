package s3

import (
	"context"
	"offer_service/internal/pkg/configs"
	"time"

	"go.uber.org/zap"
)

//go:generate mockgen -source=./client.go -destination=./client_mock.go -package=s3
type Client interface {
	CreateBucketIfNotExists(
		ctx context.Context,
		bucketName,
		location string,
	) error
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
