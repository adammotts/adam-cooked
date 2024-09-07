"use client";

import { fetchAllRecipes } from "@/api/recipe";
import Navbar from "@/components/Navbar/Navbar";
import CreateRecipe from "@/forms/CreateRecipe";
import { Meal, Recipe } from "@/types/recipe";
import { Modal } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import placeholderImg from "../../public/placeholder.png";
import Image from "next/image";
import menuItem from "../components/Menu/menuItem"
import MenuItem from "../components/Menu/menuItem";
export default function Home() {
import { useEffect, useState } from "react";

type FilterOptions = Meal | "All";

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [visibleData, setVisibleData] = useState<Recipe[]>([]);
  const [filter, setFilter] = useState<FilterOptions>("All");

  const { data, isLoading, error } = useQuery({
    queryKey: ["recipes"],
    queryFn: fetchAllRecipes,
  });

  useEffect(() => {
    if (data) {
      setVisibleData(data);
    }
  }, [data]);

  useEffect(() => {
    if (!data) {
      return;
    }

    if (filter === "All") {
      setVisibleData(data);
    } else {
      setVisibleData(data.filter((r) => r.meal === filter));
    }
  }, [filter, data]);
  });

  const recipe = {
    name: "grilled cheese",
    time: "10m",
    Instructions:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed mollis porta tristique. Aliquam a tellus at tellus blandit tristique in at ipsum. Curabitur varius velit at magna lobortis, vel efficitur sem imperdiet. Quisque ut metus id nibh ultrices hendrerit in at massa. Etiam eu sapien id mauris porttitor posuere. Nullam id tincidunt libero. Sed ex lectus, laoreet id mattis eget, bibendum sed leo. Etiam eu condimentum nunc. Donec id arcu non orci rutrum bibendum. Vestibulum a mattis lacus.",
  };

  const placeholder = [1, 2, 3, 4, 5, 6, 7];

  return (
    <>
      <Modal
        className="flex flex-col items-center justify-center"
        open={isModalOpen}
        disableAutoFocus
        onClose={() => setIsModalOpen(false)}
      >
        <div className="bg-primary flex flex-col items-center p-16 w-[550px] h-[600px] overflow-scroll rounded-lg">
          <CreateRecipe onSuccess={() => setIsModalOpen(false)} />
        </div>
      </Modal>
      <Navbar createRecipe={() => setIsModalOpen(true)} />
      <div className="flex flex-col p-16 items-start gap-6">
        <h1 className="text-[2vh]">All Recipes</h1>
        <div className="w-full flex grid grid-cols-4 gap-[4vh]">
          {placeholder.map((_, index) => (
            <div
              key={index}
            >
              <MenuItem item={recipe} />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
