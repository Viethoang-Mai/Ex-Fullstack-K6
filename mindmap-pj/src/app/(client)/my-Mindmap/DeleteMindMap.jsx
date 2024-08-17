// components/DeleteButton.js
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

export default function DeleteButton({ id, userId }) {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const router = useRouter();

    const handleDelete = async () => {
        if (confirm("Bạn có chắc chắn muốn xóa mục này?")) {
            setLoading(true);
            setError(null);

            const res = await fetch(
                `${process.env.NEXT_PUBLIC_LOCALE_URL_MINDMAP}`
            );
            const data = await res.json();

            // Tìm người dùng với ID cụ thể
            const userIndex = data.findIndex((user) => user.id === userId);

            if (userIndex === -1) {
                throw new Error("User not found");
            }

            // Xóa bản đồ tư duy khỏi mindMapData của người đó
            const updatedMindMapData = data[userIndex].mindMapData.filter(
                (mindMap) => mindMap.idMap !== id
            );

            data[userIndex].mindMapData = updatedMindMapData;

            const updateRes = await fetch(
                `${process.env.NEXT_PUBLIC_LOCALE_URL_MINDMAP}/${userId}`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(data[userIndex]),
                }
            );

            if (!updateRes.ok) {
                throw new Error("Failed to update user data");
            }
            toast.success("Xóa thành công");
            router.refresh();
            return await updateRes.json();
        }
    };

    return (
        <button
            onClick={handleDelete}
            className="px-2 leading-tight  py-1 rounded bg-red-500 text-white"
            disabled={loading}
        >
            Xóa
        </button>
    );
}
