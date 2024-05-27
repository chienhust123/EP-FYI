//nolint:dupl // disable this lint because it raised false positive check.
package database

import (
	"context"
	"offer_service/internal/pkg/utils"
	"time"

	"github.com/doug-martin/goqu/v9"
	"go.uber.org/zap"
)

const (
	tableNameOfferImage         = "offer_image_tab"
	colNameOfferImageID         = "id"
	colNameOfferImageObjectName = "object_name"
	colNameOfferImageExpireTime = "expire_time"
)

type OfferImage struct {
	ID         uint64        `db:"id"          goqu:"skipupdate"`
	ObjectName string        `db:"object_name" goqu:"skipupdate"`
	ExpireTime time.Duration `db:"expire_time" goqu:"skipupdate"`
}

//go:generate mockgen -source=./offer_image.go -destination=./offer_image_mock.go -package=database
type OfferImageAccessor interface {
	CreateOfferImage(ctx context.Context, data *OfferImage) error
}

type offerImageAccessor struct {
	db     *goqu.Database
	logger *zap.Logger
}

func NewOfferImageAccessor(
	db *goqu.Database,
	logger *zap.Logger,
) OfferImageAccessor {
	logger = logger.Named("OfferImageAccessor")
	return &offerImageAccessor{db: db, logger: logger}
}

func (a offerImageAccessor) CreateOfferImage(
	ctx context.Context,
	data *OfferImage,
) error {
	logger := utils.LoggerWithContext(ctx, a.logger).Named("CreateOfferImage")
	tx, txErr := a.db.BeginTx(ctx, nil)
	if txErr != nil {
		logger.With(zap.Error(txErr)).
			Error("failed to create transaction to create company profile image")
		return txErr
	}

	ds := tx.Insert(tableNameOfferImage).Rows(data).Executor()
	_, createErr := ds.ExecContext(ctx)
	if createErr != nil {
		logger.With(zap.Error(createErr)).Error("failed to create company profile image")
		if rollbackErr := tx.Rollback(); rollbackErr != nil {
			logger.With(zap.Error(rollbackErr)).Error("failed to rollback insert database")
			return rollbackErr
		}
		return createErr
	}

	if commitErr := tx.Commit(); commitErr != nil {
		logger.With(zap.Error(commitErr)).Error("failed to commit create company profile image")
		if rollbackErr := tx.Rollback(); rollbackErr != nil {
			logger.With(zap.Error(rollbackErr)).Error("failed to rollback commit")
			return rollbackErr
		}
		return commitErr
	}

	return nil
}
