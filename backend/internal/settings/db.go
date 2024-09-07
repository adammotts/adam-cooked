package settings

import "fmt"

type Postgres struct {
	Host     string
	Name     string
	Port     int
	User     string
	Password string
}

func (p Postgres) Connection() string {
	return fmt.Sprintf(
		"host=%s dbname=%s port=%d user=%s password=%s sslmode=require",
		p.Host, p.Name, p.Port, p.User, p.Password,
	)
}
