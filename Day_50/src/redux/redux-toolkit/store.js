import { productSlice } from "./slices/productSlice";
import { configureStore } from "@reduxjs/toolkit";

export const store = configureStore({
    reducer: {
        product: productSlice.reducer,
    },
});
