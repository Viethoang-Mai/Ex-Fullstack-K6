import React from "react";
import Products from "./Components/Products/Products";
import Header from "./Components/Header/Header";
import Cart from "./Components/Cart/Cart";
import { Routes, Route, Navigate } from "react-router-dom";
import ProductDetail from "./Components/ProductDetail/ProductDetail";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import NotFound from "./Components/NotFound/NotFound";
import "./index.css";
export default function App() {
    return (
        <div className="p-7 pt-16">
            <Header />
            <Routes>
                <Route path="/" element={<Products />} />
                <Route path="/not-found" element={<NotFound />} />
                <Route path="*" element={<Navigate to="/not-found" />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/details/">
                    <Route path=":slug/:id" element={<ProductDetail />} />
                </Route>
                <Route path="/products/">
                    <Route path=":page" element={<Products />} />
                    <Route path="" element={<Products />} />
                </Route>
            </Routes>

            <ToastContainer autoClose={1000} position="top-center" />
        </div>
    );
}
