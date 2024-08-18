package main

import (
	"chat-server/config"
	"chat-server/db"
	"chat-server/logger"
	"chat-server/middleware"
	"chat-server/object"
	"fmt"
	"log"
	"os"

	"github.com/gin-gonic/gin"
	"golang.org/x/time/rate"
)

var (
	rateLimit = rate.Limit(10) // Allow 10 requests per second
	burst     = 10             // Allow 10 burst for immediate requests
)

func init() {
	if config.New() != nil {
		log.Fatalf("Error while loading the config -> %v", config.New())
		os.Exit(1)
	}
}

func main() {
	port := object.GlobalConfig.BackendPort
	if port == "" {
		port = "3031"
	}

	// connect to the database
	if err := db.InitDB(); err != nil {
		// logger needed
		fmt.Println("Error while connecting to the database -> ", err)
	}

	// Starting the error handling routine
	// here i have make an Goroutines (lightweight thread managed by the Go runtime) to handle the error
	// go middleware.HandleErrors()

	r := gin.New()

	// add default recovery middleware
	// r.Use(gin.Recovery())

	// add the new logger middleware
	r.Use(logger.DefaultStructuredLogger())

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
		client := object.MongoClient
		if client == nil {
			c.JSON(500, gin.H{"error": "Database connection not found"})
			return
		}

		c.JSON(200, gin.H{
			"message": "This route is rate-limited",
		})
	})

	// Apply error handling middleware
	r.Use(middleware.ErrorHandler())

	/////////////////////////////////////////////////////////////////////////////////////////////////////

	// starting a goroutine within a handler
	// r.GET("/async", func(c *gin.Context) {
	// 	middleware.SafeGo(func() error {
	// 		// Simulate some async work
	// 		fmt.Println("Async operation running")
	// 		// Simulate an error
	// 		return fmt.Errorf("error in async operation")
	// 	})
	// 	c.String(200, "Async operation started")
	// })

	// // Wait for a signal to exit
	// sigChan := make(chan os.Signal, 1)
	// signal.Notify(sigChan, syscall.SIGINT, syscall.SIGTERM)
	// // here i have make an Goroutines (lightweight thread managed by the Go runtime) to handle the error
	// go func() {
	// 	// Wait for the signal
	// 	<-sigChan
	// 	// Signal the error handler to exit
	// 	middleware.DoneChan <- true
	// 	os.Exit(0)
	// }()

	// Apply logging middleware and running the server
	if object.GlobalConfig.AppEnv == "DEVELOPMENT" || object.GlobalConfig.AppEnv == "PRE_PRODUCTION" {
		// log.Println("Logger enabled")
		// this is also works with goroutine
		// r.Use(logger.HttpLogger())
	} else {
		log.Println("Logger disabled")
		// r.Use(logger.HttpLogger())
	}

	if err := r.Run(": " + port); err != nil {
		log.Fatalf("\n \nError while running the server -> %v", err)
	}
}
