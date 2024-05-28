package dataaccess

import (
	"auth_service/internal/dataaccess/cache"
	"auth_service/internal/dataaccess/database"
	"github.com/google/wire"
)

var WireSet = wire.NewSet(
	database.WireSet,
	cache.WireSet,
)
