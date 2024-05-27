package database

import (
	"context"
	"errors"
	"offer_service/internal/pkg/utils"

	"github.com/doug-martin/goqu/v9"
	"go.uber.org/zap"
)

const (
	colNameLocationID         = "id"
	tableNameLocation = "location_tab"
)

type LocationTab struct {
	ID      uint64 `db:"id" goqu:"skipupdate"`
	Country string `db:"country"`
	State   string `db:"state"`
	City    string `db:"city"`
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

func (o *locationAccessor) GetByID(ctx context.Context, id uint64) (*LocationTab, error) {
	logger := utils.LoggerWithContext(ctx, o.logger).Named("LocationAccessor_GetByID")
	var location LocationTab
	found, err := o.db.From(tableNameLocation).
		Where(goqu.Ex{colNameLocationID: id}).
		ScanStructContext(ctx, &location)
	if err != nil {
		logger.Error("Failed to get location by ID", zap.Error(err))
		return nil, err
	}
	if !found {
		logger.Info("Location not found", zap.Uint64(colNameLocationID, id))
		return nil, errors.New("location not found")
	}

	logger.Info("Location found", zap.Uint64(colNameLocationID, id))
	return &location, nil
}

func (o *locationAccessor) Create(ctx context.Context, location *LocationTab) error {
	logger := utils.LoggerWithContext(ctx, o.logger).Named("LocationAccessor_Create")
	insertSQL, _, err := o.db.Insert(tableNameLocation).Rows(location).ToSQL()
	if err != nil {
		logger.Error("Failed to create SQL", zap.Error(err))
		return err
	}
	_, err = o.db.ExecContext(ctx, insertSQL)
	if err != nil {
		logger.Error("Failed to execute insert SQL", zap.Error(err))
		return err
	}
	logger.Info("Location created", zap.Uint64(colNameLocationID, location.ID))
	return nil
}

func (o *locationAccessor) Update(ctx context.Context, location *LocationTab) error {
	logger := utils.LoggerWithContext(ctx, o.logger).Named("LocationAccessor_Update")
	updateSQL, _, err := o.db.Update(tableNameLocation).
		Set(location).
		Where(goqu.Ex{colNameLocationID: location.ID}).
		ToSQL()
	if err != nil {
		logger.Error("Failed to create update SQL", zap.Error(err))
		return err
	}
	_, err = o.db.ExecContext(ctx, updateSQL)
	if err != nil {
		logger.Error("Failed to execute update SQL", zap.Error(err))
		return err
	}
	logger.Info("Location updated", zap.Uint64(colNameLocationID, location.ID))
	return nil
}

func (o *locationAccessor) Delete(ctx context.Context, id uint64) error {
	logger := utils.LoggerWithContext(ctx, o.logger).Named("LocationAccessor_Delete")
	deleteSQL, _, err := o.db.Delete(tableNameLocation).Where(goqu.Ex{colNameLocationID: id}).ToSQL()
	if err != nil {
		logger.Error("Failed to create delete SQL", zap.Error(err))
		return err
	}
	_, err = o.db.ExecContext(ctx, deleteSQL)
	if err != nil {
		logger.Error("Failed to execute delete SQL", zap.Error(err))
		return err
	}
	logger.Info("Location deleted", zap.Uint64(colNameLocationID, id))
	return nil
}

func (o *locationAccessor) GetByCountryStateCity(ctx context.Context,
	country, state, city string,
) (*LocationTab, error) {
	logger := utils.LoggerWithContext(ctx, o.logger).Named("LocationAccessor_GetByCountryStateCity")
	var location LocationTab
	found, err := o.db.From(tableNameLocation).
		Where(goqu.Ex{"country": country, "state": state, "city": city}).
		ScanStructContext(ctx, &location)
	if err != nil {
		logger.Error("Failed to get location by country, state and city", zap.Error(err))
		return nil, err
	}
	if !found {
		logger.Info(
			"Location not found",
			zap.String("country", country),
			zap.String("state", state),
			zap.String("city", city),
		)
		return nil, errors.New("location not found")
	}

	logger.Info(
		"Location found",
		zap.String("country", country),
		zap.String("state", state),
		zap.String("city", city),
	)
	return &location, nil
}
