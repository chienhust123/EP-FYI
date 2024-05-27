package database

import (
	"context"
	"errors"
	"offer_service/internal/pkg/utils"

	"github.com/doug-martin/goqu/v9"
	"go.uber.org/zap"
)

const (
	colNameLocationID = "id"
	colCountry        = "country"
	colState          = "state"
	colCity           = "city"
	tableNameLocation = "location_tab"

	ErrLocationNotFound              = "location not found"
	ErrGetLocationByID               = "failed to get location by ID"
	ErrGetLastInsertID               = "failed to get last inserted ID"
	ErrCreateLocation                = "failed to create location"
	ErrExcecuteSQL                   = "failed to execute insert SQL"
	ErrUpdateLocation                = "failed to update location"
	ErrDeleteLocation                = "failed to delete location"
	ErrGetLocationByCountryStateCity = "failed to get location by country, state, city"
)

type Location struct {
	ID      uint64 `db:"id" goqu:"skipupdate"`
	Country string `db:"country"`
	State   string `db:"state"`
	City    string `db:"city"`
}

//go:generate mockgen -source=./location.go -destination=../../../test/mocks/dataaccess/db/location_mock.go -package=mockdatabase
type LocationAccessor interface {
	GetByID(ctx context.Context, id uint64) (*Location, error)
	Create(ctx context.Context, offer *Location) error
	Update(ctx context.Context, offer *Location) error
	Delete(ctx context.Context, id uint64) error
	GetByCountryStateCity(ctx context.Context, country, state, city string) (*Location, error)
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

func (o *locationAccessor) GetByID(ctx context.Context, id uint64) (*Location, error) {
	logger := utils.LoggerWithContext(ctx, o.logger).Named("LocationAccessor_GetByID")

	var location Location
	found, err := o.db.From(tableNameLocation).
		Where(goqu.Ex{colNameLocationID: id}).
		ScanStructContext(ctx, &location)
	if err != nil {
		logger.Error(ErrGetLocationByID, zap.Error(err))
		return nil, err
	}
	if !found {
		logger.Info(ErrLocationNotFound, zap.Uint64(colNameLocationID, id))
		return nil, errors.New(ErrLocationNotFound)
	}

	logger.Info("Location found", zap.Uint64(colNameLocationID, id))
	return &location, nil
}

func (o *locationAccessor) Create(ctx context.Context, location *Location) error {
	logger := utils.LoggerWithContext(ctx, o.logger).Named("LocationAccessor_Create")
	result, err := o.db.Insert(tableNameLocation).Rows(location).Executor().ExecContext(ctx)
	if err != nil {
		logger.Error(ErrCreateLocation, zap.Error(err))
		return err
	}

	lastInsertedID, err := result.LastInsertId()
	if err != nil {
		logger.Error(ErrGetLastInsertID, zap.Error(err))
		return err
	}

	logger.Info("Location created", zap.Uint64(colNameLocationID, uint64(lastInsertedID)))
	return nil
}

func (o *locationAccessor) Update(ctx context.Context, location *Location) error {
	logger := utils.LoggerWithContext(ctx, o.logger).Named("LocationAccessor_Update")
	_, err := o.db.Update(tableNameLocation).
		Set(location).
		Where(goqu.Ex{colNameLocationID: location.ID}).
		Executor().
		ExecContext(ctx)
	if err != nil {
		logger.Error(ErrUpdateLocation, zap.Error(err))
		return err
	}

	logger.Info("Location updated", zap.Uint64(colNameLocationID, location.ID))
	return nil
}

func (o *locationAccessor) Delete(ctx context.Context, id uint64) error {
	logger := utils.LoggerWithContext(ctx, o.logger).Named("LocationAccessor_Delete")
	_, err := o.db.Delete(tableNameLocation).Where(goqu.Ex{colNameLocationID: id}).Executor().ExecContext(ctx)
	if err != nil {
		logger.Error(ErrDeleteLocation, zap.Error(err))
		return err
	}

	logger.Info("Location deleted", zap.Uint64(colNameLocationID, id))
	return nil
}

func (o *locationAccessor) GetByCountryStateCity(ctx context.Context,
	country, state, city string,
) (*Location, error) {
	logger := utils.LoggerWithContext(ctx, o.logger).Named("LocationAccessor_GetByCountryStateCity")

	var location Location
	found, err := o.db.From(tableNameLocation).
		Where(goqu.Ex{colCountry: country, colState: state, colCity: city}).
		ScanStructContext(ctx, &location)
	if err != nil {
		logger.Error(ErrGetLocationByCountryStateCity, zap.Error(err))
		return nil, err
	}
	if !found {
		logger.Info(
			ErrLocationNotFound,
			zap.String("country", country),
			zap.String("state", state),
			zap.String("city", city),
		)
		return nil, errors.New(ErrLocationNotFound)
	}

	logger.Info(
		"Location found",
		zap.String("country", country),
		zap.String("state", state),
		zap.String("city", city),
	)
	return &location, nil
}
