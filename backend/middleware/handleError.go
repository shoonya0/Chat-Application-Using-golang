// package middleware

// import "log"

// var (
// 	ErrorChan = make(chan error, 1)
// 	DoneChan  = make(chan bool, 1)
// )

// func HandleErrors() {
// 	for {
// 		select {
// 		// receive the error from the error channel
// 		case err := <-ErrorChan:
// 			if err != nil {
// 				log.Printf("Unhandled rejection: %v", err)
// 			}
// 		// check if the DoneChan is closed
// 		case <-DoneChan:
// 			return
// 		}
// 	}
// }

// func SafeGo(fn func() error) {
// 	// here i have make an Goroutines (lightweight thread managed by the Go runtime) to handle the error
// 	go func() {
// 		if err := fn(); err != nil {
// 			// Send the error to the error channel
// 			ErrorChan <- err
// 		}
// 	}()
// }

package middleware

import (
	"net/http"

	"chat-server/error"

	"github.com/gin-gonic/gin"
)

func ErrorHandler() gin.HandlerFunc {
	return func(c *gin.Context) {
		c.Next()
		for _, err := range c.Errors {
			switch e := err.Err.(type) {
			case error.Http:
				c.AbortWithStatusJSON(e.StatusCode, e)
			default:
				c.AbortWithStatusJSON(http.StatusInternalServerError, map[string]string{"message": "Service Unavailable"})
			}
		}
	}
}
