// App.js
import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import ProductCatalog from "./components/ProductCatalog";
import ShoppingCart from "./components/ShoppingCart";
import { AuthProvider } from "./contexts/AuthContext";
import CartContextProvider from "./contexts/CartContext";
import "./styles/styles.css"; // Import CSS file

function App() {
  return (
    <AuthProvider>
      <CartContextProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<ProductCatalog />} />
            <Route path="/shopping-cart" element={<ShoppingCart />} />
          </Routes>
        </BrowserRouter>
      </CartContextProvider>
    </AuthProvider>
  );
}

export default App;
