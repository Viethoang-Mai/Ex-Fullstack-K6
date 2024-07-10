import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
export default function Header() {
    const cart = useSelector((state) => state.product.cart);
    return (
        <div className="flex fixed top-0 justify-between items-center w-full px-9 bg-gray-500 left-0 h-16 text-2xl z-50 text-white">
            <div>
                <Link to="/products">
                    <i class="fa-solid fa-house"></i>
                </Link>
            </div>

            <div>
                <Link to="/cart">
                    <i className="fa-solid fa-bag-shopping relative mr-5">
                        <span className="absolute -top-1/2 -right-1/2 text-white bg-red-500 rounded-full w-5 h-5 flex justify-center items-center text-xs">
                            {cart.reduce((a, b) => a + b.quantity, 0)}
                        </span>
                    </i>
                </Link>
            </div>
        </div>
    );
}
