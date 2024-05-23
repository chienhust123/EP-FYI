package database

import "github.com/google/wire"

var WireSet = wire.NewSet(
	NewClient,
	NewMigrator,
	NewCompanyAccessor,
	NewCompanyProfileImageAccessor,
	NewOfferImageAccessor,
	NewCompanyAccessor,
	NewPositionAccessor,
	NewLocationAccessor,
	NewOfferAccessor,
)
