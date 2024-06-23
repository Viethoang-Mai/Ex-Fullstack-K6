import React from "react";
import PropTypes from "prop-types";
import { httpClient } from "../../configs/client";
import { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export default function Items({
    todo,
    id,
    isCompleted,
    setListTodos,
    listTodos,
}) {
    const [isEdit, setIsEdit] = useState(null);
    const [prevState, setPrevState] = useState({ todo, isCompleted });
    const deleteTodo = async (id) => {
        const { response, data } = await httpClient.delete(`/todos/${id}`);
        if (response.ok) {
            setListTodos((listTodos) =>
                listTodos.filter((item) => item._id !== id)
            );
            toast.success("Xoá thành công");
        }
    };
    const handleDelete = (e) => {
        const id = e.target.dataset.id;
        deleteTodo(id);
    };
    const updateTodo = async (id, todo) => {
        const { response, data } = await httpClient.patch(
            `/todos/${id}`,
            {
                todo,
                isCompleted,
            },
            {}
        );
        if (response.ok) {
            setListTodos((listTodos) =>
                listTodos.map((item) => {
                    if (item._id === id) {
                        return {
                            ...item,
                            todo: data.data.todo,
                            isCompleted: data.data.isCompleted,
                        };
                    }
                    return item;
                })
            );
            toast.success("Cập nhật thành công");
        }
    };
    const handleUpdate = (e) => {
        const id = e.target.dataset.id;
        if (!todo.trim().length) {
            return alert("Không được để trống");
        }
        updateTodo(id, todo);
        setIsEdit(null);
    };
    const handleEdit = (id) => {
        setIsEdit((isEdit) => (isEdit === id ? null : id));
        console.log(123);
    };
    const handleExit = (id) => {
        setListTodos((listTodos) =>
            listTodos.map((item) => {
                if (item._id === id) {
                    return {
                        ...item,
                        todo: prevState.todo,
                        isCompleted: prevState.isCompleted,
                    };
                }
                return item;
            })
        );
        setIsEdit(null);
    };
    return (
        <li
            key={id}
            data-id={id}
            className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 flex flex-col my-2"
        >
            <input
                className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline  "
                value={todo}
                autoFocus={isEdit === id ? true : false}
                readOnly={!isEdit ? "readOnly" : ""}
                style={{
                    textDecoration: isCompleted ? "line-through" : "none",
                }}
                onChange={(e) => {
                    setListTodos((listTodos) =>
                        listTodos.map((item) => {
                            if (item._id === id) {
                                return {
                                    ...item,
                                    todo: e.target.value,
                                };
                            }
                            return item;
                        })
                    );
                }}
                // onFocus={(e) => {
                //     setListTodos((listTodos) =>
                //         listTodos.map((item) => {
                //             if (item._id === id) {
                //                 return {
                //                     ...item,
                //                     todo: e.target.value,
                //                 };
                //             }
                //             return item;
                //         })
                //     );
                // }}
            ></input>
            <div className="flex items-center justify-between mt-4">
                {isEdit === id && (
                    <div className="flex items-center">
                        <label htmlFor={id} className="mr-2">
                            {!isCompleted ? "Not Completed" : "Completed"}
                        </label>
                        <input
                            id={id}
                            type="checkbox"
                            className="form-checkbox h-5 w-5 text-gray-600 "
                            checked={isCompleted}
                            onChange={(e) => {
                                setListTodos((listTodos) =>
                                    listTodos.map((item) => {
                                        if (item._id === id) {
                                            return {
                                                ...item,
                                                isCompleted: e.target.checked,
                                            };
                                        }
                                        return item;
                                    })
                                );
                            }}
                        />
                    </div>
                )}
                <div className="flex items-center">
                    {isEdit && (
                        <button
                            onClick={() => {
                                handleExit(id);
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
Items.propTypes = {
    arr: PropTypes.array.isRequired,
};
