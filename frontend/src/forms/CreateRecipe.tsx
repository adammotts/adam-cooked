"use client";

import { createRecipe } from "@/api/recipe";
import Button from "@/components/Button/Button";
import { Meal, Recipe } from "@/types/recipe";
import {
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
} from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

type CreateRecipeProps = {
  onSuccess: () => void;
};

export default function CreateRecipe({ onSuccess }: CreateRecipeProps) {
  // Form handling:
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<Recipe>();

  // Preparing the API call:
  const { mutate, isSuccess, error } = useMutation({
    mutationFn: createRecipe,
  });

  // Handling the API response:
  useEffect(() => {
    if (isSuccess) {
      onSuccess();
    }
  }, [isSuccess, onSuccess]);

  // Parse the duration (would likely want this function in a utilities folder in a real app)
  const parseDuration = (duration: string) => {
    if (isNaN(Number(duration)) || Number(duration) < 0) {
      setError("cook_duration", {
        message: "Duration must be a number greater than 0",
      });
      return null;
    }

    // parse minutes to *h*m*s
    const minutes = Number(duration);
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    const seconds = remainingMinutes * 60;
    return `${hours}h${remainingMinutes}m${seconds}s`;
  };

  // Form submission:
  const onSubmit = (data: Recipe) => {
    const parsedCookDuration = parseDuration(data.cook_duration);
    if (!parsedCookDuration) return;

    const parsedData: Recipe = {
      ...data,
      cook_duration: parsedCookDuration,
    };

    mutate(parsedData);
  };

  return (
    <div className="w-full">
      <form
        className="flex flex-col w-full"
        style={{
          height: "100%",
          gap: "20px",
        }}
        onSubmit={handleSubmit(onSubmit)}
      >
        <h1>Create New Recipe</h1>
        <FormControl fullWidth>
          <InputLabel htmlFor="my-input">Name</InputLabel>
          <OutlinedInput
            id="component-outlined"
            defaultValue=""
            label="Name"
            {...register("name", { required: true })}
            error={Boolean(errors.name)}
          />
          <FormHelperText id="my-helper-text"></FormHelperText>
        </FormControl>
        <FormControl fullWidth>
          <InputLabel htmlFor="my-input">Time to Cook</InputLabel>
          <OutlinedInput
            id="component-outlined"
            defaultValue=""
            label="Time to Cook"
            {...register("cook_duration", { required: true })}
            error={Boolean(errors.cook_duration)}
          />
          <FormHelperText id="my-helper-text">in minutes</FormHelperText>
        </FormControl>
        <FormControl fullWidth>
          <InputLabel htmlFor="my-input">Instructions</InputLabel>
          <OutlinedInput
            id="component-outlined"
            defaultValue=""
            label="Instructions"
            multiline
            minRows={5}
            {...register("instructions", { required: true })}
            error={Boolean(errors.instructions)}
          />
          <FormHelperText id="my-helper-text"></FormHelperText>
        </FormControl>
        <FormControl fullWidth>
          <InputLabel htmlFor="my-input">Image URL</InputLabel>
          <OutlinedInput
            id="component-outlined"
            defaultValue=""
            label="Image URL"
            {...register("image_url", { required: true })}
            error={Boolean(errors.image_url)}
          />
          <FormHelperText id="my-helper-text"></FormHelperText>
        </FormControl>

        <FormControl fullWidth>
          <InputLabel id="meal-label">Meal</InputLabel>
          <Select
            labelId="meal-label"
            id="meal-select"
            label="Meal"
            error={Boolean(errors.meal)}
            defaultValue={Meal.Dinner}
            {...register("meal", { required: true })}
          >
            <MenuItem id="breakfast" value={Meal.Breakfast}>
              Breakfast
            </MenuItem>
            <MenuItem id="lunch" value={Meal.Lunch}>
              Lunch
            </MenuItem>
            <MenuItem id="dinner" value={Meal.Dinner}>
              Dinner
            </MenuItem>
            <MenuItem id="snack" value={Meal.Snack}>
              Snack
            </MenuItem>
          </Select>
        </FormControl>

        <h1 className="text-red-100">{error ? error.message : " "}</h1>
        <Button type="submit" color="secondary">
          Create
        </Button>
      </form>
    </div>
  );
}
