package db

import (
	"chat-server/object"
	"context"
	"fmt"
	"os"
	"strings"
	"time"

	"github.com/kamva/mgm/v3"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

func InitDB() error {
	DB := object.GlobalConfig.DBURI

	DB = strings.Replace(DB, "<username>", object.GlobalConfig.DBUser, 1)

	DB = strings.Replace(DB, "<password>", object.GlobalConfig.DBPass, 1)

	// Use the SetServerAPIOptions() method to set the version of the Stable API on the client
	// here we are specifying the server API version in case any new features in future release(to run in the specific version without any worry)
	// this create a new instance of SetServerAPIOptions
	serverAPI := options.ServerAPI(options.ServerAPIVersion1)

	// options.Client(): Creates a new client options object
	opts := options.Client().ApplyURI(DB).SetServerAPIOptions(serverAPI).SetConnectTimeout(10 * time.Second).SetMaxPoolSize(100)

	// context.TODO() context.TODO() is a placeholder context. It is used when a context is needed but you have not yet determined what context to use.

	// Create a new client and connect to the server
	client, err := mongo.Connect(context.TODO(), opts)
	if err != nil {
		// logger needed
		return fmt.Errorf("error connecting to MongoDB: %v", err)
	}

	// Send a ping to confirm a successful connection
	if err := client.Database("admin").RunCommand(context.TODO(), bson.D{{Key: "ping", Value: 1}}).Err(); err != nil {
		// logger needed
		return fmt.Errorf("error pinging MongoDB: %v", err)
	}

	// logger needed
	fmt.Println("pinged your deployment. You successfully connected to MongoDB!")

	// initialize mgm default config :: mgm is a wrapper of the mongose driver which
	// provides predefines all Mongo operators and keys
	err = mgm.SetDefaultConfig(nil, os.Getenv("DB_NAME"), opts)
	if err != nil {
		// logger needed
		return fmt.Errorf("error setting mgm default config: %v", err)
	}

	object.MongoClient = client
	return nil
}
