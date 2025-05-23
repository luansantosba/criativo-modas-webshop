
import React from "react";
import ProductCard from "./ProductCard";
import { Product } from "@/lib/types";

interface ProductListProps {
  products: Product[];
  onAddToCart: (product: Product) => void;
  onViewDetails: (product: Product) => void;
  title?: string;
}

const ProductList: React.FC<ProductListProps> = ({
  products,
  onAddToCart,
  onViewDetails,
  title = "Produtos",
}) => {
  return (
    <div className="py-4 md:py-8 w-full px-2 md:px-0" id="products">
      <h2 className="text-xl md:text-2xl font-bold mb-4 md:mb-6 text-center">{title}</h2>
      {products.length === 0 ? (
        <p className="text-center text-gray-500">Nenhum produto encontrado</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 md:gap-4 lg:gap-6">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={onAddToCart}
              onViewDetails={onViewDetails}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductList;
