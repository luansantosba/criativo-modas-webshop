
import { Banner, Category, CategoryCircle, Color, Product } from "./types";

// Available colors
export const colors: Color[] = [
  { name: "Preto", hex: "#000000" },
  { name: "Branco", hex: "#FFFFFF" },
  { name: "Cinza", hex: "#888888" },
  { name: "Azul", hex: "#1E40AF" },
  { name: "Vermelho", hex: "#DC2626" },
  { name: "Rosa", hex: "#EC4899" },
  { name: "Verde", hex: "#059669" },
  { name: "Amarelo", hex: "#F59E0B" },
];

// Banner data
export const banners: Banner[] = [
  {
    id: 1,
    imageUrl: "https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=1920&auto=format&fit=crop",
    title: "Nova Coleção Verão",
    subtitle: "Descubra as últimas tendências da estação",
    link: "#products",
  },
  {
    id: 2,
    imageUrl: "https://images.unsplash.com/photo-1445205170230-053b83016050?q=80&w=1920&auto=format&fit=crop",
    title: "Promoção Especial",
    subtitle: "Até 40% de desconto em peças selecionadas",
    link: "#products",
  },
  {
    id: 3,
    imageUrl: "https://images.unsplash.com/photo-1479064555552-3ef4979f8908?q=80&w=1920&auto=format&fit=crop",
    title: "Coleção Exclusiva",
    subtitle: "Roupas para todos os estilos",
    link: "#products",
  },
];

// Categories
export const categories: CategoryCircle[] = [
  {
    id: 1,
    name: "Blusas",
    category: "blusa",
    imageUrl: "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?q=80&w=300&h=300&auto=format&fit=crop",
  },
  {
    id: 2,
    name: "Vestidos",
    category: "vestido",
    imageUrl: "https://images.unsplash.com/photo-1596783074569-1ed912cfa4e5?q=80&w=300&h=300&auto=format&fit=crop",
  },
  {
    id: 3,
    name: "Calças",
    category: "calca",
    imageUrl: "https://images.unsplash.com/photo-1584370848010-d7fe6bc767ec?q=80&w=300&h=300&auto=format&fit=crop",
  },
  {
    id: 4,
    name: "Shorts",
    category: "short",
    imageUrl: "https://images.unsplash.com/photo-1591195853828-11db59a44f6b?q=80&w=300&h=300&auto=format&fit=crop",
  },
];

// Product data
export const products: Product[] = [
  // Blusas - Femininas
  {
    id: "blusa-01",
    name: "Blusa de Algodão Básica",
    price: 59.9,
    description: "Blusa básica feminina confeccionada em 100% algodão. Confortável, macia e durável, essa peça é essencial para o guarda-roupa feminino. Pode ser combinada com diversas outras peças para criar looks casuais ou mais arrumados.",
    shortDescription: "Blusa básica em algodão de alta qualidade",
    category: "blusa",
    gender: "female",
    featured: true,
    variants: [
      {
        color: colors[0], // Preto
        sizes: ["P", "M", "G"],
        stock: 20,
        imageUrl: "https://images.unsplash.com/photo-1603251579431-8041402bdeda?q=80&w=500&auto=format&fit=crop",
      },
      {
        color: colors[1], // Branco
        sizes: ["P", "M", "G", "GG"],
        stock: 15,
        imageUrl: "https://images.unsplash.com/photo-1554568218-0f1715e72254?q=80&w=500&auto=format&fit=crop",
      },
    ],
  },
  {
    id: "blusa-02",
    name: "Blusa de Seda com Detalhes",
    price: 129.9,
    description: "Blusa elegante confeccionada em seda com detalhes em renda. Perfeita para ocasiões especiais ou para dar um toque de sofisticação ao seu look diário. Sua modelagem fluida valoriza a silhueta feminina.",
    shortDescription: "Elegante blusa de seda com acabamento em renda",
    category: "blusa",
    gender: "female",
    variants: [
      {
        color: colors[0], // Preto
        sizes: ["M", "G"],
        stock: 10,
        imageUrl: "https://images.unsplash.com/photo-1578587018452-892bacefd3f2?q=80&w=500&auto=format&fit=crop",
      },
      {
        color: colors[5], // Rosa
        sizes: ["P", "M", "G"],
        stock: 8,
        imageUrl: "https://images.unsplash.com/photo-1580566534096-417de50dd44f?q=80&w=500&auto=format&fit=crop",
      },
    ],
  },
  // Blusa - Masculina
  {
    id: "blusa-03",
    name: "Camiseta Estampada",
    price: 79.9,
    description: "Camiseta masculina confeccionada em malha premium com estampa exclusiva. Corte moderno e confortável, ideal para o dia a dia. A estampa foi desenvolvida com técnicas que garantem durabilidade mesmo após várias lavagens.",
    shortDescription: "Camiseta com estampa exclusiva em malha premium",
    category: "blusa",
    gender: "male",
    variants: [
      {
        color: colors[2], // Cinza
        sizes: ["M", "G", "GG"],
        stock: 12,
        imageUrl: "https://images.unsplash.com/photo-1562157873-818bc0726f68?q=80&w=500&auto=format&fit=crop",
      },
      {
        color: colors[3], // Azul
        sizes: ["P", "M", "G"],
        stock: 10,
        imageUrl: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?q=80&w=500&auto=format&fit=crop",
      },
    ],
  },
  // Vestidos
  {
    id: "vestido-01",
    name: "Vestido Midi Floral",
    price: 159.9,
    description: "Vestido midi confeccionado em tecido leve com estampa floral delicada. Possui corte que valoriza a silhueta e é extremamente confortável. Ideal para ocasiões especiais ou para um look do dia a dia mais elaborado. Combine com sandálias ou tênis para diferentes ocasiões.",
    shortDescription: "Vestido midi com estampa floral delicada",
    category: "vestido",
    gender: "female",
    featured: true,
    variants: [
      {
        color: colors[0], // Preto com floral
        sizes: ["P", "M", "G"],
        stock: 8,
        imageUrl: "https://images.unsplash.com/photo-1612336307429-8a898d10e223?q=80&w=500&auto=format&fit=crop",
      },
      {
        color: colors[4], // Vermelho com floral
        sizes: ["P", "M"],
        stock: 5,
        imageUrl: "https://images.unsplash.com/photo-1619863511424-523cd417c8af?q=80&w=500&auto=format&fit=crop",
      },
    ],
  },
  {
    id: "vestido-02",
    name: "Vestido de Festa Elegante",
    price: 249.9,
    description: "Vestido de festa confeccionado em tecido nobre com acabamentos delicados. Design elegante com decote discreto e corte ajustado ao corpo. Este vestido é perfeito para eventos formais, festas e ocasiões que pedem um visual mais sofisticado.",
    shortDescription: "Vestido sofisticado para eventos especiais",
    category: "vestido",
    gender: "female",
    variants: [
      {
        color: colors[0], // Preto
        sizes: ["P", "M", "G"],
        stock: 6,
        imageUrl: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?q=80&w=500&auto=format&fit=crop",
      },
      {
        color: colors[5], // Rosa
        sizes: ["P", "M"],
        stock: 4,
        imageUrl: "https://images.unsplash.com/photo-1539008835657-9e8e9680c956?q=80&w=500&auto=format&fit=crop",
      },
    ],
  },
  // Calças
  {
    id: "calca-01",
    name: "Calça Jeans Skinny",
    price: 139.9,
    description: "Calça jeans feminina modelo skinny com cintura alta. Confeccionada em denim premium com elastano para maior conforto e flexibilidade. O acabamento premium garante durabilidade e o modelo valoriza a silhueta feminina. Combina com diversas peças e estilos.",
    shortDescription: "Calça jeans skinny feminina com cintura alta",
    category: "calca",
    gender: "female",
    variants: [
      {
        color: colors[3], // Azul escuro (jeans)
        sizes: ["36", "38", "40", "42"],
        stock: 15,
        imageUrl: "https://images.unsplash.com/photo-1582418702059-97ebafb35d09?q=80&w=500&auto=format&fit=crop",
      },
      {
        color: colors[0], // Preto
        sizes: ["36", "38", "40"],
        stock: 10,
        imageUrl: "https://images.unsplash.com/photo-1584370848010-d7fe6bc767ec?q=80&w=500&auto=format&fit=crop",
      },
    ],
  },
  {
    id: "calca-02",
    name: "Calça Cargo Masculina",
    price: 149.9,
    description: "Calça cargo masculina confeccionada em sarja resistente. Possui diversos bolsos funcionais e design moderno. Extremamente versátil e confortável, esta peça pode ser usada em diversas ocasiões e combinada com diferentes estilos de camisetas e calçados.",
    shortDescription: "Calça cargo com múltiplos bolsos em sarja resistente",
    category: "calca",
    gender: "male",
    featured: true,
    variants: [
      {
        color: colors[2], // Cinza
        sizes: ["40", "42", "44", "46"],
        stock: 12,
        imageUrl: "https://images.unsplash.com/photo-1542272604-787c3835535d?q=80&w=500&auto=format&fit=crop",
      },
      {
        color: colors[6], // Verde
        sizes: ["40", "42", "44"],
        stock: 8,
        imageUrl: "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?q=80&w=500&auto=format&fit=crop",
      },
    ],
  },
  {
    id: "calca-03",
    name: "Calça Alfaiataria Feminina",
    price: 179.9,
    description: "Calça feminina de alfaiataria com corte reto e cintura alta. Confeccionada em tecido premium com caimento impecável, garantindo conforto e elegância. Ideal para looks de trabalho ou ocasiões que pedem um visual mais sofisticado.",
    shortDescription: "Calça de alfaiataria com corte reto e cintura alta",
    category: "calca",
    gender: "female",
    variants: [
      {
        color: colors[0], // Preto
        sizes: ["P", "M", "G"],
        stock: 10,
        imageUrl: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?q=80&w=500&auto=format&fit=crop",
      },
      {
        color: colors[2], // Cinza
        sizes: ["P", "M"],
        stock: 6,
        imageUrl: "https://images.unsplash.com/photo-1551854838-212c9a5262d3?q=80&w=500&auto=format&fit=crop",
      },
    ],
  },
  // Shorts
  {
    id: "short-01",
    name: "Short Jeans Feminino",
    price: 89.9,
    description: "Short jeans feminino com barra desfiada e cintura alta. Confeccionado em denim de alta qualidade com elastano para maior conforto. Modelagem que valoriza o corpo e proporciona liberdade de movimentos. Perfeito para looks casuais nos dias mais quentes.",
    shortDescription: "Short jeans de cintura alta com barra desfiada",
    category: "short",
    gender: "female",
    variants: [
      {
        color: colors[3], // Azul (jeans)
        sizes: ["36", "38", "40", "42"],
        stock: 12,
        imageUrl: "https://images.unsplash.com/photo-1591195853828-11db59a44f6b?q=80&w=500&auto=format&fit=crop",
      },
      {
        color: colors[0], // Preto
        sizes: ["36", "38", "40"],
        stock: 8,
        imageUrl: "https://images.unsplash.com/photo-1475178626620-a4d074967452?q=80&w=500&auto=format&fit=crop",
      },
    ],
  },
  {
    id: "short-02",
    name: "Bermuda Masculina de Sarja",
    price: 109.9,
    description: "Bermuda masculina confeccionada em sarja de alta qualidade. Possui modelagem reta, comprimento na altura do joelho e bolsos funcionais. Extremamente confortável e versátil, é uma peça essencial para o guarda-roupa masculino nos dias mais quentes.",
    shortDescription: "Bermuda de sarja com bolsos funcionais e acabamento premium",
    category: "short",
    gender: "male",
    featured: true,
    variants: [
      {
        color: colors[0], // Preto
        sizes: ["40", "42", "44", "46"],
        stock: 15,
        imageUrl: "https://images.unsplash.com/photo-1626497764746-6dc36546b388?q=80&w=500&auto=format&fit=crop",
      },
      {
        color: colors[2], // Cinza
        sizes: ["40", "42", "44"],
        stock: 10,
        imageUrl: "https://images.unsplash.com/photo-1552902019-ebcd97aa9aa0?q=80&w=500&auto=format&fit=crop",
      },
    ],
  },
];

// Filter products by category
export const getProductsByCategory = (category: Category) => {
  return products.filter(product => product.category === category);
};

// Filter products by gender
export const getProductsByGender = (gender: "male" | "female" | "all") => {
  if (gender === "all") return products;
  return products.filter(product => product.gender === gender);
};

// Get featured products
export const getFeaturedProducts = () => {
  return products.filter(product => product.featured);
};

// Search products by name
export const searchProducts = (query: string) => {
  const lowercaseQuery = query.toLowerCase();
  return products.filter(product => 
    product.name.toLowerCase().includes(lowercaseQuery) || 
    product.description.toLowerCase().includes(lowercaseQuery)
  );
};

// Calculate shipping based on zipCode
export const calculateShipping = (zipCode: string, method: "PAC" | "SEDEX" | "EXPRESS") => {
  // This is a mock implementation
  const basePrice = 15;
  switch(method) {
    case "PAC":
      return basePrice;
    case "SEDEX":
      return basePrice * 1.5;
    case "EXPRESS":
      return basePrice * 2;
    default:
      return basePrice;
  }
};

// Get address information from zipCode
export const getAddressFromZipCode = async (zipCode: string) => {
  try {
    const response = await fetch(`https://viacep.com.br/ws/${zipCode}/json/`);
    const data = await response.json();
    
    if (data.erro) {
      return null;
    }
    
    return {
      street: data.logradouro,
      neighborhood: data.bairro,
      city: data.localidade,
      state: data.uf,
    };
  } catch (error) {
    console.error("Error fetching address:", error);
    return null;
  }
};
