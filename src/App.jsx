import { useState, useEffect } from "react";

import { BrowserRouter, Routes, Route } from "react-router-dom";

import "./App.css";
import { getCategories } from "./fetcher";

import {
  Basket,
  Category,
  Checkout,
  Home,
  ProductDetail,
  Layout,
  OrderConfirmation,
  SearchResults
} from './components';

function App() {
  const [categories, setCategories] = useState({
    errorMessage: "",
    data: [],
  });

  useEffect(() => {
    const fetchData = async () => {
      const responseObject = await getCategories();
      setCategories(responseObject);
    };
    fetchData();
  }, []);

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <Layout
                categories={categories}
              />
            }
          >
            <Route index element={<Home />} />
            <Route path="basket" element={<Basket />} />
            <Route path="checkout" element={<Checkout />} />
            <Route path="orderconfirmation" element={<OrderConfirmation />} />
            <Route path="search" element={<SearchResults />} />
            <Route
              path="categories/:categoryId"
              element={<Category />}
            />
            <Route
              path="products/:productId"
              element={<ProductDetail />}
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
