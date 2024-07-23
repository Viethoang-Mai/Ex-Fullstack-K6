import React from "react";
import Login from "../Login/Login";
import Trello from "../Trello/Trello";
import { useSelector } from "react-redux";

export default function Auth() {
    const apiKey = useSelector((state) => state.login.apiKey);
    return <div>{apiKey ? <Trello /> : <Login />}</div>;
}
