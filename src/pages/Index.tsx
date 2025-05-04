
import React, { useState, useEffect } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Banner from "@/components/home/Banner";
import CategoryCircles from "@/components/home/CategoryCircles";
import ProductList from "@/components/products/ProductList";
import ProductDetailsModal from "@/components/products/ProductDetailsModal";
import CartModal from "@/components/cart/CartModal";
import { useToast } from "@/components/ui/use-toast";
import {
  banners,
  categories,
  getProductsByCategory,
  getProductsByGender,
  searchProducts,
} from "@/lib/products";
import { Product, CartItem, Category, Color, Size } from "@/lib/types";
import { Helmet } from "react-helmet";

const Index = () => {
  // State for products and filtering
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [selectedGender, setSelectedGender] = useState<"all" | "male" | "female">("all");
  const [searchQuery, setSearchQuery] = useState("");

  // State for modals
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isProductDetailsOpen, setIsProductDetailsOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  // State for cart
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const { toast } = useToast();

  // Initialize products
  useEffect(() => {
    const initialProducts = getProductsByGender(selectedGender);
    setProducts(initialProducts);
    setFilteredProducts(initialProducts);
  }, []);

  // Filter products when gender changes
  useEffect(() => {
    const productsByGender = getProductsByGender(selectedGender);
    setProducts(productsByGender);
    
    // Apply category filter if one is selected
    if (selectedCategory) {
      const filtered = productsByGender.filter(
        (product) => product.category === selectedCategory
      );
      setFilteredProducts(filtered);
    } else if (searchQuery) {
      // Apply search filter if there's a query
      const searched = searchProducts(searchQuery);
      const filteredByGender = selectedGender === "all" 
        ? searched 
        : searched.filter(product => product.gender === selectedGender);
      setFilteredProducts(filteredByGender);
    } else {
      setFilteredProducts(productsByGender);
    }
  }, [selectedGender]);

  // Filter products when category changes
  const handleCategorySelect = (category: Category) => {
    setSelectedCategory(category);
    const filteredByCategory = products.filter(
      (product) => product.category === category
    );
    setFilteredProducts(filteredByCategory);
    toast({
      title: `Categoria: ${category}`,
      description: `Mostrando produtos da categoria ${category}`,
    });
  };

  // Handle search
  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (query.trim() === "") {
      // If search is cleared, reset to current gender/category filters
      if (selectedCategory) {
        handleCategorySelect(selectedCategory);
      } else {
        setFilteredProducts(products);
      }
    } else {
      // Search within current products
      const searched = searchProducts(query);
      let filtered = searched;
      
      // Apply gender filter
      if (selectedGender !== "all") {
        filtered = filtered.filter(product => product.gender === selectedGender);
      }
      
      // Apply category filter
      if (selectedCategory) {
        filtered = filtered.filter(product => product.category === selectedCategory);
      }
      
      setFilteredProducts(filtered);
    }
  };

  // Handle adding item to cart
  const addToCart = (product: Product) => {
    setSelectedProduct(product);
    setIsProductDetailsOpen(true);
  };

  // Handle adding item to cart with color and size selection
  const addToCartWithOptions = (
    product: Product,
    selectedColor: Color,
    selectedSize: Size
  ) => {
    const newItem: CartItem = {
      product,
      quantity: 1,
      selectedColor,
      selectedSize,
    };

    setCartItems([...cartItems, newItem]);
    toast({
      title: "Produto adicionado",
      description: `${product.name} foi adicionado ao seu carrinho!`,
    });
  };

  // Handle updating cart item quantity
  const updateCartItemQuantity = (itemIndex: number, quantity: number) => {
    const updatedItems = [...cartItems];
    updatedItems[itemIndex].quantity = quantity;
    setCartItems(updatedItems);
  };

  // Handle removing item from cart
  const removeCartItem = (itemIndex: number) => {
    const updatedItems = cartItems.filter((_, index) => index !== itemIndex);
    setCartItems(updatedItems);
    toast({
      title: "Produto removido",
      description: "O item foi removido do seu carrinho",
    });
  };

  // View product details
  const viewProductDetails = (product: Product) => {
    setSelectedProduct(product);
    setIsProductDetailsOpen(true);
  };

  return (
    <>
      <Helmet>
        <title>Criativo Modas | Moda para todos os estilos</title>
        <meta
          name="description"
          content="Criativo Modas - A melhor loja de roupas com preços incríveis. Encontre blusas, vestidos, calças e mais com entrega rápida."
        />
        <meta
          name="keywords"
          content="moda, roupas, blusas, vestidos, calças, shorts, moda feminina, moda masculina"
        />
      </Helmet>

      <div className="flex flex-col min-h-screen">
        {/* Header */}
        <Header
          cartItemsCount={cartItems.reduce((total, item) => total + item.quantity, 0)}
          onOpenCart={() => setIsCartOpen(true)}
          onGenderChange={setSelectedGender}
          onSearch={handleSearch}
          selectedGender={selectedGender}
        />

        <main className="flex-grow">
          {/* Banner */}
          <Banner banners={banners} />

          <div className="container mx-auto px-4">
            {/* Categories */}
            <CategoryCircles
              categories={categories}
              onSelectCategory={handleCategorySelect}
            />

            {/* Products */}
            <ProductList
              products={filteredProducts}
              onAddToCart={addToCart}
              onViewDetails={viewProductDetails}
              title={
                searchQuery
                  ? `Resultados para "${searchQuery}"`
                  : selectedCategory
                  ? `${categories.find(cat => cat.category === selectedCategory)?.name}`
                  : "Todos os Produtos"
              }
            />
          </div>
        </main>

        {/* Footer */}
        <Footer />

        {/* Product Details Modal */}
        <ProductDetailsModal
          product={selectedProduct}
          isOpen={isProductDetailsOpen}
          onClose={() => setIsProductDetailsOpen(false)}
          onAddToCart={addToCartWithOptions}
        />

        {/* Cart Modal */}
        <CartModal
          isOpen={isCartOpen}
          onClose={() => setIsCartOpen(false)}
          cartItems={cartItems}
          onUpdateQuantity={updateCartItemQuantity}
          onRemoveItem={removeCartItem}
        />
      </div>
    </>
  );
};

export default Index;
