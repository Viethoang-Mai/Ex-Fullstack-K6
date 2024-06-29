import React, { useContext } from "react";
import { AppContext } from "../../../../../App";
import CartItem from "./CartItem";
import { httpClient } from "../../../../configs/client";
import { toast } from "react-toastify";

export default function CartList() {
    const { carts, setCarts, setLoading } = useContext(AppContext);
    let bodyCarts = [];
    carts.forEach((item) => {
        bodyCarts.push({
            productId: item.id,
            quantity: item.quantity,
        });
    });

    const payingCarts = async () => {
        try {
            setLoading(true);
            httpClient.apiKey = localStorage.getItem("api_key");

            const { data, response } = await httpClient.post(
                "/orders",
                bodyCarts,
                {}
            );
            if (response.ok) {
                toast.success("Đã thanh toán");
                localStorage.removeItem("carts");
                setCarts([]);
            }
        } catch (error) {
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            {carts.length > 0 && (
                <div
                    key={carts.id}
                    className="w-full overflow-hidden rounded-lg shadow-xs mt-4"
                >
                    <div className="w-full overflow-hidden rounded-lg shadow-xs mt-4">
                        <table className="w-full whitespace-no-wrap">
                            <thead>
                                <tr className="text-xs font-semibold tracking-wide text-left text-gray-500 uppercase border-b bg-gray-50">
                                    <th className="px-4 py-3">Tên sản phẩm</th>
                                    <th className="px-4 py-3">Số lượng</th>
                                    <th className="px-4 py-3">Còn lại</th>
                                    <th className="px-4 py-3">Tổng tiền</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y">
                                {carts.map((item) => (
                                    <CartItem key={item.id} dataItem={item} />
                                ))}
                            </tbody>
                        </table>
                        <button
                            type="button"
                            onClick={payingCarts}
                            className="bg-green-500 hover:bg-green-700 select-none text-white  font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-max relative right-0"
                        >
                            Thanh toán
                        </button>
                    </div>
                </div>
            )}
            {carts.length === 0 && (
                <p className="text-white font-light mt-4">
                    Không có sản phẩm nào trong giỏ hàng cả
                </p>
            )}
        </>
    );
}
