import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getProductDetail } from "../../redux/middlewares/fetchProductMiddleware";
import { add } from "../../redux/redux-toolkit/slices/productSlice";
import { Navigate } from "react-router-dom";
import BtnAddCart from "../Products/BtnAddCart";
export default function ProductDetail() {
    const dispatch = useDispatch();
    const productDetail = useSelector((state) => state.product.productDetail);
    const status = useSelector((state) => state.product.statusProductDetail);
    const { id, slug } = useParams();

    useEffect(() => {
        dispatch(getProductDetail(id));
    }, [id]);
    if (status === "loading") {
        return <p className="text-center">...Loading</p>;
    }
    if (!productDetail) {
        return <Navigate to="/not-found" />;
    }
    return (
        <div className="w-11/12 mx-auto mt-10">
            <li
                key={productDetail.id}
                className="flex gap-x-7 rounded items-center relative  py-4 px-8"
            >
                <Link to="/products">
                    <span className="absolute top-3 right-3 cursor-pointer text-red-500 hover:text-red-600 text-sm font-medium">
                        {"<-- Back"}
                    </span>
                </Link>
                <div className="">
                    <img
                        src={productDetail.image}
                        alt={productDetail.category}
                        className="w-[600px] h-[450px]  object-cover rounded shadow-lg shadow-gray-500/50"
                    />
                </div>
                <div className="max-w-[50%] box-shadow ">
                    <h4 className="font-semibold text-2xl text-blue-600 text-center">
                        {productDetail.brand}
                    </h4>
                    <h5 className="font-medium text-xl text-center mt-5">
                        {productDetail.name}
                    </h5>
                    <p className=" font-medium text-lg mt-2">
                        "{productDetail.description}"
                    </p>
                    <p className=" text-left mt-10">
                        {" "}
                        Đơn giá: ${productDetail.price}
                    </p>
                    <p className=" text-left">
                        Sản phẩm còn trong kho: {productDetail.quantity}
                    </p>

                    <div className="absolute bottom-7 right-7">
                        <BtnAddCart product={productDetail} />
                    </div>
                </div>
            </li>
        </div>
    );
}
