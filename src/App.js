import React from "react";
import Home from "./page/Home";
import { Routes, Route } from "react-router-dom";
import ProductDetail from "./page/ProductDetail";
import Header from "./components/Header";
import Search from "./page/Search";
import Filter from "./page/Filter";
const App = () => {
  return (
    <div>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Home />} />
        <Route path="/products/:id" element={<ProductDetail />} />
        <Route path="/search/:value" element={<Search />} />
        <Route path="/filter/:option/:value" element={<Filter />} />
      </Routes>
    </div>
  );
};

export default App;
