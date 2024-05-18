package utils

import (
	"context"
	"fmt"
	"io/fs"
	"offer_service/internal/pkg/configs"
	"os"
	"path/filepath"
	"time"

	"go.uber.org/zap"
	"go.uber.org/zap/zapcore"
)

func NewLogger(logConfig configs.Log) (*zap.Logger, func(), error) {
	logDir := "logs"
	var logFilePermission fs.FileMode = 0o644

	if err := os.MkdirAll(logDir, os.ModePerm); err != nil {
		return nil, nil, err
	}

	logFileName := filepath.Join(
		logDir,
		fmt.Sprintf("%s-%s.log", logConfig.FileName, time.Now().Format("2006-01-02")),
	)
	logFile, err := os.OpenFile(logFileName, os.O_CREATE|os.O_APPEND|os.O_WRONLY, logFilePermission)
	if err != nil {
		return nil, nil, err
	}

	encoderConfig := zapcore.EncoderConfig{
		TimeKey:        "time",
		LevelKey:       "level",
		NameKey:        "logger",
		CallerKey:      "caller",
		MessageKey:     "message",
		StacktraceKey:  "stacktrace",
		LineEnding:     zapcore.DefaultLineEnding,
		EncodeTime:     zapcore.ISO8601TimeEncoder,
		EncodeLevel:    zapcore.CapitalColorLevelEncoder, // Add color to level
		EncodeDuration: zapcore.SecondsDurationEncoder,
		EncodeCaller:   zapcore.ShortCallerEncoder,
	}

	getLevel := getZapLoggerLevel(logConfig.Level)

	core := zapcore.NewTee(
		zapcore.NewCore(
			zapcore.NewJSONEncoder(encoderConfig),
			zapcore.NewMultiWriteSyncer(zapcore.AddSync(logFile)),
			getLevel,
		),
		zapcore.NewCore(
			zapcore.NewConsoleEncoder(encoderConfig), // Colored console output
			zapcore.Lock(os.Stdout),
			getLevel,
		),
	)

	logger := zap.New(core)

	cleanup := func() {
		// deliberately ignore the returned error here
		_ = logger.Sync()
	}

	return logger, cleanup, nil
}

func getZapLoggerLevel(level string) zap.AtomicLevel {
	switch level {
	case "debug":
		return zap.NewAtomicLevelAt(zap.DebugLevel)
	case "info":
		return zap.NewAtomicLevelAt(zap.InfoLevel)
	case "warn":
		return zap.NewAtomicLevelAt(zap.WarnLevel)
	case "error":
		return zap.NewAtomicLevelAt(zap.ErrorLevel)
	case "panic":
		return zap.NewAtomicLevelAt(zap.PanicLevel)
	default:
		return zap.NewAtomicLevelAt(zap.InfoLevel)
	}
}

func LoggerWithContext(_ context.Context, logger *zap.Logger) *zap.Logger {
	return logger
}
