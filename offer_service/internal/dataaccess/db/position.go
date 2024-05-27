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

type PositionTab struct {
	ID    uint64        `db:"id" goqu:"skipupdate"`
	Title string        `db:"title"`
	Level PositionLevel `db:"level"`
}

//go:generate mockgen -source=./position.go -destination=../../../test/mocks/dataaccess/db/position_mock.go -package=mockdatabase
type PositionAccessor interface {
	GetByID(ctx context.Context, id uint64) (*PositionTab, error)
	Create(ctx context.Context, offer *PositionTab) error
	Update(ctx context.Context, offer *PositionTab) error
	Delete(ctx context.Context, id uint64) error
	GetByTitleLevel(ctx context.Context, title string, level PositionLevel) (*PositionTab, error)
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

func (o *positionAccessor) GetByID(ctx context.Context, id uint64) (*PositionTab, error) {
	logger := utils.LoggerWithContext(ctx, o.logger).Named("PositionAccessor_GetByID")
	var position PositionTab
	found, err := o.db.From(tableNamePosition).
		Where(goqu.Ex{colNamePositionID: id}).
		ScanStructContext(ctx, &position)
	if err != nil {
		logger.Error("Failed to get position by ID", zap.Error(err))
		return nil, err
	}
	if !found {
		logger.Info("Position not found", zap.Uint64(colNamePositionID, id))
		return nil, errors.New("position not found")
	}

	logger.Info("Position found", zap.Uint64(colNamePositionID, id))
	return &position, nil
}

func (o *positionAccessor) Create(ctx context.Context, position *PositionTab) error {
	logger := utils.LoggerWithContext(ctx, o.logger).Named("PositionAccessor_Create")
	insertSQL, _, err := o.db.Insert(tableNamePosition).Rows(position).ToSQL()
	if err != nil {
		logger.Error("Failed to create SQL", zap.Error(err))
		return err
	}
	_, err = o.db.ExecContext(ctx, insertSQL)
	if err != nil {
		logger.Error("Failed to execute insert SQL", zap.Error(err))
		return err
	}
	logger.Info("Position created", zap.Uint64(colNamePositionID, position.ID))
	return nil
}

func (o *positionAccessor) Update(ctx context.Context, position *PositionTab) error {
	logger := utils.LoggerWithContext(ctx, o.logger).Named("PositionAccessor_Update")
	updateSQL, _, err := o.db.Update(tableNamePosition).
		Set(position).
		Where(goqu.Ex{colNamePositionID: position.ID}).
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
	logger.Info("Position updated", zap.Uint64(colNamePositionID, position.ID))
	return nil
}

func (o *positionAccessor) Delete(ctx context.Context, id uint64) error {
	logger := utils.LoggerWithContext(ctx, o.logger).Named("PositionAccessor_Delete")
	deleteSQL, _, err := o.db.Delete(tableNamePosition).Where(goqu.Ex{colNamePositionID: id}).ToSQL()
	if err != nil {
		logger.Error("Failed to create delete SQL", zap.Error(err))
		return err
	}
	_, err = o.db.ExecContext(ctx, deleteSQL)
	if err != nil {
		logger.Error("Failed to execute delete SQL", zap.Error(err))
		return err
	}
	logger.Info("Position deleted", zap.Uint64(colNamePositionID, id))
	return nil
}

func (o *positionAccessor) GetByTitleLevel(
	ctx context.Context,
	title string,
	level PositionLevel,
) (*PositionTab, error) {
	logger := utils.LoggerWithContext(ctx, o.logger).Named("PositionAccessor_GetByTitleLevel")
	var position PositionTab

	found, err := o.db.From(tableNamePosition).
		Where(goqu.Ex{"title": title, "level": level}).
		ScanStructContext(ctx, &position)
	if err != nil {
		logger.Error("Failed to get position by title and level", zap.Error(err))
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
