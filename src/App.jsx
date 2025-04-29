import React from "react";
import "./App.css";
import LandingPage from "./ashok/pages/LandingPage";
import { Route, Routes } from "react-router-dom";
import ProductMenu from "./ashok/components/ProductMenu/ProductMenu";
const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/products/:firmId/:firmName" element={<ProductMenu />} />
      </Routes>
    </div>
  );
};

export default App;
