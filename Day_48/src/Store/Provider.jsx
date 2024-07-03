import React, { createContext, useReducer } from "react";
import { initialState, rootReducer } from "./rootReducer";
export const ProviderContext = createContext();
import { Auth0Provider } from "@auth0/auth0-react";
const domain = process.env.VITE_REACT_APP_AUTH0_DOMAIN;
const clientId = process.env.VITE_REACT_APP_AUTH0_CLIENT_ID;

export default function Provider({ children }) {
    const [state, dispatch] = useReducer(rootReducer, initialState);
    console.log(initialState);
    return (
        <ProviderContext.Provider value={{ state, dispatch }}>
            <Auth0Provider
                domain={domain}
                clientId={clientId}
                redirect_uri={window.location.origin}
            >
                {children}
            </Auth0Provider>
        </ProviderContext.Provider>
    );
}
