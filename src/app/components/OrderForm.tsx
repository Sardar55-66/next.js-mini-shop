"use client";

import InputMask from "react-input-mask";
import { useState } from "react";
import { useCartStore } from "@/store/cart";
import { postOrder } from "@/libs/api";
import { toast } from "react-toastify";

export default function OrderForm() {
  const [phone, setPhone] = useState("");
  const cart = useCartStore((state) => state.cart);
  const clearCart = useCartStore((state) => state.clearCart);

  const formatPhone = (value: string) => {
    
    const digits = value.replace(/\D/g, "").slice(0, 11);
  
    const first = digits[0] === "7" ? "7" : "7";
  
    const part1 = digits.slice(1, 4);
    const part2 = digits.slice(4, 7);
    const part3 = digits.slice(7, 9);
    const part4 = digits.slice(9, 11);
  
    let formatted = `+${first} `;
  
    if (part1) {
      formatted += `(${part1}`;
    }
    if (part1 && part1.length === 3) {
      formatted += `)`;
    }
    if (part2) {
      formatted += ` ${part2}`;
    }
    if (part3) {
      formatted += `-${part3}`;
    }
    if (part4) {
      formatted += `-${part4}`;
    }
  
    return formatted;
  };
  


  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatPhone(e.target.value);
    setPhone(formatted);
  };
  



  const handleSubmit = async () => {
    // Проверка телефона
    const cleanPhone = phone.replace(/\D/g, "");
    if (cleanPhone.length !== 11) {
      toast.error("Пожалуйста, введите корректный номер телефона");
      return;
    }

    // Проверка корзины
    if (cart.length === 0) {
      toast.error("Корзина пуста");
      return;
    }

    const orderData = {
      phone: cleanPhone,
      cart: cart.map((item) => ({
        id: item.id,
        quantity: item.quantity,
      })),
    };

    try {
      const response = await postOrder(orderData);
      if (response.success === 1) {
        toast.success("Заказ успешно отправлен!");
        clearCart();
        setPhone("");
      } else {
        toast.error(response.error || "Ошибка оформления заказа");
      }
    } catch (error) {
      toast.error("Сервер недоступен");
    }
  };

  return (
    <div className="order-form">
      <input
        type="tel"
        value={phone}
        onChange={handlePhoneChange}
        placeholder="+7 (___) ___-__-__"
      />
      <button onClick={handleSubmit}>
        Заказать
      </button>
    </div>
  );
}
