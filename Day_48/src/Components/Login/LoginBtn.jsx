import { useAuth0 } from "@auth0/auth0-react";
import React from "react";

const LoginButton = () => {
    const { loginWithPopup } = useAuth0();

    return (
        <button
            className="w-full text-center mt-5 text-white bg-amber-400 hover:text-white border-2 border-amber-400  rounded-md px-4 py-2 hover:bg-amber-300"
            onClick={loginWithPopup}
        >
            Log In
        </button>
    );
};

export default LoginButton;
