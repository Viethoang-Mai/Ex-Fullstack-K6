import React from "react";
import { useDispatch } from "react-redux";
import { checkOut } from "../../redux/redux-toolkit/slices/productSlice";
export default function BtnCheckout() {
    const dispatch = useDispatch();
    const handleClick = () => {
        dispatch(checkOut());
    };
    return (
        <button
            className="px-3 py-1 border-2 border-black bg-black hover:bg-white text-white hover:text-black transition duration-200 rounded"
            onClick={handleClick}
        >
            CHECKOUT
        </button>
    );
}
