import React, { createContext, useReducer } from "react";
import {
    initialState,
    resultReducer,
    resultState,
    rootReducer,
} from "./rootReducer";
export const ProviderContext = createContext();

export default function Provider({ children }) {
    const [state, dispatch] = useReducer(rootReducer, initialState);
    const [stateResult, dispatchResult] = useReducer(
        resultReducer,
        resultState
    );
    return (
        <ProviderContext.Provider
            value={{ state, dispatch, stateResult, dispatchResult }}
        >
            {children}
        </ProviderContext.Provider>
    );
}
