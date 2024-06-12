import { config } from "./config.js";
const { SERVER_API } = config;
import { httpClient } from "./client.js";
import { getTokenStorage, setTokenStorage } from "./storage.js";
import { handleDatePicker } from "./datepicker.js";
import {
    toLogin,
    toRegister,
    userAction,
    getAvtName,
    handleDate,
    renderBlog,
} from "./layout.js";
httpClient.baseUrl = SERVER_API;
const root = document.querySelector("#root");
const feed = root.querySelector(".news-feed");
const feature = root.querySelector(".feature");

let isToLogin;
let isSignUp;

const query = {
    _limit: 15,
    _page: 1,
    _order: "desc",
};
const getBlogs = async () => {
    try {
        const keyword = new URLSearchParams(query).toString();
        const { response, data } = await httpClient.get(`/blogs?${keyword}`);
        if (!response.ok) {
            throw new Error("Khong lay duoc blog");
        }
        news(data.data);
    } catch (error) {}
};
const getBlog = async (id) => {
    try {
        console.log(123);
        const { response, data } = await httpClient.get(`/blogs/${id}`);
        if (!response.ok) {
            return alert("có lỗi khi tải bài viết");
        }
        feature.innerHTML = renderBlog(data.data);
        feed.innerHTML = "";
    } catch (error) {}
};
const news = (data) => {
    const html = `${data
        .map(
            ({
                userId: { name },
                title,
                timeUp,
                content,
                _id: idBlog,
                userId,
            }) =>
                `<div class="blog-item ">
                    <div class="cover-img cursor-pointer" data-id="${idBlog}">
                        <img class="blog-img rounded-t-lg cursor-pointer"data-id="${idBlog}" src="./assets/img/cover-img.jpg" alt="blog">
                    </div>
                    <div class="p-3 bg-gray-50 rounded-b-2"> 
                    <div class="content-blog">
                    <h3 class=" line-clamp-1 title my-2 font-medium ">${title}</h3> 
                    <p class="px-2 text-sm line-clamp-2 ">${content}</p>
                </div>
                <div class="blog-info my-2">
                <p class="user flex items-end gap-x-2 text-xs font-semibold"><span class="block w-6 h-6 rounded-full flex justify-center items-center font-medium text-md bg-sky-400 text-white">${getAvtName(
                    userId
                )}</span >${name}</p> 
                <span class="font-light text-xs italic"> ${handleDate(
                    timeUp
                )}</span>   
                </div>
                <button class="more-btn flex ml-auto font-medium text-sm " data-id="${idBlog}">Read More</button>
                    </div>
                 </div>  
            `
        )
        .join("")}`;
    feed.innerHTML = html;
    root.append(feed);
};

const render = () => {
    if (getTokenStorage()) {
        getProfile();
        console.log(1);
        return;
    }
    if (isToLogin) {
        feature.innerHTML = isSignUp ? toRegister : toLogin;
        feed.innerHTML = "";
        console.log(2);
        return;
    }
    feature.innerHTML = `<div><button class="to-login-btn text-xl font-semibold my-5 w-full text-right ">Login</button></div>`;
    getBlogs();
};

root.addEventListener("click", (e) => {
    if (e.target.classList.contains("to-login-btn")) {
        e.preventDefault();
        isToLogin = true;
        isSignUp = false;
        render();
        handleLogin();
    }
    if (e.target.classList.contains("to-sign-up")) {
        e.preventDefault();
        isSignUp = true;
        render();
        handleSignUp();
    }
    if (
        e.target.classList.contains("back-to-home-btn") ||
        e.target.classList.contains("back-to-home")
    ) {
        e.preventDefault();
        isToLogin = false;
        render();
    }
    if (
        e.target.classList.contains("more-btn") ||
        e.target.classList.contains("blog-img")
    ) {
        e.preventDefault();
        console.log(e.target.dataset.id);
        getBlog(e.target.dataset.id);
    }
});

const handleLogin = () => {
    const formLogin = document.querySelector(".form-login");
    formLogin.addEventListener("submit", (e) => {
        e.preventDefault();
        const data = Object.fromEntries([...new FormData(e.target)]);
        loginUser(data);
    });
};
const loginUser = async ({ email, password }) => {
    try {
        const { response, data: tokens } = await httpClient.post(
            `/auth/login`,
            {
                email,
                password,
            }
        );
        if (!response.ok) {
            throw new Error("Đăng nhập thất bại");
        }
        setTokenStorage(tokens.data);
        alert("Đăng nhập thành công");
        render();
    } catch (error) {
        console.log(error);
        alert(`Tên đăng nhập hoặc mật khẩu không đúng!`);
    }
};

const getProfile = async () => {
    try {
        if (getTokenStorage()) {
            const { accessToken } = getTokenStorage();
            httpClient.token = accessToken;
            const { response, data: dataObj } = await httpClient.get(
                `/users/profile`
            );
            if (!response.ok) {
                throw new Error("Lỗi");
            }
            isToLogin = false;
            const data = dataObj["data"];
            feature.innerHTML = userAction(data);
            getBlogs();
            datePicker();
            handleLogout();
            handlePost();
        }
    } catch (error) {
        localStorage.removeItem("login_token");
        render();
    }
};
const handleSignUp = () => {
    const formSignUp = document.querySelector(".form-sign-up");
    formSignUp.addEventListener("submit", (e) => {
        e.preventDefault();
        const data = Object.fromEntries([...new FormData(e.target)]);
        signUpUser(data);
    });
};
const signUpUser = async ({ name, email, password }) => {
    try {
        const { response, data: dataObj } = await httpClient.post(
            `/auth/register`,
            {
                email,
                password,
                name,
            }
        );
        if (!response.ok) {
            throw new Error("Đăng ký thất bại");
        }
        alert("Đăng ký thành công!!");
        isToLogin = true;
        isSignUp = false;
        render();
        handleLogin();
    } catch (error) {
        console.log(error);
        alert(`Tài khoản đã tồn tại hoặc mật khẩu không hợp lệ`);
    }
};
const logout = async () => {
    try {
        const { accessToken } = getTokenStorage();
        httpClient.token = accessToken;

        const response = await fetch(`${SERVER_API}/auth/logout`, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });
        if (!response.ok) {
            throw new Error("Không thể đăng xuất");
        }
        alert("Đăng xuất thành công");
        localStorage.removeItem("login_token");
        render();
    } catch (error) {
        console.log(error);
    }
};
const handleLogout = () => {
    const logoutBtn = document.querySelector(".logout");
    logoutBtn.addEventListener("click", (e) => {
        logout();
    });
};
const handlePost = () => {
    const formPost = document.querySelector(".form-post");
    formPost.addEventListener("submit", (e) => {
        e.preventDefault();
        const data = Object.fromEntries([...new FormData(e.target)]);
        postBlog(data);
    });
};
const postBlog = async ({ title, content, date }) => {
    try {
        const { accessToken } = getTokenStorage();
        httpClient.token = accessToken;

        if (date) {
            return alert(
                `Tính năng chọn ngày đăng bài chưa được phát triển, vui lòng không sử dụng tính năng này!`
            );
        }
        const { response, data } = await httpClient.post(`/blogs`, {
            title: title,
            content: content,
        });
        if (!response.ok) {
            throw new Error("Đăng bài không thành công");
        }
        alert("Đã tải lên bài viết");
        render();
    } catch (error) {
        console.log(error);
    }
};

const datePicker = () => {
    const ipDate = document.querySelector(".ip-date");
    ipDate.addEventListener("change", (e) => {
        handleDatePicker(ipDate.value, ipDate);
    });
    const resetTimeBtn = document.querySelector(".reset-time");
    resetTimeBtn.addEventListener("click", (e) => {
        ipDate.value = "";
    });
};

render();
