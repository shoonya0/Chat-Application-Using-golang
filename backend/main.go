package main

import (
	rateLimiter "chat-server/utils"
	"log"
	"os"

	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"
	"golang.org/x/time/rate"
)

var (
	rateLimit = rate.Limit(10) // Allow 10 requests per second
	burst     = 10             // Allow 10 burst for immediate requests
)

func main() {
	r := gin.Default()

	godotenv.Load("config.env")
	// os.Setenv("PORT", "8011")
	port := os.Getenv("PORT")
	if port == "" {
		port = "8085"
	}

	// here we use rate limiter middleware to limit the number of requests that can be made to the server
	// r.Use(ratelimiter.RateLimiterMiddleware(rateLimit, burst))
	r.Use(rateLimiter.RateLimiterMiddleware(rateLimit, burst))

	if err := r.Run(": " + port); err != nil {
		log.Fatalf("\n \nError while running the server -> %v", err)
	}
}
