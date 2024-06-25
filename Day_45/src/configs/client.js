import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const httpClient = {
    apiKey: null,
    baseUrl: null,
    send: async function (path, method = "GET", body = null, headers = {}) {
        let response = null;
        try {
            if (!this.baseUrl) {
                throw new Error("Vui lòng cập nhật baseUrl");
            }
            const url = this.baseUrl + path;
            const initialHeaders = { "Content-Type": "application/json" };
            Object.assign(initialHeaders, headers);
            if (this.apiKey) {
                initialHeaders["X-Api-Key"] = this.apiKey;
            }

            const options = {
                method,
                headers: initialHeaders,
            };
            if (body) {
                options.body = JSON.stringify(body);
            }
            response = await fetch(url, options);
            const data = await response.json();
            console.log(data, response);
            if (!response.ok) {
                if (data.code === 401) {
                    localStorage.removeItem("api_key");
                    setTimeout(() => {
                        window.location.reload();
                    }, 2000);
                    throw new Error(data.message);
                }
                throw new Error(data.message);
            }

            return { response, data };
        } catch (e) {
            toast.error(e.message);
            setTimeout(() => {
                window.location.reload();
            }, 2000);

            return { response };
        }
    },

    get: function (url, headers = {}) {
        return this.send(url, "GET", null, headers);
    },
    post: function (url, body, headers = {}) {
        return this.send(url, "POST", body, headers);
    },
    put: function (url, body, headers = {}) {
        return this.send(url, "PUT", body, headers);
    },
    patch: function (url, body, headers = {}) {
        return this.send(url, "PATCH", body, headers);
    },
    delete: function (url, headers = {}) {
        return this.send(url, "DELETE", null, headers);
    },
};

/*
const client = httpClient();
const users = client.get(url);
client.post(url, body)
client.put(url, body)
client.patch(url, body)
client.delete(url)
*/
