package database

import (
	"context"
	"errors"

	"github.com/doug-martin/goqu/v9"
	"go.uber.org/zap"
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
	ID     uint64        `db:"id"`
	Title  string        `db:"title"`
	Level  PositionLevel `db:"level"`
	Offers []OfferTab
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

const (
	TablePositionName = "position_tab"
)

func (o *positionAccessor) GetByID(ctx context.Context, id uint64) (*PositionTab, error) {
	var position PositionTab
	found, err := o.db.From(TablePositionName).
		Where(goqu.Ex{"id": id}).
		ScanStructContext(ctx, &position)
	if err != nil {
		o.logger.Error("Failed to get position by ID", zap.Error(err))
		return nil, err
	}
	if !found {
		o.logger.Info("Position not found", zap.Uint64("id", id))
		return nil, errors.New("position not found")
	}

	o.logger.Info("Position found", zap.Uint64("id", id))
	return &position, nil
}

func (o *positionAccessor) Create(ctx context.Context, position *PositionTab) error {
	record := structToRecord(position)
	insertSQL, _, err := o.db.Insert(TablePositionName).Rows(record).ToSQL()
	if err != nil {
		o.logger.Error("Failed to create SQL", zap.Error(err))
		return err
	}
	_, err = o.db.ExecContext(ctx, insertSQL)
	if err != nil {
		o.logger.Error("Failed to execute insert SQL", zap.Error(err))
		return err
	}
	o.logger.Info("Position created", zap.Uint64("id", position.ID))
	return nil
}

func (o *positionAccessor) Update(ctx context.Context, position *PositionTab) error {
	record := structToRecord(position)
	updateSQL, _, err := o.db.Update(TablePositionName).
		Set(record).
		Where(goqu.Ex{"id": position.ID}).
		ToSQL()
	if err != nil {
		o.logger.Error("Failed to create update SQL", zap.Error(err))
		return err
	}
	_, err = o.db.ExecContext(ctx, updateSQL)
	if err != nil {
		o.logger.Error("Failed to execute update SQL", zap.Error(err))
		return err
	}
	o.logger.Info("Position updated", zap.Uint64("id", position.ID))
	return nil
}

func (o *positionAccessor) Delete(ctx context.Context, id uint64) error {
	deleteSQL, _, err := o.db.Delete(TablePositionName).Where(goqu.Ex{"id": id}).ToSQL()
	if err != nil {
		o.logger.Error("Failed to create delete SQL", zap.Error(err))
		return err
	}
	_, err = o.db.ExecContext(ctx, deleteSQL)
	if err != nil {
		o.logger.Error("Failed to execute delete SQL", zap.Error(err))
		return err
	}
	o.logger.Info("Position deleted", zap.Uint64("id", id))
	return nil
}

func (o *positionAccessor) GetByTitleLevel(
	ctx context.Context,
	title string,
	level PositionLevel,
) (*PositionTab, error) {
	var position PositionTab

	found, err := o.db.From(TablePositionName).
		Where(goqu.Ex{"title": title, "level": level}).
		ScanStructContext(ctx, &position)
	if err != nil {
		o.logger.Error("Failed to get position by title and level", zap.Error(err))
		return nil, err
	}
	if !found {
		o.logger.Info(
			"Position not found by title and level",
			zap.String("title", title),
			zap.String("level", string(level)),
		)
		return nil, nil
	}

	o.logger.Info(
		"Position found by title and level",
		zap.String("title", title),
		zap.String("level", string(level)),
	)
	return &position, nil
}
