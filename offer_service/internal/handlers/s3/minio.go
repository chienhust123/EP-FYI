package s3

import (
	"context"
	"offer_service/internal/pkg/configs"
	"offer_service/internal/pkg/utils"
	"time"

	"github.com/minio/minio-go"
	"go.uber.org/zap"
)

type minioClient struct {
	client *minio.Client
	logger *zap.Logger
}

func NewMinioClient(config configs.S3, logger *zap.Logger) (Client, error) {
	client, err := minio.New(config.Address, config.Username, config.Password, false)
	if err != nil {
		logger.With(zap.Error(err)).Error("failed to create minio client")
		return nil, err
	}

	return &minioClient{
		client: client,
		logger: logger,
	}, nil
}

func (m *minioClient) GeneratePresignedUploadURL(
	ctx context.Context,
	bucketName,
	key string,
	expiry time.Duration,
) (string, error) {
	logger := utils.LoggerWithContext(ctx, m.logger)
	presignedURL, err := m.client.PresignedPutObject(bucketName, key, expiry)
	if err != nil {
		logger.With(zap.Error(err)).Error("failed to generate presigned upload url")
		return "", err
	}
	return presignedURL.String(), nil
}
