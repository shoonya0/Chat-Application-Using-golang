package models

import "time"

// User represents the user model of mongo schema
type UserSchema struct {
	// ID    primitive.ObjectID `bson:"_id,omitempty"  json:"id"`
	FirstName            string `bson:"firstname,omitempty" json:"firstname" validate:"required"`
	LastName             string `bson:"lastname,omitempty" json:"lastname" validate:"required"`
	Avatar               string `bson:"avatar,omitempty" json:"avatar"`
	Email                string `bson:"email,omitempty" json:"email" validate:"required,email"`
	Password             string `bson:"password,omitempty" json:"password" validate:"required"`
	PasswordChangeAt     string `bson:"password_change_at,omitempty" json:"password_change_at" time_format:"2006-01-02T15:04:05Z07:00"`
	PasswordResetToken   string `bson:"password_reset_token,omitempty" json:"password_reset_token"`
	PasswordResetExpires string `bson:"password_reset_expires,omitempty" json:"password_reset_expires" time_format:"2006-01-02T15:04:05Z07:00"`
	CreatedAt            string `bson:"created_at,omitempty" json:"created_at" time_format:"2006-01-02T15:04:05Z07:00"`
	UpdatedAt            string `bson:"updated_at,omitempty" json:"updated_at" time_format:"2006-01-02T15:04:05Z07:00"`
}

// CustomTime is a custom type for handling time formatting
type CustomTime struct {
	time.Time
}
