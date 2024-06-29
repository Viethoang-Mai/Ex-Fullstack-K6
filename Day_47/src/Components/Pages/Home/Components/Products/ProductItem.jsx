import React, { useContext } from "react";
import { AppContext } from "../../../../../App";
import { toast } from "react-toastify";
export default function ProductItem({ product }) {
    const { carts, setCarts } = useContext(AppContext);
    const handleAddToCart = () => {
        var newCarts = [...carts];
        const checkCart = newCarts.find((cart) => cart.id === product._id);
        if (checkCart) {
            checkCart.quantity += 1;
            checkCart.restQuantity = checkCart.restQuantity - 1;
            product.quantity = checkCart.restQuantity;
            localStorage.setItem("carts", JSON.stringify(newCarts));
            setCarts(newCarts);
            toast.success("Thêm sản phẩm thành công");
        } else {
            localStorage.setItem(
                "carts",
                JSON.stringify([
                    ...carts,
                    {
                        id: product._id,
                        name: product.name,
                        quantity: 1,
                        restQuantity: +product.quantity - 1,
                        price: product.price,
                    },
                ])
            );
            setCarts([
                ...carts,
                {
                    id: product._id,
                    name: product.name,
                    quantity: 1,
                    price: product.price,
                    restQuantity: +product.quantity - 1,
                },
            ]);
            toast.success("Thêm sản phẩm thành công");
        }
    };
    return (
        <li
            key={product._id}
            className="box p-4 shadow-lg bg-white rounded-lg relative"
        >
            <img
                src={product.image}
                alt={product.name}
                className="w-full h-64 object-cover rounded-t-lg"
            ></img>
            <h2 className="text-md font-semibold my-2">{product.name}</h2>
            <div className="flex justify-between items-center">
                <span className="text-orange-500 font-bold">
                    $ {product.price}
                </span>
                <button
                    className="bg-green-500 hover:bg-green-700 select-none text-white  font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline "
                    onClick={handleAddToCart}
                >
                    Add to cart!
                </button>
            </div>
        </li>
    );
}
