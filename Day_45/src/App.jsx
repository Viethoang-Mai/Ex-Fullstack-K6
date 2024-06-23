import { useState, useEffect } from "react";
import Header from "./Components/Header/Header";
import ListItem from "./Components/ListItemTodos/ListItem";
import FormAction from "./Components/FormAction/FormAction";
import { httpClient } from "./configs/client";
import { SERVER_API } from "./configs/config";
import { regexEmail } from "./Regex/regex";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

httpClient.baseUrl = SERVER_API;

function App() {
    let checkApiKey = localStorage.getItem("api_key");
    const [listTodos, setListTodos] = useState([]);
    const getTodos = async () => {
        httpClient.apiKey = localStorage.getItem("api_key");
        const { response, data } = await httpClient.get("/todos", {});
        if (response.ok) {
            if (data.data) {
                setListTodos(data.data.listTodo);
            }
        }
    };
    useEffect(() => {
        if (checkApiKey) {
            getTodos();
            console.log(123);
        }
    }, [checkApiKey]);
    useEffect(() => {
        if (!checkApiKey) {
            let urlEmail = prompt("Nhập email", "example@email.com");
            if (regexEmail(urlEmail)) {
                urlEmail = urlEmail.replace(/@/g, "%40");
                httpClient
                    .get("/api-key?email=" + urlEmail)
                    .then(({ response, data }) => {
                        console.log({ response, data });
                        if (response.ok) {
                            localStorage.setItem("api_key", data.data.apiKey);
                            toast.success("Đăng nhập thành công", {
                                position: "top-right",
                            });
                        } else {
                            toast.error("Đăng nhập thất bại", {
                                position: "top-right",
                            });
                            setTimeout(() => {
                                window.location.reload();
                            }, 1500);
                        }
                    });
            } else {
                toast.error("Email không đúng định dạng", {
                    position: "top-right",
                });
                setTimeout(() => {
                    window.location.reload();
                }, 1500);
            }
        } else {
            localStorage.setItem("api_key", checkApiKey);
            toast.success("Chào bạn đã quay trở lại", {
                position: "top-right",
            });
        }
    }, []);

    return (
        <main>
            <div className="container bg-slate-700 p-4 flex flex-col justify-center items-center mx-auto mt-5">
                <Header />
                <FormAction setListTodos={setListTodos} />
                <ListItem
                    data={listTodos}
                    setListTodos={setListTodos}
                    listTodos={listTodos}
                />
            </div>
        </main>
    );
}
export default App;
