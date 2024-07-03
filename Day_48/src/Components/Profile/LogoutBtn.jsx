import { useAuth0 } from "@auth0/auth0-react";
import React, { useContext } from "react";
import { AppContext } from "../../App";
const LogoutButton = () => {
    const { logout } = useAuth0();
    const { setLoading, toast } = useContext(AppContext);
    const handleLogout = () => {
        setLoading(true);
        setTimeout(() => {
            logout({ returnTo: window.location.origin });
            toast.success("Đăng xuất thành công");
            setLoading(false);
        }, 1500);
    };

    return (
        <button
            onClick={handleLogout}
            className="w-full text-center mt-5 text-red-600 hover:text-red-500 border-2 border-red-600  rounded-md px-4 py-2 hover:bg-red-100"
        >
            Log Out
        </button>
    );
};

export default LogoutButton;
