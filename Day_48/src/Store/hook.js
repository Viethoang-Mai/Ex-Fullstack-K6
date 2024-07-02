import React from "react";
import { useContext } from "react";
export const useDispatch = () => {
    const { dispatch } = useContext(ProviderContext);

    return dispatch;
};

export const useSelector = (cb) => {
    if (typeof cb !== "function") {
        throw new Error("cb must be a function");
    }
    const { state } = useContext(ProviderContext);
    return cb(state);
};
