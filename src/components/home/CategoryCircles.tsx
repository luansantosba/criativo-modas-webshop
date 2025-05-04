
import React from "react";
import { CategoryCircle as CategoryCircleType } from "@/lib/types";

interface CategoryCirclesProps {
  categories: CategoryCircleType[];
  onSelectCategory: (category: string) => void;
}

const CategoryCircles: React.FC<CategoryCirclesProps> = ({ categories, onSelectCategory }) => {
  return (
    <div className="py-10">
      <h2 className="text-2xl font-bold mb-6 text-center">Categorias</h2>
      <div className="flex flex-wrap justify-center gap-6 md:gap-10">
        {categories.map((category) => (
          <div
            key={category.id}
            className="flex flex-col items-center category-circle cursor-pointer"
            onClick={() => onSelectCategory(category.category)}
          >
            <div className="w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden mb-2 border-2 border-criativo-primary shadow-md">
              <img
                src={category.imageUrl}
                alt={category.name}
                className="w-full h-full object-cover"
              />
            </div>
            <span className="font-medium text-sm md:text-base">{category.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryCircles;
