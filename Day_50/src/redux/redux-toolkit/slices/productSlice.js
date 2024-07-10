import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import {
    getProducts,
    getProductDetail,
} from "../../middlewares/fetchProductMiddleware";

export const productSlice = createSlice({
    name: "products",
    initialState: {
        products: [],
        productDetail: {},
        statusProduct: "idle",
        statusProductDetail: "idle",
        cart: JSON.parse(localStorage.getItem("cart")) || [],
        totalPage: 0,
    },
    reducers: {
        add: (state, action) => {
            console.log(action.payload);
            const findCart = state.cart.find(
                (item) => item.id === action.payload.id
            );

            if (findCart) {
                findCart.quantity = findCart.quantity + 1;
                findCart.restQuantity = findCart.restQuantity - 1;
            } else {
                state.cart = [
                    ...state.cart,
                    { ...action.payload, quantity: 1 },
                ];
                console.log(state.cart);
            }
            toast.success("Thêm sản phẩm thành công");
            localStorage.setItem("cart", JSON.stringify(state.cart));
        },
        decrease: (state, action) => {
            console.log(action.payload);
            const findCart = state.cart.find(
                (item) => item.id === action.payload
            );
            if (findCart) {
                findCart.quantity = findCart.quantity - 1;
                findCart.restQuantity = findCart.restQuantity + 1;
            }
            localStorage.setItem("cart", JSON.stringify(state.cart));
        },
        increase: (state, action) => {
            console.log(action.payload);
            const findCart = state.cart.find(
                (item) => item.id === action.payload
            );
            if (findCart) {
                findCart.quantity = findCart.quantity + 1;
                findCart.restQuantity = findCart.restQuantity - 1;
            }
            localStorage.setItem("cart", JSON.stringify(state.cart));
        },

        remove: (state, action) => {
            if (confirm("Bạn có muốn xóa sản phẩm này?")) {
                // const findCart = state.cart.find(
                //     (item) => item.id === action.payload
                // );
                // findCart.restQuantity = findCart.findCart.quantityProduct;

                state.cart = state.cart.filter(
                    (item) => item.id !== action.payload
                );
            }

            toast.success("Xóa sản phẩm thành công");

            localStorage.setItem("cart", JSON.stringify(state.cart));
        },
        checkOut: (state, action) => {
            state.cart = [];
            toast.success("Thanh toán thành công");
            localStorage.setItem("cart", JSON.stringify(state.cart));
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getProducts.pending, (state, action) => {
                state.statusProduct = "loading";
            })
            .addCase(getProducts.fulfilled, (state, action) => {
                state.products = action.payload.listProduct;
                state.statusProduct = "fulfilled";
                state.totalPage = action.payload.totalPage;
            })
            .addCase(getProducts.rejected, (state, action) => {
                state.statusProduct = "rejected";
            })
            .addCase(getProductDetail.pending, (state, action) => {
                state.statusProductDetail = "loading";
            })
            .addCase(getProductDetail.rejected, (state, action) => {
                state.statusProductDetail = "rejected";
            })
            .addCase(getProductDetail.fulfilled, (state, action) => {
                state.productDetail = action.payload;
                state.statusProductDetail = "fulfilled";
            });
    },
});

export const { add, decrease, increase, remove, checkOut } =
    productSlice.actions;
console.log(typeof productSlice);
