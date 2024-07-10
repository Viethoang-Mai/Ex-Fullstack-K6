import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import {
    decrease,
    increase,
    remove,
} from "../../redux/redux-toolkit/slices/productSlice";
import BtnCheckout from "./BtnCheckout";
export default function CartList({ cart }) {
    console.log("cart", cart.id);
    const dispatch = useDispatch();
    const handleIncrease = (id) => {
        dispatch(increase(id));
    };
    const handleDecrease = (id) => {
        dispatch(decrease(id));
    };
    const handleRemove = (id) => {
        dispatch(remove(id));
    };
    return (
        <div>
            <ul className="flex gap-4 flex-wrap flex-col justify-center w-3/5 mx-auto">
                {cart.map(
                    (item, index) => (
                        console.log("item", item),
                        (
                            <li
                                key={item.id}
                                className="flex gap-x-7 rounded items-center relative border-2 border-gray-200 py-4 px-8"
                            >
                                <span
                                    onClick={() => handleRemove(item.id)}
                                    className="absolute top-3 right-3 cursor-pointer text-red-500 hover:text-red-600 text-sm font-medium"
                                >
                                    Delete
                                </span>
                                <div>
                                    <img
                                        src={item.image}
                                        alt={item.category}
                                        className=" w-[200px] h-[150px] object-cover rounded"
                                    />
                                </div>
                                <div className="flex-grow">
                                    <h4 className="font-semibold text-xl">
                                        {item.brand}
                                    </h4>
                                    <h5 className="font-medium text-lg ">
                                        {item.name}
                                    </h5>
                                    <p className=" text-left mt-2">
                                        {" "}
                                        Đơn giá: ${item.price}
                                    </p>
                                    <p className=" text-left">
                                        Sản phẩm còn trong kho:{" "}
                                        {item.restQuantity}
                                    </p>

                                    <div className="flex justify-between mt-4 px-5">
                                        <div className="  border-2 border-gray-200 rounded-full px-2 flex gap-x-5">
                                            <span
                                                className="cursor-pointer"
                                                onClick={
                                                    item.quantity === 1
                                                        ? () =>
                                                              handleRemove(
                                                                  item.id
                                                              )
                                                        : () =>
                                                              handleDecrease(
                                                                  item.id
                                                              )
                                                }
                                            >
                                                -
                                            </span>
                                            <span className="w-[50px]">
                                                {item.quantity}
                                            </span>
                                            <span
                                                className="cursor-pointer"
                                                onClick={() =>
                                                    handleIncrease(item.id)
                                                }
                                            >
                                                +
                                            </span>
                                        </div>
                                        <span className="text-lg font-semibold">
                                            $ {item.price * item.quantity}
                                        </span>
                                    </div>
                                </div>
                            </li>
                        )
                    )
                )}
            </ul>
            <p className="total mt-5 text-xl font-semibold text-red-500">
                {" "}
                Total: ${cart.reduce((a, b) => a + b.price * b.quantity, 0)}
            </p>
            <div className="flex justify-end w-3/5 gap-x-5 mx-auto mt-5 font-semibold px-3">
                <Link
                    to="/"
                    className="px-3 py-1 border-2 border-black hover:bg-black hover:text-white transition duration-200 rounded"
                >
                    CONTINUE SHOPPING{" "}
                </Link>
                <BtnCheckout />
            </div>
        </div>
    );
}
