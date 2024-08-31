package utils

import (
	"chat-server/object"
	"context"
	"log"
	"time"

	"github.com/golang-jwt/jwt/v4"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo/options"
)

// SignedDetails
type SignedDetails struct {
	Email     string
	FirstName string
	LastName  string
	UserID    string
	jwt.RegisteredClaims
}

// GenerateAllTokens generates both the access token and the refresh token
func GenerateAllTokens(email, first_name, last_name, user_id string) (signedToken, signedRefreshToken string, err error) {
	claims := &SignedDetails{
		Email:     email,
		FirstName: first_name,
		LastName:  last_name,
		UserID:    user_id,
		RegisteredClaims: jwt.RegisteredClaims{
			ExpiresAt: jwt.NewNumericDate(time.Now().Add(24 * time.Hour)),
		},
	}

	refreshClaims := &SignedDetails{
		RegisteredClaims: jwt.RegisteredClaims{
			ExpiresAt: jwt.NewNumericDate(time.Now().Add(168 * time.Hour)),
		},
	}

	token, err := jwt.NewWithClaims(jwt.SigningMethodHS256, claims).SignedString([]byte(object.GlobalConfig.AccessTokenSecret))
	if err != nil {
		// logger needed
		return "", "", err
	}
	refreshToken, err := jwt.NewWithClaims(jwt.SigningMethodES256, refreshClaims).SignedString([]byte(object.GlobalConfig.RefreshTokenSecret))
	if err != nil {
		// logger needed
		return "", "", err
	}

	return token, refreshToken, nil
}

// ValidateToken validates the jwt token
func ValidateToken(signedToken string) (claims *SignedDetails, msg string) {
	token, err := jwt.ParseWithClaims(
		signedToken,
		&SignedDetails{},
		func(token *jwt.Token) (interface{}, error) {
			return []byte(object.GlobalConfig.AccessTokenSecret), nil
		},
	)

	if err != nil {
		msg = err.Error()
		return claims, msg
	}

	claims, ok := token.Claims.(*SignedDetails)
	if !ok {
		msg := "the token is invalid"
		return claims, msg
	}

	if claims.ExpiresAt.Unix() < time.Now().Local().Unix() {
		// msg = fmt.Sprintf("the token is expired")
		msg := "the token is expired"
		return claims, msg
	}

	return claims, ""
}

// UpdateAllTokens renews the user tokens when they login
func UpdateAllTokens(signedToken string, signedRefreshedToken string, user_id string) {
	userCollection := object.MongoClient.Database(object.GlobalConfig.DBName).Collection("users")
	if userCollection == nil {
		// logger needed
		log.Panic("error connecting to MongoDB")
		return
	}
	var ctx, cancel = context.WithTimeout(context.Background(), 100*time.Second)

	var updateObj primitive.D

	updateObj = append(updateObj, bson.E{Key: "token", Value: signedToken})
	updateObj = append(updateObj, bson.E{Key: "refresh_token", Value: signedRefreshedToken})

	Updated_at, _ := time.Parse(time.RFC3339, time.Now().Format(time.RFC3339))
	updateObj = append(updateObj, bson.E{Key: "updated_at", Value: Updated_at})

	upsert := true
	filter := bson.M{"user_id": user_id}
	opt := options.UpdateOptions{
		Upsert: &upsert,
	}

	_, err := userCollection.UpdateOne(
		ctx,
		filter,
		bson.D{
			{Key: "$set", Value: updateObj},
		},
		&opt,
	)
	defer cancel()

	if err != nil {
		// logger needed
		log.Panic(err)
		return
	}
}
