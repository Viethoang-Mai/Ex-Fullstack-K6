import { createSlice } from "@reduxjs/toolkit";
import { loginMiddleware } from "../../middlewares/LoginMiddleware";

export const loginSlice = createSlice({
    name: "login",
    initialState: {
        apiKey: localStorage.getItem("apiKey") || null,
        status: "idle",
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(loginMiddleware.pending, (state) => {
                state.status = "loading";
            })
            .addCase(loginMiddleware.fulfilled, (state, action) => {
                state.status = "success";
                state.apiKey = action.payload.apiKey;

                localStorage.setItem("apiKey", action.payload.apiKey);
            })
            .addCase(loginMiddleware.rejected, (state) => {
                state.status = "failed";
            });
    },
});

export default loginSlice.reducer;
