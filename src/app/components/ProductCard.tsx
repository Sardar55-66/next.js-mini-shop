"use client";

import { useCartStore } from "@/store/cart";
import { useState, useEffect } from "react";
import { Product } from "../types/types";

interface ProductCard {
  product: Product;
}

export default function ProductCard({ product }: ProductCard) {
  const { addToCart, updateQuantity, removeFromCart, cart } = useCartStore();
  const cartItem = cart.find((item) => item.id === product.id);

  const [localQuantity, setLocalQuantity] = useState<number>(cartItem?.quantity || 0);
  const [isEditing, setIsEditing] = useState<boolean>(!!cartItem);

  useEffect(() => {
    if (cartItem) {
      setLocalQuantity(cartItem.quantity);
      setIsEditing(true);
    } else {
      setLocalQuantity(0);
      setIsEditing(false);
    }
  }, [cartItem]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);

    if (isNaN(value) || value < 0) return;

    if (value === 0) {
      removeFromCart(product.id);
      setIsEditing(false);
    } else {
      setLocalQuantity(value);
      updateQuantity(product.id, value);
    }
  };

  const handlePlus = () => {
    const newVal = localQuantity + 1;
    setLocalQuantity(newVal);
    updateQuantity(product.id, newVal);
  };

  const handleMinus = () => {
    if (localQuantity > 1) {
      const newVal = localQuantity - 1;
      setLocalQuantity(newVal);
      updateQuantity(product.id, newVal);
    } else if (localQuantity === 1) {
      removeFromCart(product.id);
      setIsEditing(false);
    }
  };

  const handleBuy = () => {
    addToCart({ id: product.id, quantity: 1 });
    setLocalQuantity(1);
    setIsEditing(true);
  };

  return (
    <div className="product-card">
      <div className="card-info-container">
        <div className="product-image">
          <img src={product.image_url} alt={product.title} />
          <p className="product-title">{product.title}</p>
          <p className="product-descr">Описание: {product.description}</p>
        </div>
        <p className="product-price">Цена: {product.price}₽</p>
      </div>

      {isEditing ? (
        <div className="products-quantity">
          <button onClick={handleMinus}>-</button>
          <input
            type="tel"
            min={0}
            value={localQuantity}
            onChange={handleChange}
          />
          <button onClick={handlePlus}>+</button>
        </div>
      ) : (
        <button type="button" className="btn-to-buy" onClick={handleBuy}>
          Купить
        </button>
      )}
    </div>
  );
}
