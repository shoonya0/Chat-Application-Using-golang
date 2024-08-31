package controllers

import (
	"chat-server/models"
	"chat-server/object"
	"chat-server/utils"
	"context"
	"net/http"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/go-playground/validator/v10"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"golang.org/x/crypto/bcrypt"
)

var validate = validator.New()

// HashPassword is used to encrypt the password before it is stored in the DB
func HashPassword(password string) (string, error) {
	bytes, err := bcrypt.GenerateFromPassword([]byte(password), 14)
	if err != nil {
		return "", err
	}
	return string(bytes), nil
}

// VerifyPassword checks the input password while verifying it with the passward in the DB.
func VerifyPassword(userPassword, providedPassword string) error {
	return bcrypt.CompareHashAndPassword([]byte(userPassword), []byte(providedPassword))
}

// CreateUser is the api used to tget a single user
func SignUp() gin.HandlerFunc {
	return func(c *gin.Context) {
		var ctx, cancel = context.WithTimeout(context.Background(), 100*time.Second)
		var user models.UserSchema

		defer cancel()

		if err := c.BindJSON(&user); err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
			return
		}

		validationErr := validate.Struct(user)
		if validationErr != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": validationErr.Error()})
			return
		}

		count, err := object.MongoClient.Database(object.GlobalConfig.DBName).
			Collection("users").CountDocuments(ctx, bson.M{"email": *user.Email})
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
			return
		}

		password, err := HashPassword(*user.Password)
		if err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
			return
		}
		user.Password = &password

		if count > 0 {
			c.JSON(http.StatusBadRequest, gin.H{"error": "User already exists"})
			return
		}

		user.CreatedAt, _ = time.Parse(time.RFC3339, time.Now().Format(time.RFC3339))
		user.UpdatedAt, _ = time.Parse(time.RFC3339, time.Now().Format(time.RFC3339))
		user.ID = primitive.NewObjectID()
		user.UserID = user.ID.Hex()
		token, refreshToken, _ := utils.GenerateAllTokens(*user.Email, *user.FirstName, *user.LastName, user.UserID)
		user.Token = &token
		user.Refresh_token = &refreshToken

		resultInsertionNumber, insertErr := object.MongoClient.Database(object.GlobalConfig.DBName).
			Collection("users").InsertOne(ctx, user)
		if insertErr != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": insertErr.Error()})
			return
		}

		c.JSON(http.StatusOK, resultInsertionNumber)
	}
}

// Login is the api used to tget a single user
func Login() gin.HandlerFunc {
	return func(c *gin.Context) {
		var ctx, cancel = context.WithTimeout(context.Background(), 100*time.Second)
		var user models.UserSchema
		var foundUser models.UserSchema

		defer cancel()

		if err := c.ShouldBind(&user); err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
			return
		}

		err := object.MongoClient.Database(object.GlobalConfig.DBName).
			Collection("users").FindOne(ctx, bson.M{"email": *user.Email}).Decode(&foundUser)
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Invalid email"})
			return
		}

		passwordIsValid := VerifyPassword(*user.Password, *foundUser.Password)
		if passwordIsValid != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Invalid password"})
			return
		}

		token, refreshToken, _ := utils.GenerateAllTokens(*foundUser.Email, *foundUser.FirstName, *foundUser.LastName, foundUser.UserID)

		utils.UpdateAllTokens(token, refreshToken, foundUser.UserID)

		c.JSON(http.StatusOK, gin.H{"token": token, "refresh_token": refreshToken})
		// c.JSON(http.StatusOK, foundUser)
	}
}
