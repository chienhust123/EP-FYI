//nolint:dupl // disable this lint because it raised false positive check.
package database

import (
	"context"
	"offer_service/internal/pkg/utils"

	"github.com/doug-martin/goqu/v9"
	"go.uber.org/zap"
)

const (
	tableNameCompany            = "company_tab"
	colNameCompanyID            = "id"
	colNameCompanyName          = "name"
	colNameCompanyNameLowerCase = "name_lowercase"
	colNameProfileImageID       = "company_profile_image_id"
)

type Company struct {
	ID             uint64 `db:"id"                       goqu:"skipupdate"`
	Name           string `db:"name"`
	NameLowerCase  string `db:"name_lowercase"`
	ProfileImageID uint64 `db:"company_profile_image_id"`
}

//go:generate mockgen -source=./company.go -destination=./company_mock.go -package=database
type CompanyAccessor interface {
	CreateCompany(ctx context.Context, data *Company) error
	UpdateCompany(ctx context.Context, data *Company) error
}

type companyAccessor struct {
	db     *goqu.Database
	logger *zap.Logger
}

func NewCompanyAccessor(
	db *goqu.Database,
	logger *zap.Logger,
) CompanyAccessor {
	logger = logger.Named("CompanyAccessor")
	return &companyAccessor{db: db, logger: logger}
}

func (a companyAccessor) CreateCompany(ctx context.Context, data *Company) error {
	logger := utils.LoggerWithContext(ctx, a.logger).Named("CreateCompany")
	tx, txErr := a.db.BeginTx(ctx, nil)
	if txErr != nil {
		logger.With(zap.Error(txErr)).Error("failed to create transaction to create company")
		return txErr
	}

	ds := tx.Insert(tableNameCompany).Rows(data).Executor()
	_, createErr := ds.ExecContext(ctx)
	if createErr != nil {
		logger.With(zap.Error(createErr)).Error("failed to create company")
		if rollbackErr := tx.Rollback(); rollbackErr != nil {
			logger.With(zap.Error(rollbackErr)).Error("failed to rollback insert database")
			return rollbackErr
		}
		return createErr
	}

	if commitErr := tx.Commit(); commitErr != nil {
		logger.With(zap.Error(commitErr)).Error("failed to commit create company")
		if rollbackErr := tx.Rollback(); rollbackErr != nil {
			logger.With(zap.Error(rollbackErr)).Error("failed to rollback commit")
			return rollbackErr
		}
		return commitErr
	}

	return nil
}

func (a companyAccessor) UpdateCompany(
	ctx context.Context,
	data *Company,
) error {
	logger := utils.LoggerWithContext(ctx, a.logger).Named("UpdateCompany")
	tx, txErr := a.db.BeginTx(ctx, nil)
	if txErr != nil {
		logger.With(zap.Error(txErr)).Error("failed to create transaction to update company")
		return txErr
	}

	ds := tx.Update(tableNameCompany).Where(goqu.Ex{"id": data.ID}).Set(data).Executor()
	_, createErr := ds.ExecContext(ctx)
	if createErr != nil {
		logger.With(zap.Error(createErr)).Error("failed to update company")
		if rollbackErr := tx.Rollback(); rollbackErr != nil {
			logger.With(zap.Error(rollbackErr)).Error("failed to rollback insert database")
			return rollbackErr
		}
		return createErr
	}

	if commitErr := tx.Commit(); commitErr != nil {
		logger.With(zap.Error(commitErr)).Error("failed to commit update company")
		if rollbackErr := tx.Rollback(); rollbackErr != nil {
			logger.With(zap.Error(rollbackErr)).Error("failed to rollback commit")
			return rollbackErr
		}
		return commitErr
	}

	return nil
}
