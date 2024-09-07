package settings

type Application struct {
	Port int `env:"PORT" envDefault:"8080"`
}
