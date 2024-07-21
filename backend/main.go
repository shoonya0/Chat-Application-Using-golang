package main

import (
	"chat-server/logger"
	"chat-server/middleware"
	"fmt"
	"log"
	"os"
	"os/signal"
	"syscall"

	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"
	"golang.org/x/time/rate"
)

var (
	rateLimit = rate.Limit(10) // Allow 10 requests per second
	burst     = 10             // Allow 10 burst for immediate requests
)

func main() {
	// Load the environment variables from the .env file
	godotenv.Load("config.env")
	// os.Setenv("PORT", "8011")
	port := os.Getenv("PORT")
	if port == "" {
		port = "8085"
	}

	// Starting the error handling routine
	// here i have make an Goroutines (lightweight thread managed by the Go runtime) to handle the error
	go middleware.HandleErrors()

	r := gin.Default()

	// here we use rate limiter middleware to limit the number of requests that can be made to the server
	r.Use(middleware.RateLimiterMiddleware(rateLimit, burst))

	// Apply security headers middleware
	r.Use(middleware.SecurityHeadersMiddleware())

	// Apply sanitize middleware in case user add any script in the input
	r.Use(middleware.SanitizeMiddleware())

	// Apply cors middleware
	r.Use(middleware.CrorsMiddleware())

	// Apply recovery middleware
	r.Use(middleware.Recovery())

	// to apply ratelimiter in a request
	r.GET("/limited", middleware.RateLimiterMiddleware(rateLimit, burst), func(c *gin.Context) {

		c.JSON(200, gin.H{
			"message": "This route is rate-limited",
		})
	})

	// starting a goroutine within a handler
	r.GET("/async", func(c *gin.Context) {
		middleware.SafeGo(func() error {
			// Simulate some async work
			fmt.Println("Async operation running")
			// Simulate an error
			return fmt.Errorf("error in async operation")
		})
		c.String(200, "Async operation started")
	})

	// Wait for a signal to exit
	sigChan := make(chan os.Signal, 1)
	signal.Notify(sigChan, syscall.SIGINT, syscall.SIGTERM)
	// here i have make an Goroutines (lightweight thread managed by the Go runtime) to handle the error
	go func() {
		// Wait for the signal
		<-sigChan
		// Signal the error handler to exit
		middleware.DoneChan <- true
		os.Exit(0)
	}()

	// Apply logging middleware and running the server
	if os.Getenv("GIN_MODE") == "development" {
		log.Println("Logger enabled")
		gin.SetMode(gin.DebugMode)
		r.Use(logger.HttpLogger())
	} else {
		log.Println("Logger disabled")
		gin.SetMode(gin.ReleaseMode)
		r.Use(gin.Logger())
	}

	if err := r.Run(": " + port); err != nil {
		log.Fatalf("\n \nError while running the server -> %v", err)
	}
}
