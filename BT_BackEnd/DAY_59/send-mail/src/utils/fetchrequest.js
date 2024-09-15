export const sendMail = async (to, title, content) => {
    const response = await fetch("http://localhost:8000/send-mail", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            to,
            title,
            content,
        }),
    });
    const data = await response.json();
    return data;
};

export const getHistory = async () => {
    const response = await fetch("http://localhost:8000/history");
    const data = await response.json();
    return data;
};

export const getHistoryById = async (id) => {
    const response = await fetch(`http://localhost:8000/history/${id}`);
    const data = await response.json();
    return data;
};
