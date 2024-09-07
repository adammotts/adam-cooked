"use client";

import { fetchAllRecipes } from "@/api/recipe";
import Navbar from "@/components/Navbar/Navbar";
import CreateRecipe from "@/forms/CreateRecipe";
import { Meal, Recipe } from "@/types/recipe";
import { Modal } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
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
        {/** TODO: THIS IS WHERE THE MAIN APP LIVES */}
      </div>
    </>
  );
}
