import { CartState } from "@/app/types/types";
import { create } from "zustand";
import { persist } from "zustand/middleware";



export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      cart: [],
      addToCart: (item) =>
        set((state) => {
          const existing = state.cart.find((el) => el.id === item.id);
          if (existing) {
            return {
              cart: state.cart.map((el) =>
                el.id === item.id
                  ? { ...el, quantity: el.quantity + item.quantity }
                  : el
              ),
            };
          } else {
            return { cart: [...state.cart, item] };
          }
        }),
      updateQuantity: (id, quantity) =>
        set((state) => ({
          cart: state.cart.map((item) =>
            item.id === id ? { ...item, quantity } : item
          ),
        })),
      removeFromCart: (id) =>
        set((state) => ({
          cart: state.cart.filter((item) => item.id !== id),
        })),
      clearCart: () => set({ cart: [] }),
    }),
    {
      name: "cart-storage",
    }
  )
);
