import React from "react";
import { useState, useEffect } from "react";
import { httpClient } from "../../configs/client";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export default function Items({
    todo,
    id,
    isCompleted,
    setListTodos,
    setIsLoading,
}) {
    const [isEdit, setIsEdit] = useState(null);

    const [todoData, setTodoData] = useState({
        todoItem: todo,
        isCompletedItem: isCompleted,
    });
    const [prevState, setPrevState] = useState(todoData);

    const deleteTodo = async (id) => {
        setIsLoading(true);
        const { response, data } = await httpClient.delete(`/todos/${id}`);
        if (response.ok) {
            setListTodos((listTodos) =>
                listTodos.filter((item) => item._id !== id)
            );
            toast.success(data.message);
        }
        setIsLoading(false);
    };
    const handleDelete = (e) => {
        const id = e.target.dataset.id;
        deleteTodo(id);
    };
    const updateTodo = async (id, todo) => {
        setIsLoading(true);
        const { response, data } = await httpClient.patch(
            `/todos/${id}`,
            {
                todo: todo,
                isCompleted: todoData.isCompletedItem,
            },
            {}
        );
        if (response.ok) {
            setTodoData((todoData) => ({
                ...todoData,
                todoItem: data.data.todo,
                isCompletedItem: data.data.isCompleted,
            }));
            setPrevState(todoData);
            toast.success(data.message);
        }
        setIsLoading(false);
    };
    const handleUpdate = (e) => {
        const id = e.target.dataset.id;
        const todoUpdate = todoData.todoItem;
        if (!todoUpdate.trim().length) {
            return alert("Không được để trống");
        }
        updateTodo(id, todoUpdate);
        setIsEdit(null);
    };
    const handleEdit = (id) => {
        setIsEdit((isEdit) => (isEdit === id ? null : id));
    };

    useEffect(() => {
        setTodoData((todoData) => ({
            ...todoData,
            todoItem: todo,
            isCompletedItem: isCompleted,
        }));
    }, [todo, isCompleted]);
    return (
        <li
            key={id}
            data-id={id}
            className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 flex flex-col my-2"
        >
            <input
                className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline  "
                value={todoData.todoItem}
                readOnly={!isEdit ? "readOnly" : ""}
                style={{
                    textDecoration: todoData.isCompletedItem
                        ? "line-through"
                        : "none",
                }}
                onChange={(e) => {
                    setTodoData((todoData) => ({
                        ...todoData,
                        todoItem: e.target.value,
                    }));
                }}
            ></input>
            <div className="flex items-center justify-between mt-4">
                {isEdit === id && (
                    <div className="flex items-center">
                        <label htmlFor={id} className="mr-2">
                            {!todoData.isCompletedItem
                                ? "Not Completed"
                                : "Completed"}
                        </label>
                        <input
                            id={id}
                            type="checkbox"
                            className="form-checkbox h-5 w-5 text-gray-600 "
                            checked={todoData.isCompletedItem}
                            onChange={(e) => {
                                setTodoData((todoData) => ({
                                    ...todoData,
                                    isCompletedItem: e.target.checked,
                                }));
                            }}
                        />
                    </div>
                )}
                <div className="flex items-center">
                    {isEdit && (
                        <button
                            onClick={() => {
                                setIsEdit(null);
                                setTodoData(prevState);
                            }}
                            type="button"
                            className="bg-orange-500 hover:bg-orange-700 text-white  font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mr-2"
                        >
                            Thoát
                        </button>
                    )}
                    {!isEdit ? (
                        <button
                            data-id={id}
                            type="button"
                            className="bg-teal-500 hover:bg-teal-700 text-white  font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mr-2"
                            onClick={() => {
                                handleEdit(id);
                            }}
                        >
                            Sửa
                        </button>
                    ) : (
                        <button
                            data-id={id}
                            type="button"
                            className="bg-teal-500 hover:bg-teal-700 text-white  font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mr-2"
                            onClick={handleUpdate}
                        >
                            Lưu
                        </button>
                    )}

                    <button
                        data-id={id}
                        type="button"
                        className="bg-red-500 hover:bg-red-700 text-white  font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline "
                        onClick={handleDelete}
                    >
                        Xóa
                    </button>
                </div>
            </div>
        </li>
    );
}
// Items.propTypes = {
//     data: PropTypes.array.isRequired,
// };
