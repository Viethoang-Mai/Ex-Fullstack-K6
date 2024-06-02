export const httpClient = {
    token: null,
    send: async function (url, method = "GET", body = null, headers = {}) {
        const initialHeaders = { "Content-Type": "application/json" };
        Object.assign(initialHeaders, headers);
        if (this.token) {
            initialHeaders["Authorization"] = `Bearer ${this.token}`;
        }
        let response = null;
        try {
            const options = {
                method,
                headers: initialHeaders,
            };
            if (body) {
                options.body = JSON.stringify(body);
            }
            response = await fetch(url, options);
            if (!response.ok) {
                throw new Error(response.statusText);
            }
            const data = await response.json();
            return { response, data };
        } catch (e) {
            console.log(e);
            return { response };
        }
    },
    get: function (url) {
        return this.send(url);
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
