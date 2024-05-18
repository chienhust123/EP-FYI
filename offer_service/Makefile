VERSION := $(shell cat VERSION)
COMMIT_HASH := $(shell git rev-parse HEAD)
PROJECT_NAME := offer_service

all: generate build-all

.PHONY: generate
generate:
	buf generate api
	wire internal/wiring/wire.go
	go generate ./...

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
	docker compose -f deployments/docker/docker-compose.dev.yaml up -d

.PHONY: docker-compose-dev-down
docker-compose-dev-down:
	docker compose -f deployments/docker/docker-compose.dev.yaml down

.PHONY: run
run:
	go run cmd/$(PROJECT_NAME)/*.go

.PHONY: run-standalone-server
run-standalone-server:
	go run cmd/$(PROJECT_NAME)/*.go standalone-server --with-http=true

.PHONY: lint
lint:
	golangci-lint run ./...

.PHONY: test
test:
	go test ./...