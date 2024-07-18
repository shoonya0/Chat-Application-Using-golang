package main

import (
	"chat-server/logger"
	"chat-server/middleware"
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
	r.Use(middleware.RateLimiterMiddleware(rateLimit, burst))

	// Apply security headers middleware
	r.Use(middleware.SecurityHeadersMiddleware())

	// Apply logging middleware
	if os.Getenv("GIN_MODE") == "development" {
		log.Println("Logger enabled")
		gin.SetMode(gin.DebugMode)
		r.Use(logger.HttpLogger())
	} else {
		log.Println("Logger disabled")
		gin.SetMode(gin.ReleaseMode)
		r.Use(gin.Logger())
	}

	// Apply sanitize middleware in case user add any script in the input
	r.Use(middleware.SanitizeMiddleware())

	// Apply cors middleware
	r.Use(middleware.CrorsMiddleware())

	// remaining
	// body-parser middleware is used to parse the request body and set the body field in the request object
	// cors middleware is used to enable cross-origin resource sharing
	// cookie-parser middleware is used to parse the cookie header and populate req.cookies with an object keyed by the cookie names.
	// session middleware is used to store the session data in the cookie

	// to apply ratelimiter in a request
	r.GET("/limited", middleware.RateLimiterMiddleware(rateLimit, burst), func(c *gin.Context) {
		c.JSON(200, gin.H{
			"message": "This route is rate-limited",
		})
	})

	if err := r.Run(": " + port); err != nil {
		log.Fatalf("\n \nError while running the server -> %v", err)
	}
}
