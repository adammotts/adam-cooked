package postgres

import (
	"github.com/GenerateNU/cooked/backend/internal/settings"
	"github.com/jmoiron/sqlx"
	_ "github.com/lib/pq"
)

type DB struct {
	db *sqlx.DB
}

// TODO: implement connecting
func New(settings settings.Postgres) *DB {
	return &DB{db: sqlx.MustConnect("postgres", settings.Connection())}
}

func (db *DB) Ping() error {
	return db.db.Ping()
}

// TODO: implement the necessary queries to satisfy the storage.Storage interface
