package handlers

import (
	"context"

	// "github.com/GenerateNU/cooked/backend/internal/types"
	"github.com/gofiber/fiber/v2"
)

// func (s *Service) CreateRecipe(c *fiber.Ctx) error {
// 	var recipe types.Recipe
// 	if err := c.BodyParser(&recipe); err != nil {
// 		c.Status(fiber.StatusInternalServerError).SendString("error xd")
// 	}

// 	return c.Status(fiber.StatusOK).JSON(recipe)
// }

func (s *Service) GetRecipes(c *fiber.Ctx) error {
	recipes, err := s.Storage.GetRecipes(context.TODO())
	if err != nil {
		c.Status(fiber.StatusInternalServerError).SendString("error lmao")
	}

	return c.Status(fiber.StatusOK).JSON(recipes)
}
