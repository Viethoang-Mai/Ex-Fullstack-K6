import { convertRegex } from "./regex.js";

export const toLogin = `
    <div class="flex justify-evenly items-center flex-wrap">
        <div class="max-w-xl">
            <h3 class="text-center text-2xl font-semibold mb-3">Đăng nhập</h3>
            <p>
            Hãy nhập email và mật khẩu của bạn để truy cập vào nền tảng Blogger, nơi bạn có thể tạo và chia sẻ những bài viết độc đáo của mình. Nếu bạn chưa có tài khoản, hãy <button class="to-login-btn text-indigo-600 to-sign-up">đăng ký ngay</button> để tham gia cộng đồng Blogger
            <button class="back-to-home-btn w-full text-center mt-5 text-indigo-600">Về trang chủ</button>
            </p>
        </div>
        <div class="form-el flex min-h-full flex-col justify-center px-2 py-2 ">        
            <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <h2 class="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900 mb-3">Sign in to your account</h2>
                <form class="space-y-6 form-login" >
                <div>
                    <label for="email-login" class="block text-sm font-medium leading-6 text-gray-900">Email address</label>
                    <div class="mt-2">
                    <input id="email-login" name="email" type="email" autocomplete="email" required class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 px-3">
                    </div>
                </div>

                <div>
                    <div class="flex items-center justify-between">
                    <label for="password-login" class="block text-sm font-medium leading-6 text-gray-900">Password</label>
                    <div class="text-sm">
                        <a href="#" class="font-semibold text-indigo-600 hover:text-indigo-500">Forgot password?</a>
                    </div>
                    </div>
                    <div class="mt-2 ">
                        <input id="password-login" name="password" type="password" autocomplete="current-password" required class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6  px-3">
                    </div>
                </div>

                    <div>
                        <button type="submit" class=" sign-in flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 mb-2 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Sign in</button>
                        </div>
                        </form>
                        <button type="button" class=" to-sign-up font-semibold text-indigo-600 hover:text-indigo-500 ">Sign up</button>

            </div>
        </div>      
    </div>
`;
export const toRegister = `
    <div class="flex justify-evenly items-center flex-wrap">
        <div class="max-w-lg">
            <h3 class="text-center text-2xl font-semibold mb-3">Đăng Ký</h3>
            <p>

                Bạn muốn tham gia cộng đồng Blogger, nơi bạn có thể tạo và chia sẻ những bài viết độc đáo của mình? Hãy điền thông tin của bạn vào biểu mẫu dưới đây để tạo tài khoản miễn phí. Bạn sẽ nhận được nhiều ưu đãi, thông tin mới nhất và cơ hội giao lưu với những blogger khác khi đăng ký. Đừng bỏ lỡ cơ hội này, hãy đăng ký ngay! Nếu bạn đã có tài khoản, <button class="to-login-btn text-indigo-600">Đăng nhập ngay</button>
                <button class="back-to-home-btn w-full text-center mt-5 text-indigo-600">Về trang chủ</button> 
            </p>
        </div>
        <div class="form-el flex min-h-full flex-col justify-center px-2 py-2 max-w-xs"">        
            <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <h2 class="mb-3 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Sign up </h2>
                <form class="space-y-6 form-sign-up" >
                <div>
                    <label for="name" class="block text-sm font-medium leading-6 text-gray-900">Tên của bạn</label>
                    <div class="mt-2">
                    <input id="name" name="name" type="text"  required class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 px-3">
                    </div>
                </div>
                <div>
                    <label for="email" class="block text-sm font-medium leading-6 text-gray-900">Email address</label>
                    <div class="mt-2">
                    <input id="email" name="email" type="email" autocomplete="email" required class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 px-3">
                    </div>
                </div>

                <div>
                    <div class="flex items-center justify-between">
                    <label for="password" class="block text-sm font-medium leading-6 text-gray-900">Password</label>
                    
                    </div>
                    <div class="mt-2 ">
                        <input id="password" name="password" type="password" autocomplete="current-password" required class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6  px-3">
                        <p class="mt-3 text-xs font-normal italic">Mật khẩu phải có ít nhất 8 ký tự bao gồm cả chữ thường và in hoa</p>
                    </div>
                </div>

                    <div>
                        <button type="submit" class=" sign-up flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 mb-2 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Sign up</button>
                        </div>
                        </form>
                        <button type="button" class=" to-login-btn  font-semibold text-indigo-600 hover:text-indigo-500 ">Sign in</button>

            </div>
        </div>      
    </div>
`;
export const userAction = (data) => {
    return `
<div>
    <div class="row flex items-center justify-between my-5"><p class="user flex items-end gap-x-2"><span class="block w-8 h-8 rounded-full flex justify-center items-center  bg-sky-400 text-white">${getAvtName(
        data
    )}</span>${
        data.name
    }</p> <button class="logout text-xl font-semibold">Logout</button></div>
    <div class="mb-5">
    
    <div class="form-el flex min-h-full  justify-center  px-2 py-2 ">        
        <div class="mt-10 w-4/5">
        
            <form class="space-y-6 form-post" >
            <div class="flex gap-x-5">
                <div class="grow">
                    <div class="mb-5">
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
                            <textarea name="content" required class="h-32 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6  px-3"></textarea>
                        </div>
                    </div>
                </div>
                <div >
                <label for="date" class="block text-sm font-medium leading-6 text-gray-900">Chọn thời gian tải lên</label>
                <div class="mt-2 relative">
                <input id="date" name="date" type="datetime-local"  class="ip-date block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 px-3">
                <button type="button" class="reset-time hover:bg-gray-200 absolute text-sm right-0 mt-2 bg-gray-100 px-2 py-1 rounded">Reset</button>
                </div>
                </div>
            </div>
            
                <div class="">
                    <button type="submit" class=" post flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 mb-2 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Tải lên</button>
                    </div>
                    </form>   
        </div>
    </div>      
</div>
    </div>
</div>

`;
};

export const renderBlog = ({
    userId: { name },
    title,
    timeUp,
    content,
    userId,
}) => {
    return `<div class="w-full">
                <button class="flex ml-auto items-center gap-x-2 text-sm back-to-home"><i class="fa-solid fa-arrow-left-long"></i> back</button>
                <div class="info">
                    <div class="row flex items-center justify-between my-1">
                        <p class="user flex items-end gap-x-2 font-semibold text-md"><span class="block w-8 h-8 rounded-full flex justify-center items-center bg-sky-400 text-white">${getAvtName(
                            userId
                        )}</span >${name}
                        </p>
                    </div>
                    <p class="italic font-light text-sm">${handleDate(
                        timeUp
                    )}</p>
                </div>
                <div class="inner mt-8">
                    <h3 class="font-semibold text-lg mb-5">${title}</h3>
                    <div class="font-normal text-md indent-6">${convertRegex(
                        content
                    )}</div>
                </div>
            </div>`;
};

export const getAvtName = (data) => {
    let charName;
    if (data.name.trim().indexOf(" ")) {
        const IndexName = data.name.trim().lastIndexOf(" ");
        charName = data.name.trim().slice(IndexName + 1, IndexName + 2);
    } else {
        charName = data.name.trim().slice(0, 1);
    }
    return charName;
};
export const handleDate = (apiReturnDate) => {
    const dateObj = new Date(apiReturnDate);
    const year = dateObj.getFullYear();
    const month = dateObj.getMonth() + 1; // Tháng bắt đầu từ 0
    const day = dateObj.getDate();
    const hours = dateObj.getHours();
    const minutes = dateObj.getMinutes();
    const seconds = dateObj.getSeconds();
    return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
};
