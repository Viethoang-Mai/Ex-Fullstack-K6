import { ToastContainer, toast } from "react-toastify";
import Login from "./Components/Pages/Home/Components/Login/Login";
import { useState, useEffect, createContext } from "react";
import Home from "./Components/Pages/Home/Home";
import { httpClient } from "./Components/configs/client";
import { SERVER_API } from "../src/Components/configs/config";
import Loading from "./Components/Loading/Loading";
httpClient.baseUrl = SERVER_API;
export const AppContext = createContext();
const query = {
    limit: 8,
};
export default function App() {
    const [apiKey, setApiKey] = useState(localStorage.getItem("api_key"));
    const [nameUser, setNameUser] = useState(localStorage.getItem("name_user"));
    const [isLoading, setLoading] = useState(false);
    const [products, setProducts] = useState(
        JSON.parse(localStorage.getItem("products")) || []
    );
    const [carts, setCarts] = useState(
        JSON.parse(localStorage.getItem("carts")) || []
    );

    useEffect(() => {
        if (apiKey) {
            if (products.length === 0) {
                const params = new URLSearchParams(query).toString();
                try {
                    setLoading(true);
                    httpClient
                        .get(`/products?${params}`)
                        .then(({ data, response }) => {
                            if (response.ok) {
                                localStorage.setItem(
                                    "products",
                                    JSON.stringify(data.data.listProduct)
                                );
                                setProducts(data.data.listProduct);
                                toast.success(
                                    `Chào bạn ${nameUser} đã trở lại`
                                );
                            }
                            setLoading(false);
                        });
                } catch (error) {
                    console.log(error);
                }
            } else {
                setProducts(JSON.parse(localStorage.getItem("products")));
                toast.success(`Chào bạn ${nameUser} đã trở lại`);
            }
        } else {
            toast.error("Vui lòng đăng nhập để tiếp tục");
            localStorage.removeItem("products");
            setProducts([]);
            console.log(nameUser);
        }
    }, [apiKey]);

    // useEffect(() => {
    //     setCarts(JSON.parse(localStorage.getItem("carts")));
    // }, []);
    return (
        <AppContext.Provider
            value={{
                apiKey,
                setApiKey,
                products,
                carts,
                setCarts,
                setLoading,
                setNameUser,
                nameUser,
            }}
        >
            <div className="__className_6a793a flex items-center justify-center p-8">
                {!apiKey && <Login />}
                {apiKey && <Home />}
                {isLoading && <Loading />}
                <ToastContainer position="top-right" autoClose={1500} />
            </div>
        </AppContext.Provider>
    );
}
