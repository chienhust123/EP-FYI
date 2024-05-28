//go:build wireinject
// +build wireinject

// go:generate go run github.com/google/wire/cmd/wire
package wiring

import (
	"auth_service/internal/app"
	"auth_service/internal/configs"
	"auth_service/internal/dataaccess"
	"auth_service/internal/handler"
	"auth_service/internal/logic"
	"auth_service/internal/utils"
	"github.com/google/wire"
)

var WireSet = wire.NewSet(
	configs.WireSet,
	dataaccess.WireSet,
	handler.WireSet,
	logic.WireSet,
	utils.WireSet,
	app.WireSet,
)

func InitializeStandaloneServer(configFilePath configs.ConfigFilePath) (app.StandaloneServer, func(), error) {
	wire.Build(WireSet)

	return app.StandaloneServer{}, nil, nil
}
