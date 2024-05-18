package common

import "github.com/google/wire"

var WireSet = wire.NewSet(
	NewIDGenerator,
)
