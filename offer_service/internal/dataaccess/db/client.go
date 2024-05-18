package database

import (
	"context"
	"database/sql"
	"fmt"
	"offer_service/internal/pkg/configs"
	"strings"
	"time"

	"github.com/doug-martin/goqu/v9"
	// import the dialect.
	_ "github.com/doug-martin/goqu/v9/dialect/mysql"
	_ "github.com/go-sql-driver/mysql" // Import MySQL driver
	"go.uber.org/zap"
)

var (
	retryInterval = 5 * time.Second
)

func startMigrationUp(sqlDB *sql.DB, dbType string, logger *zap.Logger) error {
	if pingSQLDBErr := sqlDB.Ping(); pingSQLDBErr != nil {
		return pingSQLDBErr
	}

	migrator := NewMigrator(sqlDB, dbType, logger)
	if migrationErr := migrator.Up(context.Background()); migrationErr != nil {
		return migrationErr
	}

	return nil
}

func getDatabaseSourceName(conf configs.Database) string {
	return fmt.Sprintf("%s:%s@tcp(%s:%d)/%s?charset=utf8mb4&parseTime=True&loc=Local",
		conf.Username,
		conf.Password,
		conf.Host,
		conf.Port,
		conf.Database,
	)
}

func NewClient(conf configs.Database, logger *zap.Logger) (*goqu.Database, func(), error) {
	var (
		db    *goqu.Database
		sqlDB *sql.DB
		err   error
	)

	logger = logger.Named(strings.ToUpper(conf.Type))

	dsn := getDatabaseSourceName(conf)

	cleanup := func() {
		if sqlDB != nil {
			sqlDB.Close()
		}
	}

	for {
		sqlDB, err = sql.Open(conf.Type, dsn)
		if err != nil {
			logger.With(zap.Error(err)).Error("error opening database connection")
			time.Sleep(retryInterval)
			continue
		}

		if err = startMigrationUp(sqlDB, conf.Type, logger); err != nil {
			logger.With(zap.String("database", conf.Type), zap.Error(err)).
				Error("error getting database source name")
			time.Sleep(retryInterval)
			continue
		}

		db = goqu.New(conf.Type, sqlDB)
		break
	}

	return db, cleanup, nil
}
