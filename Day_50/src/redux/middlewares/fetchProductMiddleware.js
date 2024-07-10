import { createAsyncThunk } from "@reduxjs/toolkit";
import { httpClient } from "../../config/client";
import { configs } from "../../config/config";
const { SERVER_API } = configs;
console.log(SERVER_API);
httpClient.baseUrl = SERVER_API;
export const getProducts = createAsyncThunk(
    "products/getProducts",
    async (params) => {
        const paramsStr = new URLSearchParams(params).toString();
        try {
            const { response, data } = await httpClient.get(
                `/products?${paramsStr}`
            );
            return data.data;
        } catch (error) {}
    }
);

export const getProductDetail = createAsyncThunk(
    "products/getProductDetail",
    async (id) => {
        try {
            const { response, data } = await httpClient.get(`/products/${id}`);
            return data.data;
        } catch (error) {}
    }
);
