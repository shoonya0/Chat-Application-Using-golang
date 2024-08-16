package config

import (
	"chat-server/object"
	"fmt"
	"os"
	"path/filepath"
	"runtime"

	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"
	"github.com/spf13/viper"
)

var (
	// take path of binary in server
	_, b, _, _ = runtime.Caller(0)
	// take base path of binary
	basepath = filepath.Dir(b)
)

func New() error {
	// give the path of the config file
	viper.AddConfigPath(basepath + "/envConfig")

	// logger needed

	// Load the environment variables from the .env file
	godotenv.Load("config.env")
	if os.Getenv("GIN_MODE") == "DEVELOPMENT" {
		// logger needed
		fmt.Println("development mode is ON")
		viper.SetConfigName("config.dev")
		gin.SetMode(gin.DebugMode)
	}
	// check for the environment for production
	if os.Getenv("GIN_MODE") == "PRODUCTION" {
		// logger needed
		fmt.Println("production mode is ON")
		viper.SetConfigName("config.prod")
	}
	// check for the environment for pre production
	if os.Getenv("GIN_MODE") == "PRE_PRODUCTION" {
		fmt.Println("pre production mode is ON")
		// logger needed
		viper.SetConfigName("config.pt")
		gin.SetMode(gin.DebugMode)
	}

	// set the config type
	viper.SetConfigType("json")
	// read the config file
	viper.AutomaticEnv()

	if err := viper.ReadInConfig(); err != nil {
		// looging needed
		fmt.Println("an error in reading the config file in viper")
	}

	// the date which is in the json if mathch to config object then it will be unmarshal
	if err := viper.Unmarshal(&object.GlobalConfig); err != nil {
		// logger needed
		fmt.Println("an error in unmarshal the data from viper to GlobleConfig")
	}

	return nil
}
