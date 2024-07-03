import React, { useState, createContext } from "react";
import Login from "./Components/Login/Login";
import Profile from "./Components/Profile/Profile";
import { useAuth0 } from "@auth0/auth0-react";
import { ToastContainer } from "react-toastify";
import Loading from "./Components/Loading/Loading";

import "react-toastify/dist/ReactToastify.css";
export const AppContext = createContext();
export default function App() {
    const { isAuthenticated, isLoading: loading } = useAuth0();
    const [isLoading, setLoading] = useState(false);
    if (loading) {
        return (
            <div className="over-loading fixed inset-0 justify-center items-center">
                <div className="loader"></div>
            </div>
        );
    }

    return (
        <main>
            <AppContext.Provider value={{ setLoading }}>
                {isAuthenticated ? <Profile /> : <Login />}
            </AppContext.Provider>
            <ToastContainer autoClose={1000} />
            {isLoading && <Loading />}
        </main>
    );
}
