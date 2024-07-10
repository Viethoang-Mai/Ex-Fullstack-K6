import React from "react";
import { Link } from "react-router-dom";

export default function nonCart() {
    return (
        <div>
            <p className="text-gray-700 font-medium text-2xl mt-20 mb-8">
                Your cart is empty!
            </p>
            <Link to="/products">
                <button className="text-blue-500 font-semibold text-md px-2 py-1 border border-blue-500 rounded hover:bg-blue-500 hover:text-white transition duration-300 ">
                    Start shopping
                </button>
            </Link>
        </div>
    );
}
