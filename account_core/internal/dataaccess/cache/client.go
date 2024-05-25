package cache

import (
	"context"
	"errors"
	"fmt"
	"time"

	"auth_service/internal/configs"
	"go.uber.org/zap"
)

var (
	ErrCacheMissed = errors.New("cache miss")
)

type Client interface {
	Set(ctx context.Context, key string, value any, ttl time.Duration) error
	Get(ctx context.Context, key string) (any, error)
	AddToSet(ctx context.Context, key string, value ...any) error
	IsValueInSet(ctx context.Context, key string, value any) (bool, error)
}

func NewClient(
	cacheConfig configs.Cache,
	logger *zap.Logger,
) (Client, error) {
	switch cacheConfig.Type {
	case configs.CacheTypeInMemory:
		return NewInMemoryClient(cacheConfig, logger)
	case configs.CacheTypeRedis:
		return NewRedisClient(cacheConfig, logger)
	default:
		err := fmt.Errorf(`invalid cache type, expect one of ["redis", "in-memory"], got %s`, string(cacheConfig.Type))
		logger.With(zap.Error(err)).Error("invalid cache type")
		return nil, err
	}
}
