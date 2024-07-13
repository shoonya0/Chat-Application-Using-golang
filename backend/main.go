package main

import (
	"log"
	"os"

	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"
)

func main() {
	r := gin.Default()

	godotenv.Load("config.env")
	// os.Setenv("PORT", "8011")
	port := os.Getenv("PORT")
	if port == "" {
		port = "8085"
	}

	if err := r.Run(": " + port); err != nil {
		log.Fatalf("\n \nError while running the server -> %v", err)
	}
}
