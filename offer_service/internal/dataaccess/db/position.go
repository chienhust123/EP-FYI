package database

import (
	"context"
	"errors"
	"offer_service/internal/pkg/utils"

	"github.com/doug-martin/goqu/v9"
	"go.uber.org/zap"
)

const (
	colNamePositionID = "id"
	tableNamePosition = "position_tab"
	colTitle          = "title"
	colLevel          = "level"

	ErrPositionNotFound   = "position not found"
	ErrGetPositionByID    = "failed to get position by ID"
	ErrCreatePosition     = "failed to create position"
	ErrUpdatePosition     = "failed to update position"
	ErrDeletePosition     = "failed to delete position"
	ErrGetGetByTitleLevel = "failed to get position by title, level"
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

//go:generate mockgen -source=./position.go -destination=../../../test/mocks/dataaccess/db/position_mock.go -package=mockdatabase
type PositionAccessor interface {
	GetByID(ctx context.Context, id uint64) (*Position, error)
	Create(ctx context.Context, offer *Position) error
	Update(ctx context.Context, offer *Position) error
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
		logger.Error(ErrGetLocationByID, zap.Error(err))
		return nil, err
	}
	if !found {
		logger.Info(ErrLocationNotFound, zap.Uint64(colNamePositionID, id))
		return nil, errors.New(ErrPositionNotFound)
	}

	logger.Info("Position found", zap.Uint64(colNamePositionID, id))
	return &position, nil
}

func (o *positionAccessor) Create(ctx context.Context, position *Position) error {
	logger := utils.LoggerWithContext(ctx, o.logger).Named("PositionAccessor_Create")
	_, err := o.db.Insert(tableNamePosition).Rows(position).Executor().ExecContext(ctx)
	if err != nil {
		logger.Error(ErrCreatePosition, zap.Error(err))
		return err
	}

	logger.Info("Position created", zap.Uint64(colNamePositionID, position.ID))
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
		logger.Error(ErrUpdatePosition, zap.Error(err))
		return err
	}

	logger.Info("Position updated", zap.Uint64(colNamePositionID, position.ID))
	return nil
}

func (o *positionAccessor) Delete(ctx context.Context, id uint64) error {
	logger := utils.LoggerWithContext(ctx, o.logger).Named("PositionAccessor_Delete")
	_, err := o.db.Delete(tableNamePosition).Where(goqu.Ex{colNamePositionID: id}).Executor().ExecContext(ctx)
	if err != nil {
		logger.Error(ErrDeletePosition, zap.Error(err))
		return err
	}

	logger.Info("Position deleted", zap.Uint64(colNamePositionID, id))
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
		logger.Error(ErrGetGetByTitleLevel, zap.Error(err))
		return nil, err
	}
	if !found {
		logger.Info(
			"Position not found by title and level",
			zap.String("title", title),
			zap.String("level", string(level)),
		)
		return nil, nil
	}

	logger.Info(
		"Position found by title and level",
		zap.String("title", title),
		zap.String("level", string(level)),
	)
	return &position, nil
}
