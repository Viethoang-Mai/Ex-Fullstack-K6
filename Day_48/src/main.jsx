import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./assets/style.css";
// import Provider from "./Store/Provider.jsx";
import { Auth0Provider } from "@auth0/auth0-react";
const domain = process.env.REACT_APP_AUTH0_DOMAIN;
const clientId = process.env.REACT_APP_AUTH0_CLIENT_ID;

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <Auth0Provider
            domain={domain}
            clientId={clientId}
            redirect_uri={window.location.origin}
        >
            <App />
        </Auth0Provider>
    </React.StrictMode>
);
