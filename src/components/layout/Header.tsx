
import React, { useState, useEffect } from "react";
import { Search, ShoppingCart, Menu, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/components/ui/use-toast";
import { useIsMobile } from "@/hooks/use-mobile";

interface HeaderProps {
  cartItemsCount: number;
  onOpenCart: () => void;
  onGenderChange: (gender: "all" | "male" | "female") => void;
  onSearch: (query: string) => void;
  selectedGender: "all" | "male" | "female";
}

const Header: React.FC<HeaderProps> = ({
  cartItemsCount,
  onOpenCart,
  onGenderChange,
  onSearch,
  selectedGender,
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { toast } = useToast();
  const isMobile = useIsMobile();

  // Handle scroll event to make header sticky
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Handle search form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      onSearch(searchQuery.trim());
      toast({
        title: "Pesquisando",
        description: `Buscando produtos para: "${searchQuery}"`,
      });
      if (isMobile) {
        setMobileMenuOpen(false);
      }
    }
  };

  return (
    <header
      className={`w-full ${
        isScrolled
          ? "fixed top-0 left-0 shadow-md bg-white z-50 transition-all duration-300"
          : "bg-white"
      }`}
    >
      <div className="container mx-auto px-2 sm:px-4 py-2 sm:py-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <div className="text-xl sm:text-2xl md:text-3xl font-bold">
            <a href="/" className="text-criativo-primary">
              Criativo Modas
            </a>
          </div>

          {/* Mobile menu toggle */}
          {isMobile && (
            <div className="flex items-center space-x-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={onOpenCart}
                className="relative"
              >
                <ShoppingCart size={24} />
                {cartItemsCount > 0 && (
                  <Badge
                    className="absolute -top-2 -right-2 bg-criativo-primary text-white"
                    variant="default"
                  >
                    {cartItemsCount}
                  </Badge>
                )}
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </Button>
            </div>
          )}

          {/* Desktop Navigation */}
          {!isMobile && (
            <nav className="flex items-center space-x-4 lg:space-x-6">
              <div className="flex space-x-4 lg:space-x-6">
                <button
                  onClick={() => onGenderChange("all")}
                  className={`nav-item px-1 py-1 ${
                    selectedGender === "all" ? "active" : ""
                  }`}
                >
                  Todos
                </button>
                <button
                  onClick={() => onGenderChange("female")}
                  className={`nav-item px-1 py-1 ${
                    selectedGender === "female" ? "active" : ""
                  }`}
                >
                  Feminino
                </button>
                <button
                  onClick={() => onGenderChange("male")}
                  className={`nav-item px-1 py-1 ${
                    selectedGender === "male" ? "active" : ""
                  }`}
                >
                  Masculino
                </button>
              </div>

              {/* Search Bar */}
              <form onSubmit={handleSubmit} className="relative">
                <Input
                  type="text"
                  placeholder="Buscar produtos..."
                  className="w-[150px] lg:w-[250px] pr-8"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <Button
                  type="submit"
                  size="icon"
                  variant="ghost"
                  className="absolute right-0 top-0 h-full"
                >
                  <Search size={18} />
                </Button>
              </form>

              {/* Shopping Cart Button */}
              <Button
                variant="ghost"
                size="icon"
                onClick={onOpenCart}
                className="relative"
              >
                <ShoppingCart size={24} />
                {cartItemsCount > 0 && (
                  <Badge
                    className="absolute -top-2 -right-2 bg-criativo-primary text-white"
                    variant="default"
                  >
                    {cartItemsCount}
                  </Badge>
                )}
              </Button>
            </nav>
          )}
        </div>

        {/* Mobile Navigation Menu */}
        {isMobile && mobileMenuOpen && (
          <div className="pt-4 pb-2 border-t mt-2">
            <div className="flex flex-col space-y-4">
              <div className="flex justify-around space-x-2">
                <button
                  onClick={() => {
                    onGenderChange("all");
                    setMobileMenuOpen(false);
                  }}
                  className={`nav-item px-1 py-1 ${
                    selectedGender === "all" ? "active" : ""
                  }`}
                >
                  Todos
                </button>
                <button
                  onClick={() => {
                    onGenderChange("female");
                    setMobileMenuOpen(false);
                  }}
                  className={`nav-item px-1 py-1 ${
                    selectedGender === "female" ? "active" : ""
                  }`}
                >
                  Feminino
                </button>
                <button
                  onClick={() => {
                    onGenderChange("male");
                    setMobileMenuOpen(false);
                  }}
                  className={`nav-item px-1 py-1 ${
                    selectedGender === "male" ? "active" : ""
                  }`}
                >
                  Masculino
                </button>
              </div>
              
              <form onSubmit={handleSubmit} className="relative">
                <Input
                  type="text"
                  placeholder="Buscar produtos..."
                  className="w-full pr-8"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <Button
                  type="submit"
                  size="icon"
                  variant="ghost"
                  className="absolute right-0 top-0 h-full"
                >
                  <Search size={18} />
                </Button>
              </form>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
