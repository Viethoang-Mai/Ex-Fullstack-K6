import React from "react";
import Items from "./Items";

export default function ListItem({ data, setListTodos, lisTodos }) {
    return (
        <ul className="list-disc w-full max-w-3xl flex flex-col gap-4">
            {Array.isArray(data) && data.length ? (
                data.map(({ todo, isCompleted, _id: id }) => {
                    return (
                        <Items
                            todo={todo}
                            isCompleted={isCompleted}
                            id={id}
                            setListTodos={setListTodos}
                            lisTodos={lisTodos}
                        />
                    );
                })
            ) : (
                <li className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 flex flex-col my-2">
                    Không có todo
                </li>
            )}
        </ul>
    );
}
