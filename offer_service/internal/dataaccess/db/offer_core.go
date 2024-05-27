package database

import (
	"github.com/doug-martin/goqu/v9"
	"go.uber.org/zap"
)

type CreateOfferParams struct {
	AccountName string
	Password    string
}

type OfferTab struct {
	ID        uint64 `db:"id" goqu:"skipupdate"`
	AccountID uint64 `db:"account_id"`
	CompanyID uint64 `db:"company_id"`
	LocationID           uint64 `db:"location_id"`
	PositionID           uint64 `db:"position_id"`
	OfferImageID         uint64 `db:"offer_image_id"`
	TotalPackageAmount   uint64 `db:"total_package_amount"`
	TotalPackageCurrency string `db:"total_package_currency"`
	CreatedTime          uint64 `db:"created_time"`
}

//go:generate mockgen -source=./offer_core.go -destination=../../../test/mocks/dataaccess/db/offer_core_mock.go -package=mockdatabase
type OfferAccessor interface {
}

type offerAccessor struct {
	db     *goqu.Database
	logger *zap.Logger
}

func NewOfferAccessor(db *goqu.Database, logger *zap.Logger) OfferAccessor {
	return &offerAccessor{db: db, logger: logger}
}
