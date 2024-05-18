package database

import (
	"context"
	"offer_service/internal/pkg/utils"
	"time"

	"github.com/doug-martin/goqu/v9"
	"go.uber.org/zap"
)

const (
	TableNameCompanyProfileImage         = "company_profile_image_tab"
	colNameCompanyProfileImageID         = "id"
	colNameCompanyProfileImageObjectName = "object_name"
	colNameCompanyProfileImageExpireTime = "expire_time"
)

type CompanyProfileImageTab struct {
	ID         uint64        `db:"id"          goqu:"skipupdate"`
	ObjectName string        `db:"object_name"`
	ExpireTime time.Duration `db:"expire_time" goqu:"skipupdate"`
}

//go:generate mockgen -source=./company_profile_image.go -destination=../../../test/mocks/dataaccess/db/company_profile_image_mock.go -package=mockdatabase
type OfferCoreAccessor interface {
	CreateCompanyProfileImage(ctx context.Context, data *CompanyProfileImageTab) error
}

type offerCoreAccessor struct {
	db     *goqu.Database
	logger *zap.Logger
}

func NewOfferCoreAccessor(db *goqu.Database, logger *zap.Logger) OfferCoreAccessor {
	return &offerCoreAccessor{db: db, logger: logger}
}

func (o *offerCoreAccessor) CreateCompanyProfileImage(
	ctx context.Context,
	data *CompanyProfileImageTab,
) error {
	logger := utils.LoggerWithContext(ctx, o.logger).Named("CreateCompanyProfileImage")
	tx, txErr := o.db.BeginTx(ctx, nil)
	if txErr != nil {
		logger.With(zap.Error(txErr)).
			Error("failed to create transaction to create company profile image")
		return txErr
	}

	ds := tx.Insert(TableNameCompanyProfileImage).Rows(data).Executor()
	_, createErr := ds.ExecContext(ctx)
	if createErr != nil {
		logger.With(zap.Error(createErr)).Error("failed to create company profile image")
		rollbackErr := tx.Rollback()
		if rollbackErr != nil {
			logger.With(zap.Error(rollbackErr)).Error("failed to rollback insert database")
			return rollbackErr
		}
		return createErr
	}

	if commitErr := tx.Commit(); commitErr != nil {
		logger.With(zap.Error(commitErr)).Error("failed to commit create company profile image")
		rollbackErr := tx.Rollback()
		if rollbackErr != nil {
			logger.With(zap.Error(rollbackErr)).Error("failed to rollback commit")
			return rollbackErr
		}
		return commitErr
	}

	return nil
}
