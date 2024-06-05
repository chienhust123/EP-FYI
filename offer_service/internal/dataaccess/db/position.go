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
	colNamePositionID = "id"
	tableNamePosition = "position_tab"
	colTitle          = "title"
	colLevel          = "level"
)

type PositionLevel int32

const (
	PositionLevelValueUnspecified PositionLevel = 0
	PositionLevelValueIntern      PositionLevel = 1
	PositionLevelValueEntry       PositionLevel = 2
	PositionLevelValueMiddle      PositionLevel = 3
	PositionLevelValueSenior      PositionLevel = 4
	PositionLevelValuePrinciple   PositionLevel = 5
)

type Position struct {
	ID    uint64        `db:"id" goqu:"skipupdate"`
	Title string        `db:"title"`
	Level PositionLevel `db:"level"`
}

//go:generate mockgen -source=./position.go -destination=./position_mock.go -package=database
type PositionAccessor interface {
	GetByID(ctx context.Context, id uint64) (*Position, error)
	Create(ctx context.Context, position *Position) error
	Update(ctx context.Context, position *Position) error
	Delete(ctx context.Context, id uint64) error
	GetByTitleLevel(ctx context.Context, title string, level PositionLevel) (*Position, error)
}

type positionAccessor struct {
	db     *goqu.Database
	logger *zap.Logger
}

func NewPositionAccessor(
	db *goqu.Database,
	logger *zap.Logger,
) PositionAccessor {
	return &positionAccessor{db: db, logger: logger}
}

func (o *positionAccessor) GetByID(ctx context.Context, id uint64) (*Position, error) {
	logger := utils.LoggerWithContext(ctx, o.logger).Named("PositionAccessor_GetByID")

	var position Position
	found, err := o.db.From(tableNamePosition).
		Where(goqu.Ex{colNamePositionID: id}).
		ScanStructContext(ctx, &position)
	if err != nil {
		logger.With(zap.Error(err)).Error("failed to get position by ID")
		return nil, status.Error(codes.Internal, "failed to get position by ID")
	}
	if !found {
		logger.With(zap.Uint64(colNamePositionID, id)).Warn("position not found")
		return nil, status.Error(codes.NotFound, "position not found")
	}

	logger.With(zap.Uint64(colNamePositionID, id)).Info("position found")
	return &position, nil
}

func (o *positionAccessor) Create(ctx context.Context, position *Position) error {
	logger := utils.LoggerWithContext(ctx, o.logger).Named("PositionAccessor_Create")
	result, err := o.db.Insert(tableNamePosition).Rows(position).Executor().ExecContext(ctx)
	if err != nil {
		logger.With(zap.Error(err)).Error("failed to create position")
		return status.Error(codes.Internal, "failed to create position")
	}

	lastInsertedID, err := result.LastInsertId()
	if err != nil {
		logger.With(zap.Error(err)).Error("failed to get last inserted ID")
		return status.Error(codes.Internal, "failed to get last inserted ID")
	}

	logger.With(zap.Uint64(colNamePositionID, uint64(lastInsertedID))).Info("position created")
	return nil
}

func (o *positionAccessor) Update(ctx context.Context, position *Position) error {
	logger := utils.LoggerWithContext(ctx, o.logger).Named("PositionAccessor_Update")
	_, err := o.db.Update(tableNamePosition).
		Set(position).
		Where(goqu.Ex{colNamePositionID: position.ID}).
		Executor().
		ExecContext(ctx)
	if err != nil {
		logger.With(zap.Error(err)).Error("failed to update position")
		return status.Error(codes.Internal, "failed to update position")
	}

	logger.With(zap.Uint64(colNamePositionID, position.ID)).Info("position updated")
	return nil
}

func (o *positionAccessor) Delete(ctx context.Context, id uint64) error {
	logger := utils.LoggerWithContext(ctx, o.logger).Named("PositionAccessor_Delete")
	_, err := o.db.Delete(tableNamePosition).Where(goqu.Ex{colNamePositionID: id}).Executor().ExecContext(ctx)
	if err != nil {
		logger.With(zap.Error(err)).Error("failed to delete position")
		return status.Error(codes.Internal, "failed to delete position")
	}

	logger.With(zap.Uint64(colNamePositionID, id)).Info("position deleted")
	return nil
}

func (o *positionAccessor) GetByTitleLevel(
	ctx context.Context,
	title string,
	level PositionLevel,
) (*Position, error) {
	logger := utils.LoggerWithContext(ctx, o.logger).Named("PositionAccessor_GetByTitleLevel")

	var position Position
	found, err := o.db.From(tableNamePosition).
		Where(goqu.Ex{colTitle: title, colLevel: level}).
		ScanStructContext(ctx, &position)
	if err != nil {
		logger.With(zap.Error(err)).Error("failed to get position by title, level")
		return nil, status.Error(codes.Internal, "failed to get position by title, level")
	}
	if !found {
		logger.Info(
			"position not found",
			zap.String(colTitle, title),
			zap.Int32(colLevel, int32(level)),
		)
		return nil, status.Error(codes.NotFound, "position not found")
	}

	logger.Info(
		"position found",
		zap.String(colTitle, title),
		zap.Int32(colLevel, int32(level)),
	)
	return &position, nil
}
