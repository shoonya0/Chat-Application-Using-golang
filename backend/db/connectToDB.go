package db

import (
	"fmt"
	"os"
	"strings"

	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

var mongoClient *mongo.Client

func initDB(ctx *gin.Context) (*mongo.Client, error) {
	// Load the environment variables from the .env file
	if err := godotenv.Load("config.env"); err != nil {
		return nil, fmt.Errorf("error loading .env file: %v", err)
	}
	DB := os.Getenv("DBURI")

	DB = strings.Replace(DB, "<password>", os.Getenv("DBPASSWORD"), 1)

	// Use the SetServerAPIOptions() method to set the version of the Stable API on the client
	// here we are specifying the server API version in case any new features in future release(to run in the specific version without any worry)
	// this create a new instance of SetServerAPIOptions
	serverAPI := options.ServerAPI(options.ServerAPIVersion1)
	// options.Client(): Creates a new client options object
	opts := options.Client().ApplyURI(DB).SetServerAPIOptions(serverAPI)

	// context.TODO() context.TODO() is a placeholder context. It is used when a context is needed but you have not yet determined what context to use.

	// Create a new client and connect to the server
	client, err := mongo.Connect(ctx, opts)
	if err != nil {
		return nil, fmt.Errorf("error connecting to MongoDB: %v", err)
	}

	// Send a ping to confirm a successful connection
	if err := client.Database("admin").RunCommand(ctx, bson.D{{Key: "ping", Value: 1}}).Err(); err != nil {
		return nil, fmt.Errorf("error pinging MongoDB: %v", err)
	}
	fmt.Println("Pinged your deployment. You successfully connected to MongoDB!")
	return client, nil
}

func GetClient() *mongo.Client {
	return mongoClient
}

func DBConnection() gin.HandlerFunc {
	return func(c *gin.Context) {
		client := GetClient()
		if client == nil {
			var err error
			client, err = initDB(c)
			if err != nil {
				c.JSON(500, gin.H{"error": err.Error()})
				c.Abort()
				return
			}
			// Local function to set the client
			setClient := func(client *mongo.Client) {
				mongoClient = client
			}
			setClient(client)
		}
		c.Set("mongoClient", client)
		c.Next()
	}
}
