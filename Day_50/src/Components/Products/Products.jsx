import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../../redux/middlewares/fetchProductMiddleware";
import BtnAddCart from "./BtnAddCart.jsx";
import { Link } from "react-router-dom";
import { regex } from "../../config/regex.js";
import Pagination from "../Pagination/Pagination.jsx";
import { useNavigate, useParams } from "react-router-dom";
import { configs } from "../../config/config.js";

const LIMIT = configs.LIMIT;

export default function Products() {
    const dispatch = useDispatch();
    const productList = useSelector((state) => state.product.products);
    const status = useSelector((state) => state.product.statusProduct);

    const navigate = useNavigate();

    const getData = (number) => {
        dispatch(getProducts({ page: number, limit: LIMIT }));
    };
    const { page } = useParams();
    const totalPage = useSelector((state) => state.product.totalPage);
    const prevPage = useRef(0);
    useEffect(() => {
        const pageParams = +page;

        if (!isNaN(pageParams) && pageParams > 0) {
            if (pageParams <= totalPage || totalPage === 0) {
                if (pageParams !== prevPage.current) {
                    getData(pageParams);
                    prevPage.current = pageParams;
                }
            } else {
                navigate(`/products/${totalPage}`);
                getData(totalPage);
            }
        } else {
            navigate(`/products/1`);
            getData(1);
        }
    }, [page, totalPage, navigate]);
    return (
        <div className="w-11/12 mx-auto">
            <h2 className="text-center tracking-widest font-semibold text-4xl uppercase my-5">
                Products
            </h2>
            <ul className="flex  gap-4 flex-wrap justify-center">
                {status === "loading" ? (
                    <li>Loading...</li>
                ) : (
                    productList?.map((product) => (
                        <li
                            key={product._id}
                            className=" basis-1/5 min-w-[200px] text-center  p-4 border-2 border-gray-200 rounded-md"
                        >
                            <Link
                                to={`/details/name~${regex(product.name)}/${
                                    product._id
                                }`}
                            >
                                <img
                                    src={product.image}
                                    alt={product.category}
                                    className="w-[195px] h-[177px] mx-auto object-cover rounded-md hover:transform hover:scale-105 hover:cursor-pointer transition duration-300"
                                />
                            </Link>
                            <h3 className="font-semibold text-lg my-5">
                                {product.name}
                            </h3>
                            <div className="flex justify-between px-2 font-semibold">
                                <p>$ {product.price}</p>
                                <BtnAddCart product={product} />
                            </div>
                        </li>
                    ))
                )}
            </ul>
            <Pagination currentPage={+page} totalPage={totalPage} />
        </div>
    );
}
