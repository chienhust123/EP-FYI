package configs

import (
	"fmt"
	"offer_service/configs"
	"os"

	"gopkg.in/yaml.v2"
)

type ConfigFilePath string

type Config struct {
	GRPC     GRPC     `yaml:"grpc"`
	HTTP     HTTP     `yaml:"http"`
	Database Database `yaml:"database"`
	Cache    Cache    `yaml:"cache"`
	Log      Log      `yaml:"log"`
	S3       S3       `yaml:"s3"`
}

func NewConfig(filePath ConfigFilePath) (Config, error) {
	var (
		configBytes = configs.ConfigsYAMLBytes
		config      = Config{}
		err         error
	)

	if filePath != "" {
		configBytes, err = os.ReadFile(string(filePath))
		if err != nil {
			return Config{}, fmt.Errorf("failed to read YAML file: %w", err)
		}
	}

	err = yaml.Unmarshal(configBytes, &config)
	if err != nil {
		return Config{}, fmt.Errorf("failed to unmarshal YAML: %w", err)
	}

	return config, nil
}
