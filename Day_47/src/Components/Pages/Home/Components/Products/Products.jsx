import React, { useEffect, useContext, createContext, useState } from "react";
import ProductItem from "./ProductItem";
import { HomeContext } from "../../Home";
import { AppContext } from "../../../../../App";
import CartList from "../Cart/CartList";

export default function Products() {
    const { products } = useContext(AppContext);

    return (
        <>
            <ul className="product-list grid grid-cols-4 gap-4">
                {products.map((product) => (
                    <ProductItem key={product._id} product={product} />
                ))}
            </ul>
            <CartList />
        </>
    );
}
