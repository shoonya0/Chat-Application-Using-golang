package middleware

import (
	"strings"

	"github.com/gin-gonic/gin"
)

// sanitizeMap recursively sanitizes map values
func sanitizeMap(m map[string]interface{}) {
	for key, value := range m {
		if strings.HasPrefix(key, "$") || strings.Contains(key, ".") {
			delete(m, key)
			continue
		}
		switch v := value.(type) {
		case map[string]interface{}:
			sanitizeMap(v)
		case []interface{}:
			sanitizeSlice(v)
		}
	}
}

// sanitizeSlice recursively sanitizes slice values
func sanitizeSlice(s []interface{}) {
	for _, item := range s {
		switch v := item.(type) {
		case map[string]interface{}:
			sanitizeMap(v)
		case []interface{}:
			sanitizeSlice(v)
		}
	}
}

// SanitizeMiddleware is a middleware to sanitize request body
func SanitizeMiddleware() gin.HandlerFunc {
	return func(c *gin.Context) {
		if c.Request.Method == "POST" || c.Request.Method == "PUT" {
			var json map[string]interface{}
			if err := c.ShouldBindJSON(&json); err == nil {
				sanitizeMap(json)
				c.Set("sanitized_json", json)
			}
		}
		c.Next()
	}
}
