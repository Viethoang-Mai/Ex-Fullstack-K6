import React from "react";
import { add } from "../../redux/redux-toolkit/slices/productSlice";
import { useDispatch } from "react-redux";
export default function BtnAddCart({ product }) {
    const {
        _id: id,
        name,
        price,
        image,
        brand,
        quantity: quantityProduct,
    } = product;
    const dispatch = useDispatch();
    const handleBuy = (e) => {
        const restQuantity = quantityProduct - 1;
        console.log(id);
        dispatch(
            add({
                id,
                name,
                price,
                image,
                brand,
                restQuantity,
                quantityProduct,
            })
        );
    };
    return (
        <span className="text-2xl cursor-pointer" onClick={handleBuy}>
            <i class="fa-solid fa-cart-shopping"></i>
        </span>
    );
}
