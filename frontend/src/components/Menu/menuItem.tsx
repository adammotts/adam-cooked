import Image from "next/image";
import placeholderImg from "../../../public/placeholder.png";

const RecipeItem = ({ item }) => {
  return (
    <div className="w-[15vw] h-[25vh] bg-primary rounded-[1vw]">
      <div className="relative w-[15vw] h-[20vh] bg-primary hover:cursor-pointer rounded-tl-[1vw] rounded-tr-[1vw]">
        <Image
          src={placeholderImg}
          alt="placeholder"
          layout="fill"
          objectFit="cover"
        />
      </div>
      <div className="flex py-[1vh] px-[0.75vw]">
        <h1 className="flex-1">Grilled Cheese</h1>
        <h1 className="flex-2">10m</h1>
      </div>
    </div>
  );
};

export default RecipeItem;
