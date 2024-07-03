import React, { useState, createContext } from "react";
import Login from "./Components/Login/Login";
import Profile from "./Components/Profile/Profile";
import { useAuth0 } from "@auth0/auth0-react";
import { ToastContainer, toast } from "react-toastify";
import Loading from "./Components/Loading/Loading";

import "react-toastify/dist/ReactToastify.css";
export const AppContext = createContext();
export default function App() {
    const [isLoading, setLoading] = useState(false);
    return (
        <main>
            <AppContext.Provider value={{ setLoading, toast }}>
                <Login />
                <Profile />
            </AppContext.Provider>
            <ToastContainer autoClose={1000} />
            {isLoading && <Loading />}
        </main>
    );
}
