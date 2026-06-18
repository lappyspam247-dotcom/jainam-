export interface ShakeItem {
  id: string;
  name: string;
  category: 'Chocolates' | 'Classic' | 'Fusions' | 'Fruity';
  description: string;
  price: number;
  image: string;
  ingredients: string[];
  calories: number;
  rating: number;
  isPopular?: boolean;
}

export interface LocationItem {
  id: string;
  city: string;
  name: string;
  address: string;
  phone: string;
  timing: string;
  lat: number;
  lng: number;
}

export interface CartItem {
  cartId: string;
  shakeId: string;
  name: string;
  image: string;
  price: number;
  quantity: number;
  customization?: {
    size: 'Regular' | 'Thick-Size' | 'King-Size';
    sweetness: 'Less Sugar' | 'Normal' | 'Extra Sweet';
    thickness: 'Thick' | 'Ultra Thick' | 'Spoonable';
    selectedToppings: string[];
  };
}

export interface ReviewItem {
  id: string;
  name: string;
  role: string;
  rating: number;
  text: string;
  date: string;
  avatar: string;
}
