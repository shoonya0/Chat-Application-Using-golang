package routes

import (
	"chat-server/controllers"

	"github.com/gin-gonic/gin"
)

// UserRoutes function
func UseRoutes(incomingRoutes *gin.Engine) {
	incomingRoutes.POST("/signup", controllers.SignUp())
	incomingRoutes.POST("/login", controllers.Login())
}
