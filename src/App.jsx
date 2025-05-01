import React from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";

import LandingPage from "./ashok/pages/LandingPage";
import ProductMenu from "./ashok/components/ProductMenu/ProductMenu";
import LoginSignup from "./ashok/components/LoginSignUp/LoginSignup";
import ProtectedRoute from "./ashok/ProtectedRoute";

// ✅ Import Cart Context
import { CartProvider } from "./ashok/context/CartContext"; // Adjust the path as needed
import Cart from "./ashok/components/cart/Cart";

const App = () => {
  return (
    // ✅ Wrap everything with CartProvider
    <CartProvider>
      <div>
        <Routes>
          <Route path="/auth" element={<LoginSignup />} />

          {/* Protected Routes */}
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <LandingPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/products/:firmId/:firmName"
            element={
              <ProtectedRoute>
                <ProductMenu />
              </ProtectedRoute>
            }
          />
          <Route
            path="/cart"
            element={
              <ProtectedRoute>
                <Cart />
              </ProtectedRoute>
            }
          />
        </Routes>
      </div>
    </CartProvider>
  );
};

export default App;
