package http

import (
	"net/http"

	"github.com/felixge/httpsnoop"
	"go.uber.org/zap"
)

func LoggingMiddleware(logger *zap.Logger) func(http.Handler) http.Handler {
	return func(next http.Handler) http.Handler {
		return http.HandlerFunc(func(writer http.ResponseWriter, request *http.Request) {
			m := httpsnoop.CaptureMetrics(next, writer, request)
			logger.With(
				zap.Int("status", m.Code),
				zap.String("duration", m.Duration.String()),
				zap.String("handler", request.URL.Path),
			).Info("calling api...")
		})
	}
}
