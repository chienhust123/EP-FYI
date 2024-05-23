package database

import (
	"context"
	"fmt"

	"auth_service/internal/configs"
	"gorm.io/driver/mysql"
	"gorm.io/gorm"
	"gorm.io/gorm/schema"
)

type Database struct {
	*gorm.DB
}

func NewDatabase(dbConfig configs.Database) (Database, func(), error) {
	dbMigrator, err := NewMigrator(dbConfig)
	if err != nil {
		return Database{}, nil, err
	}
	err = dbMigrator.Up(context.Background())
	if err != nil {
		return Database{}, nil, err
	}

	db, cleanup, err := NewGORMDatabase(dbConfig)
	if err != nil {
		return Database{}, nil, err
	}

	return Database{
		DB: db,
	}, cleanup, nil
}

func NewGORMDatabase(dbConfig configs.Database) (*gorm.DB, func(), error) {
	// Create data source name (DSN) string
	dsn := fmt.Sprintf("%s:%s@tcp(%s:%d)/%s?parseTime=true", dbConfig.Username, dbConfig.Password, dbConfig.Host, dbConfig.Port, dbConfig.Database)

	// Open GORM database connection
	db, err := gorm.Open(mysql.Open(dsn), &gorm.Config{
		NamingStrategy: schema.NamingStrategy{
			SingularTable: true,
		},
	})
	if err != nil {
		return nil, nil, err
	}

	cleanup := func() {
		sqlDB, _ := db.DB()
		sqlDB.Close()
	}

	return db, cleanup, nil
}