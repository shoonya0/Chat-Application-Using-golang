package log

import (
	"net/http"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/rs/zerolog/log"
)

// ResponseRecorder for Gin
type ResponseRecorder struct {
	gin.ResponseWriter
	Body       []byte
	StatusCode int
}

// Write method to capture response body
func (rec *ResponseRecorder) Write(body []byte) (int, error) {
	rec.Body = body
	return rec.ResponseWriter.Write(body)
}

// WriteHeader method to capture status code
func (rec *ResponseRecorder) WriteHeader(statusCode int) {
	rec.StatusCode = statusCode
	rec.ResponseWriter.WriteHeader(statusCode)
}

// HttpLogger middleware for Gin
func HttpLogger() gin.HandlerFunc {
	return func(c *gin.Context) {
		startTime := time.Now()
		rec := &ResponseRecorder{
			ResponseWriter: c.Writer,
			StatusCode:     http.StatusOK,
		}
		c.Writer = rec

		c.Next()

		duration := time.Since(startTime)

		logger := log.Info()
		if rec.StatusCode != http.StatusOK {
			logger = log.Error().Bytes("body", rec.Body)
		}

		logger.Str("protocol", "http").
			Str("method", c.Request.Method).
			Str("path", c.Request.RequestURI).
			Int("status_code", rec.StatusCode).
			Str("status_text", http.StatusText(rec.StatusCode)).
			Dur("duration", duration).
			Msg("received an HTTP request")
	}
}
