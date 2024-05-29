package database

import (
	"context"
	"offer_service/internal/pkg/utils"

	"github.com/doug-martin/goqu/v9"
	"go.uber.org/zap"
	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/status"
)

const (
	colNameLocationID = "id"
	colCountry        = "country"
	colState          = "state"
	colCity           = "city"
	tableNameLocation = "location_tab"
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
	Create(ctx context.Context, location *Location) error
	Update(ctx context.Context, location *Location) error
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
		logger.With(zap.Error(err)).Error("failed to get location by ID")
		return nil, status.Error(codes.Internal, "failed to get location by ID")
	}
	if !found {
		logger.With(zap.Uint64(colNameLocationID, id)).Warn("location not found")
		return nil, status.Error(codes.NotFound, "location not found")
	}

	logger.With(zap.Uint64(colNameLocationID, id)).Info("location found")
	return &location, nil
}

func (o *locationAccessor) Create(ctx context.Context, location *Location) error {
	logger := utils.LoggerWithContext(ctx, o.logger).Named("LocationAccessor_Create")
	result, err := o.db.Insert(tableNameLocation).Rows(location).Executor().ExecContext(ctx)
	if err != nil {
		logger.With(zap.Error(err)).Error("failed to create location")
		return status.Error(codes.Internal, "failed to create location")
	}

	lastInsertedID, err := result.LastInsertId()
	if err != nil {
		logger.With(zap.Error(err)).Error("failed to get last inserted ID")
		return status.Error(codes.Internal, "failed to get last inserted ID")
	}

	logger.With(zap.Uint64(colNameLocationID, uint64(lastInsertedID))).Info("location created")
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
		logger.With(zap.Error(err)).Error("failed to update location")
		return status.Error(codes.Internal, "failed to update location")
	}

	logger.With(zap.Uint64(colNameLocationID, location.ID)).Info("location updated")
	return nil
}

func (o *locationAccessor) Delete(ctx context.Context, id uint64) error {
	logger := utils.LoggerWithContext(ctx, o.logger).Named("LocationAccessor_Delete")
	_, err := o.db.Delete(tableNameLocation).Where(goqu.Ex{colNameLocationID: id}).Executor().ExecContext(ctx)
	if err != nil {
		logger.With(zap.Error(err)).Error("failed to delete location")
		return status.Error(codes.Internal, "failed to delete location")
	}

	logger.With(zap.Uint64(colNameLocationID, id)).Info("location deleted")
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
		logger.With(zap.Error(err)).Error("failed to get location by country, state, city")
		return nil, status.Error(codes.Internal, "failed to get location by country, state, city")
	}
	if !found {
		logger.Info(
			"location not found",
			zap.String(colCountry, country),
			zap.String(colState, state),
			zap.String(colCity, city),
		)
		return nil, status.Error(codes.NotFound, "location not found")
	}

	logger.Info(
		"location found",
		zap.String(colCountry, country),
		zap.String(colState, state),
		zap.String(colCity, city),
	)
	return &location, nil
}
