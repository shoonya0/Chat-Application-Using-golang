package object

import "go.mongodb.org/mongo-driver/mongo"

type config struct {
	AppEnv                 string `mapstructure:"APP_ENV"`
	ServerAddress          string `mapstructure:"SERVER_ADDRESS"`
	BackendPort            string `mapstructure:"BACKEND_PORT"`
	DBHost                 string `mapstructure:"DB_HOST"`
	DBPort                 string `mapstructure:"DB_PORT"`
	DBURI                  string `mapstructure:"DB_URI"`
	DBName                 string `mapstructure:"DB_NAME"`
	DBUser                 string `mapstructure:"DB_USER"`
	DBPass                 string `mapstructure:"DB_PASS"`
	ContextTimeout         int    `mapstructure:"CONTEXT_TIMEOUT"`
	AccessTokenExpiryHour  int    `mapstructure:"ACCESS_TOKEN_EXPIRY_HOUR"`
	RefreshTokenExpiryHour int    `mapstructure:"REFRESH_TOKEN_EXPIRY_HOUR"`
	AccessTokenSecret      string `mapstructure:"ACCESS_TOKEN_SECRET"`
	RefreshTokenSecret     string `mapstructure:"REFRESH_TOKEN_SECRET"`
	CacheHost              string `mapstructure:"CACHE_HOST"`
	CachePort              string `mapstructure:"CACHE_PORT"`
	CacheTTL               int    `mapstructure:"CACHE_TTL"`
	StorageBucketName      string `mapstructure:"STORAGE_BUCKET_NAME"`
	StorageAccessKey       string `mapstructure:"STORAGE_ACCESS_KEY"`
	StorageSecretKey       string `mapstructure:"STORAGE_SECRET_KEY"`
}

var MongoClient *mongo.Client = nil

var GlobalConfig config
