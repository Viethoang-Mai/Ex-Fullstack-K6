import React from "react";
import { useSelector } from "react-redux";
import CartList from "./CartList";
import NonCart from "./NonCart";

export default function Cart() {
    const cart = useSelector((state) => state.product.cart);
    console.log(cart.length);
    return (
        <div>
            <h2 className="text-center tracking-widest font-semibold text-4xl uppercase my-5">
                Shopping cart
            </h2>
            <div className="w-11/12 mx-auto text-center">
                {cart.length === 0 ? <NonCart /> : <CartList cart={cart} />}
            </div>
        </div>
    );
}
