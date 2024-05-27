package cache

import (
	"context"
)

var (
	setKeyNameTakenEmail string = "taken_email_set"
)

type TakenEmailCache interface {
	Add(ctx context.Context, email string) error
	Has(ctx context.Context, email string) (bool, error)
}

func NewTakenEmailCache(client Client) (TakenEmailCache, error) {
	return &takenEmailCache{
		client: client,
	}, nil
}

type takenEmailCache struct {
	client Client
}

// Add implements TakenEmailCache.
func (t *takenEmailCache) Add(ctx context.Context, accountName string) error {
	err := t.client.AddToSet(ctx, setKeyNameTakenEmail, accountName)
	if err != nil {
		return err
	}

	return nil
}

// Has implements TakenEmailCache.
func (t *takenEmailCache) Has(ctx context.Context, accountName string) (bool, error) {
	exists, err := t.client.IsValueInSet(ctx, setKeyNameTakenEmail, accountName)
	if err != nil {
		return false, err
	}

	return exists, nil
}