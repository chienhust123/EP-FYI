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
	colNameOfferID = "id"
	tableNameOffer = "location_tab"
)

type CreateOfferParams struct {
	AccountName string
	Password    string
}

type Offer struct {
	ID                   uint64 `db:"id" goqu:"skipupdate"`
	AccountID            uint64 `db:"account_id"`
	CompanyID            uint64 `db:"company_id"`
	LocationID           uint64 `db:"location_id"`
	PositionID           uint64 `db:"position_id"`
	OfferImageID         uint64 `db:"offer_image_id"`
	TotalPackageAmount   uint64 `db:"total_package_amount"`
	TotalPackageCurrency string `db:"total_package_currency"`
	CreatedTime          uint64 `db:"created_time"`
}

//go:generate mockgen -source=./offer_core.go -destination=../../../test/mocks/dataaccess/db/offer_core_mock.go -package=mockdatabase
type OfferAccessor interface {
	Create(ctx context.Context, offer *Offer) error
}

type offerAccessor struct {
	db     *goqu.Database
	logger *zap.Logger
}

func NewOfferAccessor(db *goqu.Database, logger *zap.Logger) OfferAccessor {
	return &offerAccessor{db: db, logger: logger}
}

func (o *offerAccessor) Create(ctx context.Context, offer *Offer) error {
	logger := utils.LoggerWithContext(ctx, o.logger).Named("OfferAccessor_Create")

	result, err := o.db.Insert(tableNameOffer).Rows(offer).Executor().ExecContext(ctx)
	if err != nil {
		logger.With(zap.Error(err)).Error("failed to create offer")
		return status.Error(codes.Internal, "failed to create offer")
	}

	lastInsertedID, err := result.LastInsertId()
	if err != nil {
		logger.With(zap.Error(err)).Error("failed to get last inserted ID")
		return status.Error(codes.Internal, "failed to get last inserted ID")
	}

	logger.With(zap.Uint64(colNameLocationID, uint64(lastInsertedID))).Info("offer created")
	return nil
}
