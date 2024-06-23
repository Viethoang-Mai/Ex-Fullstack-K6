/* eslint-disable no-undef */
export function accessToast(message) {
    Toastify({
        text: message,
        duration: 3000,
        destination: "",
        newWindow: true,
        close: true,
        gravity: "top",
        position: "right",
        stopOnFocus: true,
        style: {
            background: "blueviolet",
            borderRadius: "10px",
            color: "#fff",
        },
    }).showToast();
}

export function failedToast(message) {
    Toastify({
        text: message,
        duration: 3000,
        destination: "",
        newWindow: true,
        close: true,
        gravity: "top",
        position: "right",
        stopOnFocus: true,
        style: {
            background: "orange",
            borderRadius: "10px",
            color: "#fff",
        },
    }).showToast();
}
