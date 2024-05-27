package cache

import (
	"auth_service/internal/configs"
	"context"
	"errors"
	"time"

	"github.com/go-redis/redis/v8"
	"go.uber.org/zap"
)

func NewRedisClient(
	cacheConfig configs.Cache,
	logger *zap.Logger,
) (Client, error) {

	client := redis.NewClient(&redis.Options{
		Addr:     cacheConfig.Addr,
		Username: cacheConfig.Username,
		Password: cacheConfig.Password,
		DB:       cacheConfig.DB,
	})

	_, err := client.Ping(context.Background()).Result()
	if err != nil {
		logger.Error("can not connect to redis client", zap.Error(err))
		return nil, err
	}

	return &redisClient{
		client: client,
		logger: logger,
	}, nil
}

type redisClient struct {
	client *redis.Client
	logger *zap.Logger
}

// AddToSet implements Client.
func (c *redisClient) AddToSet(ctx context.Context, key string, value ...interface{}) error {
	logger := c.logger.
		With(zap.String("key", key)).
		With(zap.Any("value", value))

	err := c.client.SAdd(ctx, key, value).Err()
	if err != nil {
		logger.Error("failed to add value to set", zap.Error(err))
		return err
	}
	return nil
}

// IsValueInSet implements Client.
func (c *redisClient) IsValueInSet(ctx context.Context, key string, value interface{}) (bool, error) {
	logger := c.logger.
		With(zap.String("key", key)).
		With(zap.Any("value", value))

	exists, err := c.client.SIsMember(ctx, key, value).Result()
	if err != nil {
		logger.Error("failed to find value in set", zap.Error(err))
		return false, err
	}
	return exists, nil
}

// Get implements Client.
func (c *redisClient) Get(ctx context.Context, key string) (any, error) {
	logger := c.logger.With(zap.String("key", key))

	value, err := c.client.Get(ctx, key).Result()
	if err != nil {
		if errors.Is(err, redis.Nil) {
			return nil, ErrCacheMissed
		}
		logger.Error("failed to get key from cache", zap.Error(err))
		return nil, err
	}

	return value, nil
}

// Set implements Client.
func (c *redisClient) Set(ctx context.Context, key string, value any, ttl time.Duration) error {
	logger := c.logger.
		With(zap.String("key", key)).
		With(zap.Any("value", value)).
		With(zap.Duration("ttl", ttl))

	if err := c.client.Set(ctx, key, value, ttl).Err(); err != nil {
		logger.Error("failed to set value into cache", zap.Error(err))
		return err
	}

	return nil
}
