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
