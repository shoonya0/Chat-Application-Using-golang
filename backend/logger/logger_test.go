package logger

import (
	"bytes"
	"chat-server/middleware"
	"net/http"
	"net/http/httptest"
	"reflect"
	"testing"

	"github.com/gin-gonic/gin"
	"github.com/rs/zerolog"
	"github.com/stretchr/testify/assert"
)

func PerformRequest(r http.Handler, method, path string) *httptest.ResponseRecorder {
	req := httptest.NewRequest(method, path, nil)
	w := httptest.NewRecorder()
	r.ServeHTTP(w, req)
	return w
}

func TestStructuredLogger(t *testing.T) {
	// arrange - create a new logger writing to a buffer
	buffer := new(bytes.Buffer)
	var memLogger = zerolog.New(buffer).With().Timestamp().Logger()

	// arrange - init Gin to use the structured logger middleware
	r := gin.New()
	r.Use(StructuredLogger(&memLogger))
	r.Use(gin.Recovery())

	// arrange - set the routes
	r.GET("/example", func(c *gin.Context) {})
	r.GET("/force500", func(c *gin.Context) { panic("forced panic") })

	// act & assert
	PerformRequest(r, "GET", "/example?a=100")
	assert.Contains(t, buffer.String(), "200")
	assert.Contains(t, buffer.String(), "GET")
	assert.Contains(t, buffer.String(), "/example")
	assert.Contains(t, buffer.String(), "a=100")

	buffer.Reset()
	PerformRequest(r, "GET", "/notfound")
	assert.Contains(t, buffer.String(), "404")
	assert.Contains(t, buffer.String(), "GET")
	assert.Contains(t, buffer.String(), "/notfound")

	buffer.Reset()
	PerformRequest(r, "GET", "/force500")
	assert.Contains(t, buffer.String(), "500")
	assert.Contains(t, buffer.String(), "GET")
	assert.Contains(t, buffer.String(), "/force500")
	assert.Contains(t, buffer.String(), "error")
}

func TestRateLimiterMiddleware(t *testing.T) {
	// arrange - init Gin
	r := gin.New()
	// 1 per request
	r.Use(middleware.RateLimiterMiddleware(1, 1))
	r.GET("/limited", func(c *gin.Context) {
		c.String(200, "limited")
	})

	// act - perform 2 requests
	w1 := PerformRequest(r, "GET", "/limited")
	w2 := PerformRequest(r, "GET", "/limited")

	// assert - check response status
	assert.Equal(t, 200, w1.Code)
	assert.Equal(t, 429, w2.Code) // 429 Too Many Requests
}

// TestSanitizeMap tests the sanitizeMap function
func TestSanitizeMap(t *testing.T) {
	tests := []struct {
		name     string
		input    map[string]interface{}
		expected map[string]interface{}
	}{
		{
			name: "Remove keys with $ prefix",
			input: map[string]interface{}{
				"$key": "value",
				"key":  "value",
			},
			expected: map[string]interface{}{
				"key": "value",
			},
		},
		{
			name: "Remove keys with . in them",
			input: map[string]interface{}{
				"key.with.dot": "value",
				"key":          "value",
			},
			expected: map[string]interface{}{
				"key": "value",
			},
		},
		{
			name: "Recursively sanitize nested maps",
			input: map[string]interface{}{
				"nested": map[string]interface{}{
					"$key": "value",
					"key":  "value",
				},
			},
			expected: map[string]interface{}{
				"nested": map[string]interface{}{
					"key": "value",
				},
			},
		},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			middleware.SanitizeMap(tt.input)
			if !reflect.DeepEqual(tt.input, tt.expected) {
				t.Errorf("sanitizeMap() = %v, want %v", tt.input, tt.expected)
			}
		})
	}
}

// TestSanitizeSlice tests the sanitizeSlice function
func TestSanitizeSlice(t *testing.T) {
	tests := []struct {
		name     string
		input    []interface{}
		expected []interface{}
	}{
		{
			name: "Recursively sanitize slices",
			input: []interface{}{
				map[string]interface{}{
					"$key": "value",
					"key":  "value",
				},
				[]interface{}{
					map[string]interface{}{
						"key.with.dot": "value",
						"key":          "value",
					},
				},
			},
			expected: []interface{}{
				map[string]interface{}{
					"key": "value",
				},
				[]interface{}{
					map[string]interface{}{
						"key": "value",
					},
				},
			},
		},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			middleware.SanitizeSlice(tt.input)
			if !reflect.DeepEqual(tt.input, tt.expected) {
				t.Errorf("sanitizeSlice() = %v, want %v", tt.input, tt.expected)
			}
		})
	}
}
