package database

import (
	"github.com/doug-martin/goqu/v9"
	"go.uber.org/zap"
)

type LocationTab struct {
	ID      uint64 `db:"id"`
	Country string `db:"country"`
	State   string `db:"state"`
	City    string `db:"city"`
}

//go:generate mockgen -source=./location.go -destination=../../../test/mocks/dataaccess/db/location_mock.go -package=mockdatabase
type LocationAccessor interface {
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
