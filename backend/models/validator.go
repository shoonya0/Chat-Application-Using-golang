package models

import (
	"encoding/json"
	"fmt"
	"time"

	"github.com/go-playground/validator/v10"
)

// ValidateUser validates the User struct
func ValidateUser(user *UserSchema) error {
	validate := validator.New()
	err := validate.Struct(user)
	if err != nil {
		if _, ok := err.(*validator.InvalidValidationError); ok {
			return err
		}

		for _, err := range err.(validator.ValidationErrors) {
			// Print or log the error details
			fmt.Printf("Field '%s' failed validation with tag '%s'\n", err.Field(), err.Tag())
		}
	}
	return err
}

// MarshalJSON customizes the JSON marshaling for CustomTime
func (ct CustomTime) MarshalJSON() ([]byte, error) {
	return json.Marshal(ct.Format("2006-01-02T15:04:05Z07:00"))
}

// UnmarshalJSON customizes the JSON unmarshaling for CustomTime
func (ct *CustomTime) UnmarshalJSON(data []byte) error {
	var str string
	if err := json.Unmarshal(data, &str); err != nil {
		return err
	}
	parsedTime, err := time.Parse("2006-01-02T15:04:05Z07:00", str)
	if err != nil {
		return err
	}
	*ct = CustomTime{parsedTime}
	return nil
}
