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

func (m minioClient) CreateBucketIfNotExists(
	ctx context.Context,
	bucketName,
	location string,
) error {
	logger := utils.LoggerWithContext(ctx, m.logger).With(zap.String("bucket", bucketName))
	exists, errBucketExists := m.client.BucketExists(bucketName)
	if errBucketExists == nil && exists {
		logger.Warn("bucket already exists")
		return nil
	}

	if makeBucketErr := m.client.MakeBucket(bucketName, location); makeBucketErr != nil {
		logger.With(zap.Error(makeBucketErr)).Error("failed to create new bucket")
		return makeBucketErr
	}
	logger.Info("bucket created successfully")
	return nil
}

func (m minioClient) GeneratePresignedUploadURL(
	ctx context.Context,
	bucketName,
	key string,
	expiry time.Duration,
) (string, error) {
	logger := utils.LoggerWithContext(ctx, m.logger).With(zap.String("bucket", bucketName))
	presignedURL, err := m.client.PresignedPutObject(bucketName, key, expiry)
	if err != nil {
		logger.With(zap.Error(err)).Error("failed to generate presigned upload url")
		return "", err
	}
	return presignedURL.String(), nil
}
