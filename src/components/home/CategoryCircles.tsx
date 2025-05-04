
import React from "react";
import { CategoryItem } from "@/lib/types";

interface CategoryCirclesProps {
  categories: CategoryItem[];
  onSelectCategory: (category: string) => void;
}

const CategoryCircles: React.FC<CategoryCirclesProps> = ({
  categories,
  onSelectCategory,
}) => {
  return (
    <div className="py-6 md:py-10">
      <h2 className="text-xl md:text-2xl font-bold mb-4 md:mb-6 text-center">Categorias</h2>
      <div className="flex justify-center">
        <div className="grid grid-cols-4 gap-2 md:gap-4 lg:gap-6">
          {categories.map((category) => (
            <div
              key={category.id}
              className="flex flex-col items-center category-circle cursor-pointer"
              onClick={() => onSelectCategory(category.category)}
            >
              <div className="w-14 h-14 sm:w-18 sm:h-18 md:w-24 md:h-24 lg:w-28 lg:h-28 rounded-full overflow-hidden mb-2 border-2 border-criativo-primary shadow-md">
                <img
                  src={category.imageUrl}
                  alt={category.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <span className="font-medium text-xs sm:text-sm md:text-base text-center line-clamp-1">{category.name}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategoryCircles;
