import React, { createContext, useReducer } from "react";
import rootReducer from "./rootReducer";
import { initialState, rootReducer } from "./rootReducer";
const ProviderContext = createContext();

export default function Provider({ children }) {
    const [state, dispatch] = useReducer(rootReducer, initialState);
    return (
        <ProviderContext.Provider value={{ state, dispatch }}>
            {children}
        </ProviderContext.Provider>
    );
}
