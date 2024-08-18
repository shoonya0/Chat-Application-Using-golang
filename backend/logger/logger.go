package logger

import (
	"time"

	"github.com/gin-gonic/gin"
	"github.com/rs/zerolog"
	"github.com/rs/zerolog/log"
)

// DefaultStructuredLogger logs a gin HTTP request in JSON format. Uses the
// default logger from rs/zerolog.
func DefaultStructuredLogger() gin.HandlerFunc {
	return StructuredLogger(&log.Logger)
}

// StructuredLogger logs a gin HTTP request in JSON format. Allows to set the
// logger for testing purposes.
func StructuredLogger(logger *zerolog.Logger) gin.HandlerFunc {
	return func(c *gin.Context) {
		start := time.Now()
		path := c.Request.URL.Path
		raw := c.Request.URL.RawQuery

		// process next request
		c.Next()

		// params filling
		params := gin.LogFormatterParams{}

		params.TimeStamp = time.Now() // stop time
		params.Latency = params.TimeStamp.Sub(start)
		if params.Latency > time.Minute {
			params.Latency = params.Latency.Truncate(time.Second)
		}

		params.ClientIP = c.ClientIP()
		params.Method = c.Request.Method
		params.StatusCode = c.Writer.Status()
		params.ErrorMessage = c.Errors.ByType(gin.ErrorTypePrivate).String()
		params.BodySize = c.Writer.Size()

		if raw != "" {
			path = path + "?" + raw
		}

		params.Path = path

		// log using the params
		var logEvent *zerolog.Event
		if c.Writer.Status() >= 500 {
			logEvent = logger.Error()
		} else {
			logEvent = logger.Info()
		}

		logEvent.Str("client_ip", params.ClientIP).
			Str("time", params.TimeStamp.Format(time.RFC3339)).
			Str("method", params.Method).
			Int("status_code", params.StatusCode).
			Int("body_size", params.BodySize).
			Str("path", params.Path).
			Str("latency", params.Latency.String()).
			Msg(params.ErrorMessage)
	}
}

// // ResponseRecorder for Gin
// type ResponseRecorder struct {
// 	gin.ResponseWriter
// 	Body       []byte
// 	StatusCode int
// }

// // Write method to capture response body
// func (rec *ResponseRecorder) Write(body []byte) (int, error) {
// 	rec.Body = body
// 	return rec.ResponseWriter.Write(body)
// }

// // WriteHeader method to capture status code
// func (rec *ResponseRecorder) WriteHeader(statusCode int) {
// 	rec.StatusCode = statusCode
// 	rec.ResponseWriter.WriteHeader(statusCode)
// }

// // HttpLogger middleware for Gin
// func HttpLogger() gin.HandlerFunc {
// 	return func(c *gin.Context) {
// 		startTime := time.Now()
// 		rec := &ResponseRecorder{
// 			ResponseWriter: c.Writer,
// 			StatusCode:     http.StatusOK,
// 		}
// 		c.Writer = rec

// 		c.Next()

// 		duration := time.Since(startTime)

// 		logger := log.Info()
// 		if rec.StatusCode != http.StatusOK {
// 			logger = log.Error().Bytes("body", rec.Body)
// 		}

// 		logger.Str("protocol", "http").
// 			Str("method", c.Request.Method).
// 			Str("path", c.Request.RequestURI).
// 			Int("status_code", rec.StatusCode).
// 			Str("status_text", http.StatusText(rec.StatusCode)).
// 			Dur("duration", duration).
// 			Msg("received an HTTP request")
// 	}
// }
