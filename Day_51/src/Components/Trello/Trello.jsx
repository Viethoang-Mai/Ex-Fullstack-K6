import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getTasks, postTask } from "../../redux/middlewares/LoginMiddleware";
import {
    addColumn,
    dragEnd,
} from "../../redux/redux-toolkit/slices/dataTrelloSlice";
import {
    DndContext,
    PointerSensor,
    useSensor,
    useSensors,
    DragOverlay,
    closestCorners,
} from "@dnd-kit/core";
import {
    SortableContext,
    arrayMove,
    horizontalListSortingStrategy,
} from "@dnd-kit/sortable";
import Card from "./Card/Card";
import Column from "./Column/Column";
import { cloneDeep } from "lodash";
export default function Trello() {
    const pointerSensor = useSensor(PointerSensor, {
        activationConstraint: {
            distance: 10,
        },
    });
    const ACTIVE_DRAG_ITEM_TYPE = {
        COLUMN: "ACTIVE_DRAG_ITEM_TYPE_COLUMN",
        CARD: "ACTIVE_DRAG_ITEM_TYPE_CARD",
    };
    const sensors = useSensors(pointerSensor);
    const apiKey = useSelector((state) => state.login.apiKey);
    const columns = useSelector((state) => state.dataTrello.columns);
    const dataUpdate = useSelector((state) => state.dataTrello.dataUpdate);
    const [orderColumns, setOrderColumns] = useState(
        JSON.parse(localStorage.getItem("columns")) || []
    );
    const [activeDragItemId, setActiveDragItemId] = useState(null);
    const [activeDragItemType, setActiveDragItemType] = useState(null);
    const [activeDragItemData, setActiveDragItemData] = useState(null);
    const [oldColumn, setOldColumn] = useState(null);

    const dispatch = useDispatch();

    const handleAddColumn = () => {
        dispatch(addColumn());
    };
    const handleDragStart = (e) => {
        setActiveDragItemId(e?.active?.id);
        setActiveDragItemType(
            e.active.data?.current?.columnId
                ? "ACTIVE_DRAG_ITEM_TYPE_CARD"
                : "ACTIVE_DRAG_ITEM_TYPE_COLUMN"
        );
        setActiveDragItemData(e?.active?.data?.current);
        if (e.active.data?.current?.columnId) {
            setOldColumn(findColumnByCardId(e?.active?.id));
        }
    };
    const findColumnByCardId = (id) => {
        return orderColumns.find((column) =>
            column.tasks.map((task) => task._id)?.includes(id)
        );
    };
    const handleDragOver = (e) => {
        if (activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.COLUMN) {
            return;
        }
        const { active, over } = e;
        if (!over || !active) return;
        const {
            id: activeDraggingCardId,
            data: { current: activeDraggingCartData },
        } = active;
        console.log(activeDraggingCartData);
        const { id: overCardId } = over;
        const activeColumn = findColumnByCardId(activeDraggingCardId);
        const overColumn = findColumnByCardId(overCardId);
        console.log(activeColumn, overColumn);
        if (!activeColumn || !overColumn) return;

        if (activeColumn._id !== overColumn._id) {
            setOrderColumns((prevColumns) => {
                const overCartIndex = overColumn?.tasks?.findIndex(
                    (task) => task._id === overCardId
                );
                let newCardIndex;
                const isBelowOverItem =
                    active.rect.current.translated &&
                    active.rect.current.translated.top >
                        over.rect.top + over.rect.height;
                const modifier = isBelowOverItem ? 1 : 0;
                newCardIndex =
                    overCartIndex >= 0
                        ? overCartIndex + modifier
                        : overColumn?.tasks?.length + 1;
                const nextColumns = cloneDeep(prevColumns);
                const nextActiveColumn = nextColumns.find(
                    (column) => column._id === activeColumn._id
                );
                const nextOverColumn = nextColumns.find(
                    (column) => column._id === overColumn._id
                );
                if (nextActiveColumn) {
                    nextActiveColumn.tasks = nextActiveColumn.tasks.filter(
                        (task) => task._id !== activeDraggingCardId
                    );
                }
                if (nextOverColumn) {
                    nextOverColumn.tasks = nextOverColumn.tasks.filter(
                        (task) => task._id !== activeDraggingCardId
                    );
                    const rebuildTasks = {
                        ...activeDraggingCartData,
                        columnId: nextOverColumn._id,
                        task: {
                            ...activeDraggingCartData.task,

                            column: nextOverColumn.column,
                            columnName: nextOverColumn.columnName,
                        },
                    };

                    nextOverColumn.tasks = nextOverColumn.tasks.toSpliced(
                        newCardIndex,
                        0,
                        rebuildTasks.task
                    );
                }

                return nextColumns;
            });
        }
    };

    const handleDragEnd = (e) => {
        const { active, over } = e;
        if (activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.CARD) {
            const {
                id: activeDraggingCardId,
                data: { current: activeDraggingCartData },
            } = active;
            const { id: overCardId } = over;
            const activeColumn = findColumnByCardId(activeDraggingCardId);
            const overColumn = findColumnByCardId(overCardId);
            console.log(activeColumn, overColumn);
            if (!activeColumn || !overColumn) return;
            if (oldColumn._id !== overColumn._id) {
                setOrderColumns((prevColumns) => {
                    const overCartIndex = overColumn?.tasks?.findIndex(
                        (task) => task._id === overCardId
                    );
                    let newCardIndex;
                    const isBelowOverItem =
                        active.rect.current.translated &&
                        active.rect.current.translated.top >
                            over.rect.top + over.rect.height;
                    const modifier = isBelowOverItem ? 1 : 0;
                    newCardIndex =
                        overCartIndex >= 0
                            ? overCartIndex + modifier
                            : overColumn?.tasks?.length + 1;
                    const nextColumns = cloneDeep(prevColumns);
                    const nextActiveColumn = nextColumns.find(
                        (column) => column._id === activeColumn._id
                    );
                    const nextOverColumn = nextColumns.find(
                        (column) => column._id === overColumn._id
                    );
                    if (nextActiveColumn) {
                        nextActiveColumn.tasks = nextActiveColumn.tasks.filter(
                            (task) => task._id !== activeDraggingCardId
                        );
                    }
                    if (nextOverColumn) {
                        nextOverColumn.tasks = nextOverColumn.tasks.filter(
                            (task) => task._id !== activeDraggingCardId
                        );
                        const rebuildTasks = {
                            ...activeDraggingCartData,
                            columnId: nextOverColumn._id,
                            task: {
                                ...activeDraggingCartData.task,

                                column: nextOverColumn.column,
                                columnName: nextOverColumn.columnName,
                            },
                        };

                        nextOverColumn.tasks = nextOverColumn.tasks.toSpliced(
                            newCardIndex,
                            0,
                            rebuildTasks.task
                        );
                    }
                    dispatch(dragEnd(nextColumns));
                    return nextColumns;
                });
            } else {
                const oldCardIndex = oldColumn.tasks.findIndex(
                    (task) => task._id === activeDragItemId
                );
                const newCardIndex = overColumn.tasks.findIndex(
                    (task) => task._id === overCardId
                );
                const dndOrderedCards = arrayMove(
                    oldColumn?.tasks,
                    oldCardIndex,
                    newCardIndex
                );
                setOrderColumns((prevColumns) => {
                    const nextColumns = cloneDeep(prevColumns);
                    const targetColumn = nextColumns.find(
                        (column) => column._id === overColumn._id
                    );
                    targetColumn.tasks = dndOrderedCards;

                    console.log(nextColumns);

                    dispatch(dragEnd(nextColumns));

                    return nextColumns;
                });
            }
        }
        if (activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.COLUMN) {
            if (active.id !== over.id) {
                const oldColumnIndex = orderColumns.findIndex(
                    (column) => column._id === active.id
                );
                const newColumnIndex = orderColumns.findIndex(
                    (column) => column._id === over.id
                );
                const dndOrderedColumns = arrayMove(
                    orderColumns,
                    oldColumnIndex,
                    newColumnIndex
                );
                setOrderColumns(dndOrderedColumns);
                console.log(dndOrderedColumns);
                dispatch(dragEnd(dndOrderedColumns));
            }
        }
        setActiveDragItemData(null);
        setActiveDragItemId(null);
        setActiveDragItemType(null);
        setOldColumn(null);
    };
    useEffect(() => {
        dispatch(getTasks(apiKey));
    }, [apiKey]);
    useEffect(() => {
        setOrderColumns(columns);
    }, [columns]);

    useEffect(() => {
        if (dataUpdate.length > 0) {
            console.log(dataUpdate);
            dispatch(postTask(dataUpdate));
        }
    }, [dataUpdate]);

    return (
        <DndContext
            onDragEnd={handleDragEnd}
            onDragOver={handleDragOver}
            onDragStart={handleDragStart}
            sensors={sensors}
            collisionDetection={closestCorners}
        >
            <SortableContext
                items={orderColumns?.map((column) => column._id)}
                strategy={horizontalListSortingStrategy}
            >
                <div className="flex w-screen gap-x-10  h-screen bg-blue-300  px-10 overflow-y-auto items-center">
                    {orderColumns?.map((column, index) => (
                        <Column key={column._id} column={column} />
                    ))}

                    <DragOverlay>
                        {!activeDragItemType && null}
                        {activeDragItemType ===
                            ACTIVE_DRAG_ITEM_TYPE.COLUMN && (
                            <Column column={activeDragItemData} />
                        )}
                        {activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.CARD && (
                            <Card
                                task={activeDragItemData.task}
                                columnId={activeDragItemData.columnId}
                            />
                        )}
                    </DragOverlay>
                    <div
                        onClick={handleAddColumn}
                        className="text-sky-600 rounded-lg  min-w-[300px] h-fit text-xl font-semibold bg-gray-200/50 p-4 rounded-t-lg  cursor-pointer"
                    >
                        <i class="fa-solid fa-circle-plus"></i> Add Column
                    </div>
                </div>
            </SortableContext>
        </DndContext>
    );
}
