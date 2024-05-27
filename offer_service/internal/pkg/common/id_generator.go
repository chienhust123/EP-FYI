package common

import "github.com/godruoyi/go-snowflake"

//go:generate mockgen -source=./id_generator.go -destination=./id_generator_mock.go -package=common
type IDGenerator interface {
	GenerateID() uint64
}

type SnowflakeIDGenerator struct{}

func NewIDGenerator() IDGenerator {
	return &SnowflakeIDGenerator{}
}

func (s *SnowflakeIDGenerator) GenerateID() uint64 {
	return snowflake.ID()
}
