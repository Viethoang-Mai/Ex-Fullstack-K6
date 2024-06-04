import { config } from "./config.js";
const { SERVER_API } = config;
import { httpClient } from "./client.js";
import { getTokenStorage, setTokenStorage } from "./storage.js";
httpClient.baseUrl = SERVER_API;
const root = document.querySelector("#root");
const feed = root.querySelector(".news-feed");
const feature = root.querySelector(".feature");
// feature.innerHTML = `<div><button class="to-login-btn">Login</button></div>`;
let isToLogin;
const userAction = (data) => {
    const html = `
<div>
    <div class="row"><p class="user">${data.name}</p> <button>Logout</button></div>
    <div class="">
    
    <div class="form-el flex min-h-full flex-col justify-center px-2 py-2 ">        
        <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        
            <form class="space-y-6 form-login" >
            <div>
                <label for="title" class="block text-sm font-medium leading-6 text-gray-900">Tiêu đề bài viết</label>
                <div class="mt-2">
                <input id="title" name="title" type="text"  required class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 px-3">
                </div>
            </div>

            <div>
                <div class="flex items-center justify-between">
                <label for="password" class="block text-sm font-medium leading-6 text-gray-900">Nội dung bài viết</label>
                
                </div>
                <div class="mt-2 ">
                    <textarea required class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6  px-3"></textarea>
                </div>
            </div>

                <div>
                    <button type="submit" class=" sign-in flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 mb-2 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Tải lên</button>
                    </div>
                    </form>   
        </div>
    </div>      
</div>
    </div>
</div>

`;
    feature.innerHTML = html;
    getBlogs();
};

const toLogin = `
    <div class="flex justify-evenly items-center flex-wrap">
        <div class="max-w-xl">
            <h3 class="text-center text-2xl font-semibold">Đăng nhập</h3>
            <p>
            Hãy nhập email và mật khẩu của bạn để truy cập vào nền tảng Blogger, nơi bạn có thể tạo và chia sẻ những bài viết độc đáo của mình. Nếu bạn chưa có tài khoản, hãy <button class="text-indigo-600">đăng ký ngay</button> để tham gia cộng đồng Blogger
            <button class="back-to-home-btn w-full text-center mt-5 text-indigo-600">Về trang chủ</button>
            </p>
        </div>
        <div class="form-el flex min-h-full flex-col justify-center px-2 py-2 ">        
            <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <h2 class="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Sign in to your account</h2>
                <form class="space-y-6 form-login" >
                <div>
                    <label for="email" class="block text-sm font-medium leading-6 text-gray-900">Email address</label>
                    <div class="mt-2">
                    <input id="email" name="email" type="email" autocomplete="email" required class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 px-3">
                    </div>
                </div>

                <div>
                    <div class="flex items-center justify-between">
                    <label for="password" class="block text-sm font-medium leading-6 text-gray-900">Password</label>
                    <div class="text-sm">
                        <a href="#" class="font-semibold text-indigo-600 hover:text-indigo-500">Forgot password?</a>
                    </div>
                    </div>
                    <div class="mt-2 ">
                        <input id="password" name="password" type="password" autocomplete="current-password" required class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6  px-3">
                    </div>
                </div>

                    <div>
                        <button type="submit" class=" sign-in flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 mb-2 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Sign in</button>
                        </div>
                        </form>
                        <button type="button" class=" sign-up font-semibold text-indigo-600 hover:text-indigo-500 ">Sign up</button>

            </div>
        </div>      
    </div>
`;
const query = {
    _limit: 10,
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
    } catch (error) {
        console.log(error);
    }
};

const news = (data) => {
    const html = `${data
        .map(
            ({ userId: { name }, title, timeUp, content }) =>
                `<div class="blog-item mb-2">
                    <div class="cover-img">
                        <img src="./assets/img/cover-img.jpg" alt="blog">
                    </div>
                    <div class="content-blog">
                        <h3 class"title">${title}</h3> 
                        <p>${content}</p>
                    </div>
                    <div class="blog-info">
                    <p>${name}</p>  
                    <span> ${handleDate(timeUp)}</span>   
                    </div>
                    <button class"more-btn">Read More</button>
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
        return;
    }
    if (isToLogin) {
        root.innerHTML = toLogin;
        handleLogin();
        return;
    }
    getBlogs();
};

root.addEventListener("click", (e) => {
    if (e.target.classList.contains("to-login-btn")) {
        e.preventDefault();
        isToLogin = true;
        render();
    }
    if (e.target.classList.contains("back-to-home-btn")) {
        e.preventDefault();
        isToLogin = false;
        render();
    }
});

const handleDate = (apiReturnDate) => {
    const dateObj = new Date(apiReturnDate);
    const year = dateObj.getFullYear();
    const month = dateObj.getMonth() + 1; // Tháng bắt đầu từ 0
    const day = dateObj.getDate();
    const hours = dateObj.getHours();
    const minutes = dateObj.getMinutes();
    const seconds = dateObj.getSeconds();
    return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
};
const handleLogin = () => {
    const formLogin = document.querySelector(".form-login");
    formLogin.addEventListener("submit", (e) => {
        e.preventDefault();
        const data = Object.fromEntries([...new FormData(e.target)]);
        loginUser(data);
    });
};
const loginUser = async ({ email, password }) => {
    const { response, data: tokens } = await httpClient.post(`/auth/login`, {
        email,
        password,
    });
    if (!response.ok) {
        throw new Error("Đăng nhập thất bại");
    }
    setTokenStorage(tokens.data);

    getProfile();
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
            userAction(data);
        }
    } catch (error) {}
};
render();
