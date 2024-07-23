import React, { useRef, useState } from "react";
import DeleteCard from "../../CardActions/DeleteCard";
import { useDispatch } from "react-redux";
import { editCard } from "../../../redux/redux-toolkit/slices/dataTrelloSlice";
import { SortableContext, useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

export default function Card({ task, columnId }) {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging,
    } = useSortable({ id: task?._id, data: { task, columnId } });

    const style = {
        transform: CSS.Translate.toString(transform),
        transition,
        opacity: isDragging ? 0.5 : 1,
    };
    const dispatch = useDispatch();
    const [inputValue, setInputValue] = useState(task.content);
    const handleEditCard = (e) => {
        e.preventDefault();
        dispatch(editCard({ id: task._id, content: inputValue, columnId }));
        console.log(inputValue);
    };
    return (
        <div
            className="p-4 bg-indigo-50 mt-2 rounded flex justify-between"
            {...attributes}
            {...listeners}
            style={style}
            ref={setNodeRef}
        >
            <form action="" onSubmit={handleEditCard}>
                <input
                    readOnly={true}
                    type="text"
                    value={inputValue}
                    className=" bg-transparent w-full focus:outline-none "
                    onChange={(e) => setInputValue(e.target.value)}
                    onDoubleClick={(e) => {
                        e.target.readOnly = false;
                        e.target.focus();
                        e.target.style.backgroundColor = "white";
                    }}
                />
            </form>

            <DeleteCard id={task._id} columnId={columnId} />
        </div>
    );
}
