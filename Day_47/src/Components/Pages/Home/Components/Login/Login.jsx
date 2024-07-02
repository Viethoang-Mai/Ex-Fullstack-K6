import { httpClient } from "../../../../configs/client";
import { SERVER_API } from "../../../../configs/config";
import { regexEmail } from "../../../../Regex/regex";
import { useContext } from "react";
import { AppContext } from "../../../../../App";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
httpClient.baseUrl = SERVER_API;
export default function Login() {
    const { setApiKey, setLoading, setNameUser, nameUser, setCarts } =
        useContext(AppContext);

    const getApiKey = (email) => {
        setLoading(true);

        try {
            if (!regexEmail(email)) {
                throw new Error("Email không đúng định dạng");
            }

            email = email.replace("@", "%40");
            httpClient
                .get(`/api-key?email=${email}`)
                .then(({ data, response }) => {
                    if (response.ok) {
                        const Api = data.data.apiKey;
                        getProfile(Api);
                    }
                });
            setLoading(false);
        } catch (error) {
            toast.error(error.message);
        }
    };
    const getProfile = async (Api) => {
        httpClient.apiKey = Api;

        const { response, data } = await httpClient.get(
            `/users/profile`,
            null,
            {}
        );
        if (response.ok) {
            if (nameUser !== data.data.emailId.name) {
                localStorage.removeItem("carts");
                setCarts([]);
            }
            localStorage.setItem("name_user", data.data.emailId.name);
            setNameUser(data.data.emailId.name);
            localStorage.setItem("api_key", Api);

            setApiKey(Api);
        }
        setLoading(false);
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        const dataInput = e.target.email.value;
        getApiKey(dataInput);
    };

    return (
        <div className="w-screen h-screen bg-slate-300 fixed inset-0 flex items-center justify-center">
            <form
                action=""
                className="bg-white p-6 rounded shadow-md"
                onSubmit={handleSubmit}
            >
                <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700"
                >
                    Email
                </label>
                <input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="example@gmail.com"
                    required
                    className="mt-1 block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
                <button
                    type="click"
                    className="mt-3 w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                    Submit
                </button>
            </form>
        </div>
    );
}
