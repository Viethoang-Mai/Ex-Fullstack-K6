import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteCard } from "../../redux/redux-toolkit/slices/dataTrelloSlice";
import { postTask } from "../../redux/middlewares/LoginMiddleware";
export default function DeleteCard({ id, columnId }) {
    const dispatch = useDispatch();
    const body = [];
    const handleDeleteCard = () => {
        dispatch(deleteCard({ id, columnId }));
    };
    return (
        <div onClick={handleDeleteCard} className="cursor-pointer">
            <i className="fa-solid fa-trash"></i>
        </div>
    );
}
