package handlers

import (
	"offer_service/internal/handlers/grpc"
	"offer_service/internal/handlers/http"
	"offer_service/internal/handlers/s3"

	"github.com/google/wire"
)

var WireSet = wire.NewSet(
	grpc.WireSet,
	http.WireSet,
	s3.WireSet,
)
