//go:build wireinject
// +build wireinject

//
//go:generate go run github.com/google/wire/cmd/wire

package wiring

import (
	"offer_service/internal/app"
	"offer_service/internal/dataaccess"
	"offer_service/internal/handlers"
	"offer_service/internal/logic"
	"offer_service/internal/pkg"
	"offer_service/internal/pkg/configs"

	"github.com/google/wire"
)

var WireSet = wire.NewSet(
	app.WireSet,
	handlers.WireSet,
	pkg.WireSet,
	logic.WireSet,
	dataaccess.WireSet,
)

func InitializeStandaloneServer(
	configFilePath configs.ConfigFilePath,
	runWithHTTP bool,
) (*app.StandaloneServer, func(), error) {
	wire.Build(WireSet)

	return nil, nil, nil
}
