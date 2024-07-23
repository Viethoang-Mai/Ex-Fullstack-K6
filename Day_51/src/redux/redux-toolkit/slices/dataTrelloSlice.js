import { createSlice } from "@reduxjs/toolkit";
import { getTasks, postTask } from "../../middlewares/LoginMiddleware";
import { v4 as uuidv4 } from "uuid";
const updateDataUpdate = (columns) => {
    return columns.flatMap((col) =>
        col.tasks.map((task) => ({
            content: task.content,
            column: col.column,
            columnName: col.columnName,
        }))
    );
};
export const dataTrelloSlice = createSlice({
    name: "dataTrello",
    initialState: {
        status: "idle",
        columns: JSON.parse(localStorage.getItem("columns")) || [],
        dataUpdate: [],
    },
    reducers: {
        addCard: (state, action) => {
            state.columns.forEach((col) => {
                if (col._id === action.payload) {
                    col.tasks.push({
                        _id: uuidv4(),
                        content: "Task " + (col.tasks.length + 1),
                        column: col.column,
                        columnName: col.columnName,
                    });
                }
            });
            state.dataUpdate = updateDataUpdate(state.columns);
        },
        deleteCard: (state, action) => {
            state.columns = state.columns.map((col) => {
                if (col._id === action.payload.columnId) {
                    return {
                        ...col,
                        tasks: col.tasks.filter(
                            (task) => task._id !== action.payload.id
                        ),
                    };
                }
                return col;
            });

            state.dataUpdate = updateDataUpdate(state.columns);
        },
        editCard: (state, action) => {
            state.columns.forEach((col) => {
                if (col._id === action.payload.columnId) {
                    col.tasks.forEach((task) => {
                        if (task._id === action.payload.id) {
                            task.content = action.payload.content;
                        }
                    });
                }
            });

            state.dataUpdate = updateDataUpdate(state.columns);
        },
        addColumn: (state, action) => {
            let lengthName = state.columns.length;
            console.log(lengthName);
            state.columns.forEach((col) => {
                console.log(col.column);
                if (+col.column > +state.columns.length) {
                    lengthName = +col.column;
                }
            });

            console.log(lengthName);
            state.columns.push({
                _id: uuidv4(),
                column: lengthName + 1,
                columnName: " Column " + (lengthName + 1),
                tasks: [
                    {
                        _id: uuidv4(),
                        content: "Task 1",
                        column: "column" + (lengthName + 1),
                        columnName: " Column " + (lengthName + 1),
                    },
                ],
            });

            state.dataUpdate = updateDataUpdate(state.columns);
        },
        deleteColumn: (state, action) => {
            state.columns = state.columns.filter(
                (col) => col._id !== action.payload
            );
            console.log(state.columns);

            if (state.columns.length !== 0) {
                state.dataUpdate = updateDataUpdate(state.columns);
            }

            // localStorage.setItem("tasks", JSON.stringify(state.tasks));
        },
        editColumnName: (state, action) => {
            state.columns = state.columns.map((col) => {
                if (col.column === action.payload.column) {
                    col.columnName = action.payload.name;
                }
                return col;
            });

            state.dataUpdate = updateDataUpdate(state.columns);
        },
        dragEnd: (state, action) => {
            console.log(action.payload);

            state.dataUpdate = updateDataUpdate(action.payload);
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getTasks.pending, (state) => {
                state.status = "loading";
            })
            .addCase(getTasks.fulfilled, (state, action) => {
                state.status = "success";
                state.columns = action.payload;
                localStorage.setItem("columns", JSON.stringify(state.columns));
            })
            .addCase(getTasks.rejected, (state) => {
                state.status = "failed";
            });
        builder
            .addCase(postTask.fulfilled, (state, action) => {
                state.status = "success";
                state.columns = action.payload;
                localStorage.setItem("columns", JSON.stringify(state.columns));
            })
            .addCase(postTask.rejected, (state) => {
                state.status = "failed";
            })
            .addCase(postTask.pending, (state) => {
                state.status = "loading";
            });
    },
});
export const {
    addCard,
    deleteCard,
    editCard,
    deleteColumn,
    addColumn,
    editColumnName,
    dragEnd,
} = dataTrelloSlice.actions;
