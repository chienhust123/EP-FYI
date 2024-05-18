package pkg

import (
	"offer_service/internal/pkg/common"
	"offer_service/internal/pkg/configs"
	"offer_service/internal/pkg/utils"

	"github.com/google/wire"
)

var WireSet = wire.NewSet(
	configs.WireSet,
	utils.WireSet,
	common.WireSet,
)
