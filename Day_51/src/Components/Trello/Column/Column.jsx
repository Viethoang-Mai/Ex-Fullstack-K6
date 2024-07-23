import React, { useEffect, useRef, useState, useCallback } from "react";
import Card from "../Card/Card";
import { useSelector, useDispatch } from "react-redux";
import { debounce } from "lodash";
import {
    addCard,
    deleteColumn,
    editColumnName,
} from "../../../redux/redux-toolkit/slices/dataTrelloSlice";
import {
    SortableContext,
    useSortable,
    verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
export default function Column({ column: dataColumn }) {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging,
    } = useSortable({ id: dataColumn._id, data: { ...dataColumn } });

    const style = {
        transform: CSS.Translate.toString(transform),
        transition,
        opacity: isDragging ? 0.5 : 1,
    };
    const inputRef = useRef(null);
    const [inputValue, setInputValue] = useState(dataColumn.columnName);
    const dispatch = useDispatch();
    // console.log(dataColumn);

    const handleRemoveColumn = () => {
        dispatch(deleteColumn(dataColumn._id));
    };
    const handleAddTask = (e) => {
        e.stopPropagation();
        if (inputRef.current) {
            inputRef.current.focus();
        }
        dispatch(addCard(dataColumn._id));
    };
    const handleEditColumn = (e) => {
        e.preventDefault();
        dispatch(
            editColumnName({ column: dataColumn.column, name: inputValue })
        );
    };

    return (
        <div
            ref={setNodeRef}
            style={style}
            {...attributes}
            {...listeners}
            className=" bg-violet-300 rounded-lg  min-w-[300px] h-[350px]  relative pb-5 "
        >
            <div className="text-xl font-semibold bg-slate-100 p-4 rounded-t-lg relative border-b-2  border-gray-500/70">
                <form action="" onSubmit={handleEditColumn}>
                    <input
                        readOnly={true}
                        type="text"
                        className="bg-transparent outline-none w-full select-none"
                        value={inputValue}
                        onChange={(e) => {
                            setInputValue(e.target.value);
                        }}
                        onDoubleClick={(e) => {
                            e.target.readOnly = false;

                            e.target.focus();
                            e.target.style.backgroundColor = "white";
                        }}
                    ></input>
                </form>

                <span
                    onClick={handleRemoveColumn}
                    className="absolute top-1/2 right-5 text-red-400 text-md hover:text-red-600 cursor-pointer transform -translate-y-1/2"
                >
                    <i className="fa-solid fa-trash"></i>
                </span>
            </div>

            <SortableContext
                items={dataColumn.tasks.map((task) => task._id)}
                id={dataColumn._id}
                strategy={verticalListSortingStrategy}
            >
                <div className="overflow-y-auto h-[240px] px-2">
                    {dataColumn.tasks?.map((task, index) => {
                        return (
                            <Card
                                key={task._id}
                                task={task}
                                columnId={dataColumn._id}
                                columnName={dataColumn.columnName}
                            />
                        );
                    })}
                </div>
            </SortableContext>
            <span
                onClick={handleAddTask}
                className="absolute -bottom-[10px] left-1/2 -translate-x-1/2  text-md hover:text-blue-500 cursor-pointer transform -translate-y-1/2 bg-white/50 px-2 py-1 rounded "
            >
                Add task
            </span>
        </div>
    );
}
