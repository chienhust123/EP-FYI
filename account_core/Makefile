VERSION := $(shell cat VERSION)
COMMIT_HASH := $(shell git rev-parse HEAD)
PROJECT_NAME := account_core

all: generate build-all

.PHONY: generate
generate:
	buf generate api

.PHONY: build
build:
	go build \
		-ldflags "-X main.version=$(VERSION) -X main.commitHash=$(COMMIT_HASH)" \
		-o build/$(PROJECT_NAME) \
		cmd/$(PROJECT_NAME)/*.go

.PHONY: clean
clean:
	rm -rf build/

.PHONY: docker-compose-dev-up
docker-compose-dev-up:
	docker-compose -f deployments/docker-compose.dev.yaml up -d

.PHONY: docker-compose-dev-down
docker-compose-dev-down:
	docker-compose -f deployments/docker-compose.dev.yaml down

.PHONY: run
run:
	go run cmd/$(PROJECT_NAME)/*.go

.PHONY: lint
lint:
	golangci-lint run ./...

.PHONY: new_migration
new_migration:
	migrate create -ext sql -dir ./internal/dataaccess/database/migrations/mysql -seq $(NAME)

.PHONY: proto
proto:
	protoc \
	-I api/account_core \
	--go_out=./internal/generated \
	--go-grpc_out=./internal/generated \
	--validate_out="lang=go:./internal/generated" \
	--openapiv2_out=./api/account_core \
	--grpc-gateway_out ./internal/generated --grpc-gateway_opt generate_unbound_methods=true \
	--experimental_allow_proto3_optional \
	api/account_core/account_core.proto