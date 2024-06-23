import React from "react";
import { httpClient } from "../../configs/client";
import { ToastContainer, toast } from "react-toastify";
export default function FormAction({ setListTodos }) {
    const addTodo = async (todo) => {
        const { response, data } = await httpClient.post("/todos", todo, {});
        if (response.ok) {
            setListTodos((listTodos) => [data.data, ...listTodos]);
            toast.success("Thêm mới thành công");
        }
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        if (e.target.todo.value.trim().length > 0) {
            addTodo({ todo: e.target.todo.value.trim() });
            e.target.todo.value = "";
        } else {
            alert("Không được để trống");
        }
    };
    return (
        <form className="w-full max-w-sm" onSubmit={handleSubmit}>
            <div class="flex items-center border-b border-teal-500 py-2">
                <input
                    type="text"
                    name="todo"
                    placeholder="Thêm một việc làm mới"
                    class="appearance-none bg-transparent border-none w-full mr-3 py-1 px-2 leading-tight focus:outline-none text-white "
                    autofocus=""
                />
                <button
                    type="submit"
                    class="bg-teal-500 hover:bg-teal-700 text-white  font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline flex-shrink-0"
                >
                    Thêm mới
                </button>
            </div>
            <ToastContainer />
        </form>
    );
}
