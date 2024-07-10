import React from "react";
import Process from "./Components/Process/Process";
import Heading from "./Components/Hero/Heading";
import Form from "./Components/Form/Form";
import { ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

export default function App() {
    return (
        <div className="p-2">
            <Heading />
            <Process />
            <Form />
            <ToastContainer />
        </div>
    );
}
