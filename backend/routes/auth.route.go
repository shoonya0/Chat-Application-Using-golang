package routes

import (
	"fmt"
	"shoonya0/ChatApplication/controllers"

	"github.com/gin-gonic/gin"
)

const (
	apiVersion  = "v1"
	apiBasePath = "RealTimeChatApp/" + apiVersion + "/"
	verify      = apiBasePath + "auth/"
	version     = "1.0.0"
)

func AuthRoutes(r *gin.Engine) {
	// Group all auth related routes
	auth := r.Group(verify)
	{
		fmt.Println("check: ", verify)
		auth.POST("/signup", controllers.Signup)
		auth.POST("/login", controllers.Login)
		auth.GET("/logout", controllers.Logout)
	}
}
