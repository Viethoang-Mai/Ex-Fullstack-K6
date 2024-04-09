function $(tag) {
    return document.querySelector(tag);
}

const linkLogin = $(".link-login");
const headerForm = $(".header-form");
const formArea = $(".form-area");
const overlay = $(".overlay");
const btnCloseForm = $(".close-btn_form");
const btnSwitch = $(".btn-sw");
const btnSwLogin = $(".login");
const btnSwRegister = $(".register");
const formLoginArea = $(".form-login");
const formRegisterArea = $(".form-register");
const inputElRegister = document.querySelectorAll(".form-register input");
const inputElLogin = document.querySelectorAll(".form-login input");
const textErrLogin = document.querySelectorAll(".form-login .error-text");
const textErrRegis = document.querySelectorAll(".form-register .error-text");
const eyePwLogin = $(".form-login .eye");
const eyePwRegister = $(".form-register .eye");
const emailErrLogin = $(".ip-error_email");
const passwordErrLogin = $(".ip-error_password");
const emailErrRegister = $(".form-register .ip-error_email");
const passwordErrRegister = $(".form-register .ip-error_password");
const fullNameErr = $(".ip-error_name");
const emailLogin = $(".ip-email");
const passwordRegister = $(".form-register .ip-password");
const emailRegister = $(".form-register .ip-email");
const passwordLogin = $(".ip-password");
const fullName = $(".ip-name");

const resultLogin = $(".inform-login");
const resultRegister = $(".inform-register");
// console.log(name);

function addOpen() {
    headerForm.classList.add("open");
    btnSwLogin.classList.add("sw-btn-active");
    formRegisterArea.style.display = "none";
}
function removeOpen() {
    headerForm.classList.remove("open");
}
function eyePassword(item, area) {
    if (item.querySelector("i").classList.contains("fa-eye")) {
        item.querySelector("i").classList.replace("fa-eye", "fa-eye-slash");
        area.querySelector(".ip-password").type = "text";
    } else {
        item.querySelector("i").classList.replace("fa-eye-slash", "fa-eye");
        area.querySelector(".ip-password").type = "password";
    }
}
linkLogin.addEventListener("click", addOpen);
overlay.addEventListener("click", removeOpen);
btnCloseForm.addEventListener("click", removeOpen);

btnSwLogin.addEventListener("click", function () {
    btnSwLogin.classList.add("sw-btn-active");
    btnSwRegister.classList.remove("sw-btn-active");
    formLoginArea.style.display = "block";
    formRegisterArea.style.display = "none";
    inputElRegister.forEach(function (item) {
        item.value = "";
        item.classList.remove("ip-error");
    });
    textErrRegis.forEach(function (item) {
        item.classList.remove("ip-error_text");
    });
    passwordErrRegister.textContent = "";
    emailErrRegister.textContent = "";
    fullName.textContent = "";
});
btnSwRegister.addEventListener("click", function () {
    btnSwRegister.classList.add("sw-btn-active");
    btnSwLogin.classList.remove("sw-btn-active");
    formLoginArea.style.display = "none";
    formRegisterArea.style.display = "block";
    inputElLogin.forEach(function (item) {
        item.value = "";
        item.classList.remove("ip-error");
    });
    textErrLogin.forEach(function (item) {
        item.classList.remove("ip-error_text");
    });
    passwordErrLogin.textContent = "";
    emailErrLogin.textContent = "";
});

eyePwLogin.addEventListener("click", function () {
    eyePassword(eyePwLogin, formLoginArea);
});
eyePwRegister.addEventListener("click", function () {
    eyePassword(eyePwRegister, formRegisterArea);
});

function checkLogin() {
    if (!emailLogin.value) {
        emailErrLogin.innerText = "Vui lòng nhập thông tin";
        emailLogin.classList.add("ip-error");
        emailErrLogin.classList.add("ip-error_text");
    }

    if (!passwordLogin.value) {
        passwordErrLogin.innerText = "Vui lòng nhập thông tin";
        passwordErrLogin.classList.add("ip-error_text");
        passwordLogin.classList.add("ip-error");
    }
}
function checkRegister() {
    if (!emailRegister.value) {
        emailErrRegister.innerText = "Vui lòng nhập thông tin";
        emailErrRegister.classList.add("ip-error_text");
        emailRegister.classList.add("ip-error");
    }

    if (!passwordRegister.value) {
        passwordErrRegister.innerText = "Vui lòng nhập thông tin";
        passwordErrRegister.classList.add("ip-error_text");
        passwordRegister.classList.add("ip-error");
    }
    if (!fullName.value) {
        fullNameErr.innerText = "Vui lòng nhập thông tin";
        fullNameErr.classList.add("ip-error_text");
        fullName.classList.add("ip-error");
    }
}
if (emailLogin) {
    var emailPattern = /^[\w\.-]+@[a-zA-Z\d\.-]+\.[a-zA-Z]{2,}$/;
    emailLogin.addEventListener("focus", checkLogin);
    emailLogin.addEventListener("input", function () {
        if (!this.value) {
            emailErrLogin.textContent = "Vui lòng nhập thông tin";
            emailErrLogin.classList.add("ip-error_text");
            emailLogin.classList.add("ip-error");
        } else if (emailPattern.test(this.value)) {
            emailErrLogin.textContent = "";
            emailLogin.classList.remove("ip-error_text");
            emailLogin.classList.remove("ip-error");
        } else {
            emailErrLogin.textContent = "Vui lòng nhập đúng định dạng email";
            emailErrLogin.classList.add("ip-error_text");
            emailLogin.classList.add("ip-error");
        }
    });
}
if (passwordLogin) {
    var passwordPattern = /^(.{6,20})$/;
    passwordLogin.addEventListener("focus", checkLogin);
    passwordLogin.addEventListener("input", function () {
        if (!this.value) {
            passwordErrLogin.textContent = "Vui lòng nhập thông tin";
            passwordErrLogin.classList.add("ip-error_text");
            passwordLogin.classList.add("ip-error");
        } else if (passwordPattern.test(this.value)) {
            passwordErrLogin.textContent = "";
            passwordErrLogin.classList.remove("ip-error_text");
            passwordLogin.classList.remove("ip-error");
        } else {
            passwordErrLogin.textContent = "Mật khẩu tối thiểu 6 - 20 ký tự";
            passwordErrLogin.classList.add("ip-error_text");
            passwordLogin.classList.add("ip-error");
        }
    });
}
if (emailRegister) {
    var emailPattern = /^[\w\.-]+@[a-zA-Z\d\.-]+\.[a-zA-Z]{2,}$/;
    emailRegister.addEventListener("focus", checkRegister);
    emailRegister.addEventListener("input", function () {
        if (!this.value) {
            emailErrRegister.textContent = "Vui lòng nhập thông tin";
            emailErrRegister.classList.add("ip-error_text");
            emailRegister.classList.add("ip-error");
        } else if (emailPattern.test(this.value)) {
            emailErrRegister.textContent = "";
            emailErrRegister.classList.remove("ip-error_text");
            emailRegister.classList.remove("ip-error");
        } else {
            emailErrRegister.textContent = "Vui lòng nhập đúng định dạng email";
            emailErrRegister.classList.add("ip-error_text");
            emailRegister.classList.add("ip-error");
        }
    });
}
if (passwordRegister) {
    var passwordPattern = /^(.{6,20})$/;
    passwordRegister.addEventListener("focus", checkRegister);
    passwordRegister.addEventListener("input", function () {
        if (!this.value) {
            passwordErrRegister.textContent = "Vui lòng nhập thông tin";
            passwordErrRegister.classList.add("ip-error_text");
            passwordRegister.classList.add("ip-error");
        } else if (passwordPattern.test(this.value)) {
            passwordErrRegister.textContent = "";
            passwordErrRegister.classList.remove("ip-error_text");
            passwordRegister.classList.remove("ip-error");
        } else {
            passwordErrRegister.textContent = "Mật khẩu tối thiểu 6 - 20 ký tự";
            passwordErrRegister.classList.add("ip-error_text");
            passwordRegister.classList.add("ip-error");
        }
    });
}
if (fullName) {
    fullName.addEventListener("focus", checkRegister);
    fullName.addEventListener("input", function () {
        if (this.value === null || this.value === "") {
            fullNameErr.textContent = "Vui lòng nhập thông tin";
            fullName.classList.add("ip-error");
        }
        {
            fullNameErr.textContent = "";
            fullName.classList.remove("ip-error");

            fullNameErr.classList.remove("ip-error_text");
        }
    });
}

formLoginArea.addEventListener("submit", function (e) {
    e.preventDefault();
    if (
        emailPattern.test(emailLogin.value) &&
        passwordPattern.test(passwordLogin.value)
    ) {
        resultLogin.innerText = "Account not existed.";
    } else {
        checkLogin();
    }
});
formRegisterArea.addEventListener("submit", function (e) {
    e.preventDefault();
    if (
        emailPattern.test(emailRegister.value) &&
        passwordPattern.test(passwordRegister.value) &&
        fullName
    ) {
        resultRegister.innerText = "Account existed.";
    } else {
        checkRegister();
    }
});
