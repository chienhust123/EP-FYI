package handler

import (
	"auth_service/internal/handler/grpc"
	"github.com/google/wire"
)

var WireSet = wire.NewSet(
	grpc.WireSet,
)
