
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Product, Color, Size } from "@/lib/types";
import { ShoppingCart, X } from "lucide-react";

interface ProductDetailsModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
  onAddToCart: (product: Product, color: Color, size: Size) => void;
}

const ProductDetailsModal: React.FC<ProductDetailsModalProps> = ({
  product,
  isOpen,
  onClose,
  onAddToCart,
}) => {
  const [selectedVariantIndex, setSelectedVariantIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState<Size | null>(null);

  if (!product) return null;

  const selectedVariant = product.variants[selectedVariantIndex];
  const formattedPrice = product.price.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  });

  const handleAddToCart = () => {
    if (selectedSize) {
      onAddToCart(product, selectedVariant.color, selectedSize);
      onClose();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">{product.name}</DialogTitle>
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-4 top-4"
            onClick={onClose}
          >
            <X size={18} />
          </Button>
        </DialogHeader>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="aspect-square overflow-hidden rounded-md">
            <img
              src={selectedVariant.imageUrl}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </div>

          <div className="space-y-4">
            <DialogDescription className="text-base text-gray-700">
              {product.description}
            </DialogDescription>

            <div>
              <div className="text-2xl font-bold text-criativo-primary">
                {formattedPrice}
              </div>
              <div className="text-sm text-gray-500">Em até 3x sem juros</div>
            </div>

            <div className="space-y-2">
              <h3 className="font-medium">Cores disponíveis</h3>
              <div className="flex gap-2">
                {product.variants.map((variant, index) => (
                  <button
                    key={variant.color.name}
                    onClick={() => {
                      setSelectedVariantIndex(index);
                      setSelectedSize(null);
                    }}
                    className={`w-8 h-8 rounded-full border-2 ${
                      selectedVariantIndex === index
                        ? "border-criativo-primary"
                        : "border-transparent"
                    }`}
                    style={{ backgroundColor: variant.color.hex }}
                    title={variant.color.name}
                  />
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <h3 className="font-medium">Tamanhos disponíveis</h3>
              <div className="flex flex-wrap gap-2">
                {selectedVariant.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`px-3 py-1 border ${
                      selectedSize === size
                        ? "bg-criativo-primary text-white border-criativo-primary"
                        : "bg-white text-criativo-primary border-criativo-gray"
                    } rounded hover:bg-criativo-accent transition-colors`}
                  >
                    {size}
                  </button>
                ))}
              </div>
              {!selectedSize && (
                <p className="text-sm text-red-500">Selecione um tamanho</p>
              )}
            </div>

            <Button
              className="w-full bg-criativo-primary hover:bg-criativo-dark-gray"
              disabled={!selectedSize}
              onClick={handleAddToCart}
            >
              <ShoppingCart size={16} className="mr-2" />
              Adicionar ao Carrinho
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ProductDetailsModal;
