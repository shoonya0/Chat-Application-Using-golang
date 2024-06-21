package main

import (
	"fmt"
	"log"
	"os"

	xyz "shoonya0/ChatApplication/object"
	"shoonya0/ChatApplication/routes"

	"path/filepath"

	"flag"

	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"
)

var (
	port string
	ver  bool
)

// initilize before main
func init() {
	flag.StringVar(&port, "port", ":3033", "The port to listen on.")
	flag.BoolVar(&ver, "version", false, "Print server version.")
}

func main() {
	envPath := filepath.Join("..", "..", ".env")
	err := godotenv.Load(envPath)
	if err != nil {
		log.Fatalf("Error loading .env file: %v", err)
	}

	DB_HOST := os.Getenv("DB_HOST")
	fmt.Printf("check: %s\n", DB_HOST)

	fmt.Printf("check: %s\n", xyz.PORT)

	root := gin.Default()

	// make a simple get request
	root.GET("/", func(c *gin.Context) {
		c.JSON(200, gin.H{
			"message": "Hello World!",
		})
	})

	routes.AuthRoutes(root)

	root.Run("localhost" + port)
	// r.Run() // listen and serve on 0.0.0.0:8080 (for windows "localhost:8080")
}
