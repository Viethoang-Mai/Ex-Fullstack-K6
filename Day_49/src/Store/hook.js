import React from "react";
import { useContext } from "react";
import { ProviderContext } from "./Provider";
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
export const useDispatchResult = () => {
    const { dispatchResult } = useContext(ProviderContext);

    return dispatchResult;
};

export const useSelectorResult = (cb) => {
    if (typeof cb !== "function") {
        throw new Error("cb must be a function");
    }
    const { stateResult } = useContext(ProviderContext);
    return cb(stateResult);
};
