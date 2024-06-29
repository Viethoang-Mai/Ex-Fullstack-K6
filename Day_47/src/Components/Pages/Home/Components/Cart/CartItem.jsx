import React from "react";

export default function CartItem({ dataItem }) {
    return (
        <tr key={dataItem.id} className="text-gray-700">
            <td className="px-4 py-3">
                <div className="flex items-center text-sm">
                    <p className="font-semibold">{dataItem.name}</p>
                </div>
            </td>
            <td className="px-4 py-3 text-sm">{dataItem.quantity}</td>
            <td className="px-4 py-3 text-sm">{dataItem.restQuantity}</td>
            <td className="px-4 py-3 text-sm">
                {dataItem.price * dataItem.quantity}
            </td>
        </tr>
    );
}
