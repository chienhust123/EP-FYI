package database

import (
	"github.com/doug-martin/goqu/v9"
	"go.uber.org/zap"
)

type PositionLevel int32

const (
	PositionLevel_VALUE_UNSPECIFIED PositionLevel = 0
	PositionLevel_VALUE_INTERN      PositionLevel = 1
	PositionLevel_VALUE_ENTRY       PositionLevel = 2
	PositionLevel_VALUE_MIDDLE      PositionLevel = 3
	PositionLevel_VALUE_SENIOR      PositionLevel = 4
	PositionLevel_VALUE_PRINCIPAL   PositionLevel = 5
)

type PositionTab struct {
	ID    uint64        `db:"id"`
	Title string        `db:"title"`
	Level PositionLevel `db:"level"`
}

//go:generate mockgen -source=./position.go -destination=../../../test/mocks/dataaccess/db/position_mock.go -package=mockdatabase
type PositionAccessor interface {
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
