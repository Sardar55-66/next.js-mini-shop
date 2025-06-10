"use client";

import { useCartStore } from "@/store/cart";
import OrderForm from "./OrderForm";
import { Product } from "../types/types";

interface CartSummaryProps {
  product: Product[];
}

export default function CartSummary({ product }: CartSummaryProps) {
  const cart = useCartStore((state) => state.cart);
  const removeFromCart = useCartStore((state) => state.removeFromCart);

  cart.forEach((item) => {
    if (item.quantity === 0) {
      removeFromCart(item.id);
    }
  });

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  const totalPrice = cart.reduce((sum, item) => {
    const prod = product.find((prod: Product) => prod.id === item.id);
    return prod ? sum + item.quantity * prod.price : sum;
  }, 0);

  return (
    <div className="carts-summary">
      <p className="added-items">Добавленные товары</p>

      {cart.length > 0 ? (
        <div className="cart-items-table">
          {cart.map((item) => {
            const good = product.find((prod: Product) => prod.id === item.id);
            if (!good) return null;

            return (
              <div key={item.id} className="cart-item-row">
                <span className="cart-item-title">{good.title}</span>
                <span className="cart-item-quantity">×{item.quantity}</span>
                <span className="cart-item-price">
                  {item.quantity * good.price} ₽
                </span>
              </div>
            );
          })}
        </div>
      ) : (
        <p>Корзина пуста</p>
      )}

      <OrderForm />
    </div>
  );
}
