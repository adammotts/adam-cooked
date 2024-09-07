import Image from "next/image";
import placeholderImg from "../../../public/placeholder.png";
import { Modal } from "@mui/material";
import { useState } from "react";

const MenuItem = ({ item }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="w-[15vw] h-[25vh] bg-primary rounded-[1vw]">
      <div className="relative w-[15vw] h-[20vh] rounded-tl-[1vw] rounded-tr-[1vw] bg-primary hover:cursor-pointer">
        <Image
          src={placeholderImg}
          alt="placeholder"
          layout="fill"
          objectFit="cover"
          className="rounded-tl-[1vw] rounded-tr-[1vw]"
        />
      </div>
      <div className="flex py-[1vh] px-[0.75vw]">
        <h1 className="flex-1 text-[1vw]">Grilled Cheese</h1>
        <h1 className="flex-2 text-[1vw]">10m</h1>
      </div>
    </div>
  );
};

export default MenuItem;
