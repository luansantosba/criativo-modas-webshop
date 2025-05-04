
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
    <div className="bg-white rounded-lg overflow-hidden shadow-sm border border-gray-200 product-card">
      <div className="h-48 md:h-56 overflow-hidden">
        <img
          src={mainImage}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
        />
      </div>
      <div className="p-4">
        <h3 className="font-semibold text-lg mb-1 truncate">{product.name}</h3>
        <p className="text-criativo-primary font-bold mb-2">{formattedPrice}</p>
        <p className="text-sm text-gray-600 mb-4 line-clamp-2">
          {product.shortDescription}
        </p>
        <div className="space-y-2">
          <Button
            onClick={() => onAddToCart(product)}
            className="w-full bg-criativo-primary hover:bg-criativo-dark-gray"
          >
            <ShoppingCart size={16} className="mr-2" />
            Adicionar ao Carrinho
          </Button>
          <Button
            variant="outline"
            onClick={() => onViewDetails(product)}
            className="w-full border-criativo-primary text-criativo-primary hover:bg-criativo-accent"
          >
            Saiba mais
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
