package object

import "os"

var (
	PORT = os.Getenv("PORT")
)
