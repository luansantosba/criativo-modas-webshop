
import React from "react";
import { Button } from "@/components/ui/button";
import { Product } from "@/lib/types";
import { ShoppingCart } from "lucide-react";

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
  onViewDetails: (product: Product) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onAddToCart,
  onViewDetails,
}) => {
  // Display the first variant's image as the main product image
  const mainImage = product.variants[0].imageUrl;
  const formattedPrice = product.price.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  });

  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-sm border border-gray-200 product-card w-full">
      <div className="h-36 sm:h-48 md:h-56 overflow-hidden">
        <img
          src={mainImage}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
        />
      </div>
      <div className="p-2 md:p-4">
        <h3 className="font-semibold text-sm md:text-lg mb-1 truncate">{product.name}</h3>
        <p className="text-criativo-primary font-bold mb-1 md:mb-2">{formattedPrice}</p>
        <p className="text-xs md:text-sm text-gray-600 mb-2 md:mb-4 line-clamp-2">
          {product.shortDescription}
        </p>
        <div className="flex flex-col space-y-2">
          <Button
            onClick={() => onAddToCart(product)}
            className="w-full bg-criativo-primary hover:bg-criativo-dark-gray"
            size="sm"
          >
            <ShoppingCart size={14} className="mr-1 flex-shrink-0" />
            <span className="text-xs whitespace-nowrap">Adicionar ao Carrinho</span>
          </Button>
          <Button
            variant="outline"
            onClick={() => onViewDetails(product)}
            className="w-full text-xs border-criativo-primary text-criativo-primary hover:bg-criativo-accent"
            size="sm"
          >
            Saiba mais
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
