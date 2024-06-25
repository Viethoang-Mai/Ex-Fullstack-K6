import { useState, useEffect } from "react";
import Header from "./Components/Header/Header";
import ListItem from "./Components/ListItemTodos/ListItem";
import FormAction from "./Components/FormAction/FormAction";
import { httpClient } from "./configs/client";
import { SERVER_API } from "./configs/config";
import { regexEmail } from "./Regex/regex";
import InputSearch from "./Components/InputSearch/InputSearch";
import Loading from "./Components/Loading/Loading";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

httpClient.baseUrl = SERVER_API;
function App() {
    const [search, setSearch] = useState({
        keyWord: "",
    });
    const [isLoading, setIsLoading] = useState(false);
    const [apiKey, setApiKey] = useState(localStorage.getItem("api_key"));
    const [listTodos, setListTodos] = useState([]);
    const getTodos = async () => {
        setIsLoading(true);
        httpClient.apiKey = localStorage.getItem("api_key");
        const { response, data } = await httpClient.get(
            `/todos?q=${search.keyWord ? search.keyWord : ""}`,
            {}
        );
        if (response.ok) {
            if (data.data) {
                setListTodos(data.data.listTodo);
            }
        }
        setIsLoading(false);
    };
    useEffect(() => {
        if (apiKey) {
            getTodos();
        }
    }, [apiKey, search.keyWord]);

    useEffect(() => {
        if (!apiKey) {
            var urlEmail = prompt("Nhập email", "example@email.com");
            if (regexEmail(urlEmail)) {
                urlEmail = urlEmail.replace(/@/g, "%40");

                try {
                    setIsLoading(true);
                    httpClient
                        .get("/api-key?email=" + urlEmail)
                        .then(({ response, data }) => {
                            if (response.ok) {
                                localStorage.setItem(
                                    "api_key",
                                    data.data.apiKey
                                );
                                localStorage.setItem("email", response.url);

                                setApiKey(data.data.apiKey);
                                toast.success(data.message);
                            }
                        });

                    setIsLoading(false);
                } catch (error) {
                    // return toast.error(error.message);
                }
            } else {
                toast.error("Email không đúng định dạng", {
                    position: "top-right",
                });
                setTimeout(() => {
                    window.location.reload();
                }, 1500);
            }
        } else {
            let emailUrl = localStorage.getItem("email").replace("%40", "@");
            const email = emailUrl.slice(
                emailUrl.indexOf("=") + 1,
                emailUrl.indexOf("@")
            );
            toast.success("Chào bạn " + email + " quay trở lại", {
                position: "top-right",
            });
        }
    }, []);

    return (
        <main>
            <div className="container bg-slate-700 p-4 flex flex-col justify-center items-center mx-auto mt-5">
                <Header />
                <FormAction
                    setListTodos={setListTodos}
                    setIsLoading={setIsLoading}
                    listTodos={listTodos}
                />
                <InputSearch
                    setSearch={setSearch}
                    setIsLoading={setIsLoading}
                />
                <ListItem
                    data={listTodos}
                    setListTodos={setListTodos}
                    setIsLoading={setIsLoading}
                />
            </div>
            {isLoading && <Loading />}
        </main>
    );
}
export default App;
