import React from "react";
import Auth from "./Components/Auth/Auth";
import { ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

export default function App() {
    return (
        <div>
            <Auth />
            <ToastContainer autoClose={1000} position="top-right" />
        </div>
    );
}
