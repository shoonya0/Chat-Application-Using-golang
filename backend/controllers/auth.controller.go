package controllers

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

type User struct {
	Username string `json:"username"`
	Password string `json:"password"`
}

func Signup(c *gin.Context) {
	var user User
	if err := c.ShouldBindJSON(&user); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// Perform authentication (this is just a placeholder logic)
	if user.Username == "admin" && user.Password == "admin" {
		c.JSON(http.StatusOK, gin.H{"message": "signup successful"})
	} else {
		c.JSON(http.StatusUnauthorized, gin.H{"message": "signup failed"})
	}
}

func Login(c *gin.Context) {
	var user User
	if err := c.ShouldBindJSON(&user); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// Perform authentication (this is just a placeholder logic)
	if user.Username == "admin" && user.Password == "admin" {
		c.JSON(http.StatusOK, gin.H{"message": "login successful"})
	} else {
		c.JSON(http.StatusUnauthorized, gin.H{"message": "login failed"})
	}
}

func Logout(c *gin.Context) {
	var user User
	if err := c.ShouldBindJSON(&user); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// Perform authentication (this is just a placeholder logic)
	if user.Username == "admin" && user.Password == "admin" {
		c.JSON(http.StatusOK, gin.H{"message": "logout successful"})
	} else {
		c.JSON(http.StatusUnauthorized, gin.H{"message": "logout failed"})
	}
}
