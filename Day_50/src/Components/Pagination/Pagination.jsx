import React, { useEffect, useRef } from "react";
import ReactPaginate from "react-paginate";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import "./Pagination.css";

export default function Pagination() {
    const navigate = useNavigate();

    const totalPage = useSelector((state) => state.product.totalPage);

    const handlePageClick = (e) => {
        navigate(`/products/${e.selected + 1}`);
    };
    return (
        <div className="pagination">
            <ReactPaginate
                breakLabel="..."
                nextLabel={<i class="fa-solid fa-chevron-right"></i>}
                onPageChange={handlePageClick}
                pageRangeDisplayed={3}
                pageCount={totalPage}
                previousLabel={<i class="fa-solid fa-chevron-left"></i>}
                renderOnZeroPageCount={null}
                activeLinkClassName="active"
            />
        </div>
    );
}
