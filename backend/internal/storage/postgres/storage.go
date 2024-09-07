package postgres

import (
	"context"

	"github.com/GenerateNU/cooked/backend/internal/settings"
	"github.com/GenerateNU/cooked/backend/internal/types"
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

func (db *DB) GetRecipes(ctx context.Context) ([]types.Recipe, error) {
	var recipes []types.Recipe
	if err := db.db.SelectContext(ctx, &recipes, "SELECT * FROM recipes"); err != nil {
		return recipes, err
	}

	return recipes, nil
}

func (db *DB) CreateRecipe(ctx context.Context, recipe types.Recipe) (types.Recipe, error) {
	if _, err := db.db.ExecContext(ctx, "INSERT INTO recipes (id, name, cook, instructions, image_url, meal) VALUES ($1, $2, $3, $4, $5, $6)", recipe.ID, recipe.Name, recipe.Cook, recipe.Instructions, recipe.ImageURL, recipe.Meal); err != nil {
		return recipe, err
	}

	return recipe, nil
}
