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
	tableNameCompanyProfileImage         = "company_profile_image_tab"
	colNameCompanyProfileImageID         = "id"
	colNameCompanyProfileImageObjectName = "object_name"
	colNameCompanyProfileImageExpireTime = "expire_time"
)

type CompanyProfileImage struct {
	ID         uint64        `db:"id"          goqu:"skipupdate"`
	ObjectName string        `db:"object_name" goqu:"skipupdate"`
	ExpireTime time.Duration `db:"expire_time" goqu:"skipupdate"`
}

//go:generate mockgen -source=./company_profile_image.go -destination=./company_profile_image_mock.go -package=database
type CompanyProfileImageAccessor interface {
	CreateCompanyProfileImage(ctx context.Context, data *CompanyProfileImage) error
}

type companyProfileImageAccessor struct {
	db     *goqu.Database
	logger *zap.Logger
}

func NewCompanyProfileImageAccessor(
	db *goqu.Database,
	logger *zap.Logger,
) CompanyProfileImageAccessor {
	logger = logger.Named("CompanyProfileImageAccessor")
	return &companyProfileImageAccessor{db: db, logger: logger}
}

func (a companyProfileImageAccessor) CreateCompanyProfileImage(
	ctx context.Context,
	data *CompanyProfileImage,
) error {
	logger := utils.LoggerWithContext(ctx, a.logger).Named("CreateCompanyProfileImage")
	tx, txErr := a.db.BeginTx(ctx, nil)
	if txErr != nil {
		logger.With(zap.Error(txErr)).
			Error("failed to create transaction to create company profile image")
		return txErr
	}

	ds := tx.Insert(tableNameCompanyProfileImage).Rows(data).Executor()
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
