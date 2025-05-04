
import React, { useState, useEffect } from "react";
import { Search, ShoppingCart } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/components/ui/use-toast";

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
  const { toast } = useToast();

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
      <div className="container mx-auto px-4 py-4">
        <div className="flex flex-col lg:flex-row justify-between items-center space-y-4 lg:space-y-0">
          {/* Logo */}
          <div className="text-3xl font-bold">
            <a href="/" className="text-criativo-primary">
              Criativo Modas
            </a>
          </div>

          {/* Navigation */}
          <nav className="flex items-center space-x-8">
            <div className="flex space-x-6">
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
                className="w-[200px] lg:w-[250px] pr-8"
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
        </div>
      </div>
    </header>
  );
};

export default Header;
