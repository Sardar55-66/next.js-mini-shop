export interface Product {
    description: string;
    id: number;
    image_url: string;
    price: number;
    title: string;
}

export interface Review {
  id: number;
  text: string;
};

interface CartItem {
    id: number;
    quantity: number;
  }
  
 export interface CartState {
    cart: CartItem[];
    addToCart: (item: CartItem) => void;
    updateQuantity: (id: number, quantity: number) => void;
    removeFromCart: (id: number) => void;
    clearCart: () => void;
  }