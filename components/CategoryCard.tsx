"use client";

import { cn } from "@/lib/utils";
import { Category } from "@/types";

const CategoryCard = ({ name, image_url, description }: Category) => {
  return (
    <div className="group/card w-full max-w-xs">
      <div
        className={cn(
          "card relative mx-auto flex h-[20rem] max-w-sm cursor-pointer flex-col items-center justify-center overflow-hidden rounded-md bg-cover p-4 shadow-xl",
        )}
        style={{ backgroundImage: `url(${image_url})` }}
      >
        <div className="absolute top-0 left-0 h-full w-full bg-black opacity-45 transition duration-300 group-hover/card:opacity-75"></div>

        <div className="z-10 mb-0">
          <p className="relative z-10 text-center text-2xl font-semibold text-gray-50 capitalize">
            {name}
          </p>
        </div>

        <div className="text-content absolute bottom-0 left-0 w-full overflow-hidden p-4">
          <div className="translate-y-8 transform transition-transform duration-500 ease-in-out group-hover/card:translate-y-0">
            <p className="relative z-10 my-4 text-center text-sm font-normal text-gray-50 opacity-0 transition-opacity delay-100 duration-500 group-hover/card:opacity-100">
              {description}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryCard;
