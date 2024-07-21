package middleware

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/rs/zerolog/log"
)

// RecoveryMiddleware is a middleware that recovers from any panics and writes a 500 error.
func Recovery() gin.HandlerFunc {
	return func(c *gin.Context) {
		defer func() {
			if r := recover(); r != nil {
				// Log the error
				log.Error().
					Str("method", c.Request.Method).
					Str("path", c.Request.URL.Path).
					Msgf("Uncaught exception: %v", r)

				// Return a 500 internal server error response
				c.JSON(http.StatusInternalServerError, gin.H{
					"message": "Internal Server Error",
				})
				c.Abort()
			}
		}()

		// Continue to the next handler
		c.Next()
	}
}
