import { createAsyncThunk } from "@reduxjs/toolkit";
import { httpClient } from "../../Helpers/client";
import { SERVER_API } from "../../Helpers/config";
httpClient.baseUrl = SERVER_API;
const resolveData = (data) => {
    if (data) {
        const columns = data.columns;
        const tasks = data.tasks;
        return columns.map((col) => {
            return {
                ...col,
                tasks: tasks
                    .filter((task) => task.column === col.column)
                    .map((task) => {
                        return {
                            ...task,
                            columnName: col.columnName,
                        };
                    }),
            };
        });
    }
};
export const loginMiddleware = createAsyncThunk("login", async (email) => {
    const { response, data } = await httpClient.get(`/api-key?email=${email}`);
    return data.data;
});

export const getTasks = createAsyncThunk("getTasks", async (key) => {
    httpClient.apiKey = key;
    const { response, data } = await httpClient.get("/tasks");
    return resolveData(data.data);
});
export const postTask = createAsyncThunk("postTask", async (data) => {
    httpClient.apiKey = localStorage.getItem("apiKey");
    const { response, data: task } = await httpClient.post("/tasks", data);
    console.log(resolveData(task.data));
    return resolveData(task.data);
});
