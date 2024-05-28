package main

import (
	"fmt"
	"log"

	"auth_service/internal/configs"
	"auth_service/internal/wiring"
	"github.com/spf13/cobra"
)

var (
	version    string
	commitHash string
)

const (
	flagConfigFilePath = "config-file-path"
)

func standaloneServer() *cobra.Command {
	command := &cobra.Command{
		Use: "standalone-server",
		RunE: func(cmd *cobra.Command, args []string) error {
			configFilePath, err := cmd.Flags().GetString(flagConfigFilePath)
			if err != nil {
				return err
			}

			app, cleanup, err := wiring.InitializeStandaloneServer(configs.ConfigFilePath(configFilePath))
			if err != nil {
				return err
			}
			defer cleanup()

			app.Start()
			return nil
		},
	}

	command.Flags().String(flagConfigFilePath, "", "If provided, will use the provided config file")

	return command
}

func main() {
	rootCommand := &cobra.Command{
		Version: fmt.Sprintf("%s-%s", version, commitHash),
	}
	rootCommand.AddCommand(
		standaloneServer(),
	)

	if err := rootCommand.Execute(); err != nil {
		log.Panic(err)
	}
}
