package cache

import (
	"auth_service/internal/configs"
	"context"
	"sync"
	"time"

	"go.uber.org/zap"
)

func NewInMemoryClient(
	cacheConfig configs.Cache,
	logger *zap.Logger,
) (Client, error) {
	return &inMemoryClient{
		cache:      make(map[string]any),
		cacheMutex: &sync.Mutex{},
		logger:     logger,
	}, nil
}

type inMemoryClient struct {
	cache      map[string]any
	cacheMutex *sync.Mutex
	logger     *zap.Logger
}

// AddToSet implements Client.
func (i *inMemoryClient) AddToSet(ctx context.Context, key string, value ...any) error {
	i.cacheMutex.Lock()
	defer i.cacheMutex.Unlock()

	if _, ok := i.cache[key]; !ok {
		i.cache[key] = make(map[any]struct{})
	}

	set := i.cache[key].(map[any]struct{})
	for _, v := range value {
		set[v] = struct{}{}
	}

	return nil
}

// Get implements Client.
func (i *inMemoryClient) Get(ctx context.Context, key string) (any, error) {
	if val, ok := i.cache[key]; ok {
		return val, nil
	}

	return nil, ErrCacheMissed
}

// IsValueInSet implements Client.
func (i *inMemoryClient) IsValueInSet(ctx context.Context, key string, value any) (bool, error) {
	if set, ok := i.cache[key].(map[any]struct{}); ok {
		if _, exists := set[value]; exists {
			return true, nil
		}
	}

	return false, nil
}

// Set implements Client.
func (i *inMemoryClient) Set(ctx context.Context, key string, value any, ttl time.Duration) error {
	i.cacheMutex.Lock()
	defer i.cacheMutex.Unlock()

	i.cache[key] = value

	return nil
}
