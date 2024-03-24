// CartContext.js
import React, { createContext, useState } from "react";

export const CartContext = createContext();

const CartContextProvider = (props) => {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (product) => {
    setCartItems([...cartItems, product]);
  };

  const removeFromCart = (productId) => {
    setCartItems(cartItems.filter((item) => item.id !== productId));
  };

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart }}>
      {props.children}
    </CartContext.Provider>
  );
};

export default CartContextProvider;
