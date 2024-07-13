package rateLimiter

import (
	"net/http"
	"sync"

	"github.com/gin-gonic/gin"
	"golang.org/x/time/rate"
)

var limiters = make(map[string]*rate.Limiter)
var mtx sync.Mutex

func getLimiter(ip string, r rate.Limit, b int) *rate.Limiter {
	mtx.Lock()
	defer mtx.Unlock()

	if limiter, exists := limiters[ip]; exists {
		return limiter
	}

	limiter := rate.NewLimiter(r, b)
	limiters[ip] = limiter
	return limiter
}

func RateLimiterMiddleware(r rate.Limit, b int) gin.HandlerFunc {
	return func(c *gin.Context) {
		ip := c.ClientIP()
		limiter := getLimiter(ip, r, b)

		if !limiter.Allow() {
			c.AbortWithStatusJSON(http.StatusTooManyRequests, gin.H{"error": "Too Many Requests"})
			return
		}

		c.Next()
	}
}
