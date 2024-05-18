package main

import (
	"fmt"
	"log"
	"offer_service/internal/pkg/configs"
	"offer_service/internal/wiring"

	"github.com/spf13/cobra"
)

var (
	version    string
	commitHash string
)

const (
	flagConfigFilePath = "config-file-path"
	flagrunWithHTTP    = "with-http"
)

func server() *cobra.Command {
	command := &cobra.Command{
		Use:  "standalone-server",
		Long: "Start all components of Offer Service - gRPC, Kafka consumer, Cronjobs - as a single process",
		RunE: func(cmd *cobra.Command, _ []string) error {
			configFilePath, err := cmd.Flags().GetString(flagConfigFilePath)
			if err != nil {
				return err
			}

			runWithHTTP, err := cmd.Flags().GetBool(flagrunWithHTTP)
			if err != nil {
				return err
			}

			app, cleanup, err := wiring.InitializeStandaloneServer(
				configs.ConfigFilePath(configFilePath),
				runWithHTTP,
			)
			if err != nil {
				log.Fatal(err)
				return err
			}

			defer cleanup()

			return app.Start()
		},
	}

	command.Flags().
		Bool(flagrunWithHTTP, false, "If true, will run with HTTP Gateway (Should be used to test on local)")

	command.Flags().
		String(flagConfigFilePath, "", "If provided, will use the provided config file.")

	return command
}

func main() {
	rootCommand := &cobra.Command{
		Version: fmt.Sprintf("%s-%s", version, commitHash),
	}
	rootCommand.AddCommand(
		server(),
	)

	if err := rootCommand.Execute(); err != nil {
		log.Panic(err.Error())
	}
}
