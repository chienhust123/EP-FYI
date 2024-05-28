package database

import "github.com/google/wire"

var WireSet = wire.NewSet(
	NewAccountDataAccessor,
	NewPublicKeyDataAccessor,
	NewMigrator,
	NewDatabase,
)
