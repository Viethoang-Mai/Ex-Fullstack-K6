import { loginSlice } from "./slices/loginSlice";
import { dataTrelloSlice } from "./slices/dataTrelloSlice";
import { configureStore } from "@reduxjs/toolkit";

export const store = configureStore({
    reducer: {
        login: loginSlice.reducer,
        dataTrello: dataTrelloSlice.reducer,
    },
});
