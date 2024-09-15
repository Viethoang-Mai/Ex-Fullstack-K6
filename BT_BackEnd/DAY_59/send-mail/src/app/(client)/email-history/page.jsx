"use client";
import { useEffect, useState } from "react";
import { getHistory, getHistoryById } from "@/utils/fetchrequest";
export default function EmailHistory() {
    const [history, setHistory] = useState([]);
    const viewEmailDetails = (email) => {
        getHistoryById(email.id).then((data) => {
            alert("Email's content: " + data.content);
            window.location.reload();
        });
    };
    useEffect(() => {
        // getHistory().then((data) => setHistory(data));
    }, []);

    return (
        <div className="container mx-auto text-center">
            <h2 className="text-xl my-5 font-semibold">Lịch sử email đã gửi</h2>
            <table className="table w-full">
                <thead>
                    <tr>
                        <th>Email gửi đến</th>
                        <th>Tiêu đề</th>
                        <th>Trạng thái</th>
                        <th>Thời gian gửi</th>
                        <th>Hành động</th>
                    </tr>
                </thead>
                <tbody>
                    {history.map((email) => (
                        <tr key={email.id}>
                            <td>{email.to}</td>
                            <td>{email.title}</td>
                            <td>{email.status}</td>
                            <td>{new Date(email.sent_at).toLocaleString()}</td>
                            <td>
                                <button onClick={() => viewEmailDetails(email)}>
                                    Xem chi tiết
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
