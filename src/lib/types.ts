
export type Gender = "male" | "female" | "unisex";

export type Category = "blusa" | "vestido" | "calca" | "short";

export type Size = "PP" | "P" | "M" | "G" | "GG" | "XG" | "36" | "38" | "40" | "42" | "44" | "46";

export type Color = {
  name: string;
  hex: string;
};

export type ProductVariant = {
  color: Color;
  sizes: Size[];
  stock: number;
  imageUrl: string;
};

export type Product = {
  id: string;
  name: string;
  price: number;
  description: string;
  shortDescription: string;
  category: Category;
  gender: Gender;
  variants: ProductVariant[];
  featured?: boolean;
};

export type CartItem = {
  product: Product;
  quantity: number;
  selectedColor: Color;
  selectedSize: Size;
};

export type ShippingMethod = "PAC" | "SEDEX" | "EXPRESS";

export type PaymentMethod = "PIX" | "CREDIT_CARD";

export type Address = {
  street: string;
  number: string;
  neighborhood: string;
  city: string;
  state: string;
  zipCode: string;
};

export type Banner = {
  id: number;
  imageUrl: string;
  title: string;
  subtitle: string;
  link: string;
};

export type CategoryCircle = {
  id: number;
  name: string;
  category: Category;
  imageUrl: string;
};
