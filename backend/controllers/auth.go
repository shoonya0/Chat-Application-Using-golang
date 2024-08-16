package controllers

import (
	"chat-server/models"
	"chat-server/utils"

	"net/http"

	"github.com/gin-gonic/gin"
)

var users = map[string]string{
	"user1": "password1",
	"user2": "password2",
}

func Login(c *gin.Context) {
	var user models.UserSchema
	if err := c.ShouldBindJSON(&user); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if password, ok := users[user.FirstName]; !ok || password != user.Password {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Invalid credentials"})
		return
	}

	token, err := utils.GenerateJWT(user.FirstName)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Could not generate token"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"token": token})
}
