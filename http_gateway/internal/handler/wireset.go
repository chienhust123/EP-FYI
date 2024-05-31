package handler

import (
	"github.com/google/wire"
	"http_gateway/internal/handler/http"
)

var WireSet = wire.NewSet(
	http.WireSet,
)
