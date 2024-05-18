package dataaccess

import (
	database "offer_service/internal/dataaccess/db"

	"github.com/google/wire"
)

var WireSet = wire.NewSet(
	database.WireSet,
)
