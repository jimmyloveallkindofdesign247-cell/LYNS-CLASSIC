export type ProductCategory = 
  | 'All'
  | 'Evening Wear'
  | 'Streetwear Couture'
  | 'Tailored Suits';

export interface Product {
  id: string;
  title: string;
  category: 'Evening Wear' | 'Streetwear Couture' | 'Tailored Suits';
  price: number;
  description: string;
  material: string;
  silhouette: string;
  sizes: string[];
  colors: { name: string; hex: string }[];
  inStock: boolean;
  featured: boolean;
  image: string;
  badge?: {
    text: string;
    type: 'indigo' | 'yellow' | 'pink';
  };
}

export interface CartItem {
  id: string; // unique item instance id: `${productId}-${size}-${color}`
  product: Product;
  selectedSize: string;
  selectedColor: string;
  quantity: number;
}

export interface BespokeInquiry {
  name: string;
  email: string;
  phone: string;
  collectionInterest: string;
  fittingDate: string;
  notes: string;
}

export interface ValidationResult {
  isValid: boolean;
  errors: Record<string, string>;
}
