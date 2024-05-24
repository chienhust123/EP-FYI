package database

import (
	"context"
	"errors"

	"github.com/doug-martin/goqu/v9"
	"go.uber.org/zap"
)

type LocationTab struct {
	ID      uint64 `db:"id"`
	Country string `db:"country"`
	State   string `db:"state"`
	City    string `db:"city"`
	Offers  []OfferTab
}

//go:generate mockgen -source=./location.go -destination=../../../test/mocks/dataaccess/db/location_mock.go -package=mockdatabase
type LocationAccessor interface {
	GetByID(ctx context.Context, id uint64) (*LocationTab, error)
	Create(ctx context.Context, offer *LocationTab) error
	Update(ctx context.Context, offer *LocationTab) error
	Delete(ctx context.Context, id uint64) error
	GetByCountryStateCity(ctx context.Context, country, state, city string) (*LocationTab, error)
}

type locationAccessor struct {
	db     *goqu.Database
	logger *zap.Logger
}

func NewLocationAccessor(
	db *goqu.Database,
	logger *zap.Logger,
) LocationAccessor {
	return &locationAccessor{db: db, logger: logger}
}

const (
	TableLocationName = "location_tab"
)

func (o *locationAccessor) GetByID(ctx context.Context, id uint64) (*LocationTab, error) {
	var location LocationTab
	found, err := o.db.From(TableLocationName).Where(goqu.Ex{"id": id}).ScanStructContext(ctx, &location)
	if err != nil {
		o.logger.Error("Failed to get location by ID", zap.Error(err))
		return nil, err
	}
	if !found {
		o.logger.Info("Location not found", zap.Uint64("id", id))
		return nil, errors.New("location not found")
	}

	o.logger.Info("Location found", zap.Uint64("id", id))
	return &location, nil
}

func (o *locationAccessor) Create(ctx context.Context, location *LocationTab) error {
	record := structToRecord(location)
	insertSQL, _, err := o.db.Insert(TableLocationName).Rows(record).ToSQL()
	if err != nil {
		o.logger.Error("Failed to create SQL", zap.Error(err))
		return err
	}
	_, err = o.db.ExecContext(ctx, insertSQL)
	if err != nil {
		o.logger.Error("Failed to execute insert SQL", zap.Error(err))
		return err
	}
	o.logger.Info("Location created", zap.Uint64("id", location.ID))
	return nil
}

func (o *locationAccessor) Update(ctx context.Context, location *LocationTab) error {
	record := structToRecord(location)
	updateSQL, _, err := o.db.Update(TableLocationName).Set(record).Where(goqu.Ex{"id": location.ID}).ToSQL()
	if err != nil {
		o.logger.Error("Failed to create update SQL", zap.Error(err))
		return err
	}
	_, err = o.db.ExecContext(ctx, updateSQL)
	if err != nil {
		o.logger.Error("Failed to execute update SQL", zap.Error(err))
		return err
	}
	o.logger.Info("Location updated", zap.Uint64("id", location.ID))
	return nil
}

func (o *locationAccessor) Delete(ctx context.Context, id uint64) error {
	deleteSQL, _, err := o.db.Delete(TableLocationName).Where(goqu.Ex{"id": id}).ToSQL()
	if err != nil {
		o.logger.Error("Failed to create delete SQL", zap.Error(err))
		return err
	}
	_, err = o.db.ExecContext(ctx, deleteSQL)
	if err != nil {
		o.logger.Error("Failed to execute delete SQL", zap.Error(err))
		return err
	}
	o.logger.Info("Location deleted", zap.Uint64("id", id))
	return nil
}

func (o *locationAccessor) GetByCountryStateCity(ctx context.Context,
	country, state, city string,
) (*LocationTab, error) {
	var location LocationTab
	found, err := o.db.From(TableLocationName).Where(goqu.Ex{"country": country, "state": state, "city": city}).ScanStructContext(ctx, &location)
	if err != nil {
		o.logger.Error("Failed to get location by country, state and city", zap.Error(err))
		return nil, err
	}
	if !found {
		o.logger.Info("Location not found", zap.String("country", country), zap.String("state", state), zap.String("city", city))
		return nil, errors.New("location not found")
	}

	o.logger.Info("Location found", zap.String("country", country), zap.String("state", state), zap.String("city", city))
	return &location, nil
}
