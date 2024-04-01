/*
Bài 1
var errors = {
    name: {
        required: "Vui lòng nhập họ tên",
        min: "Họ tên phải từ 5 ký tự"
    },
    email: {
        email: "Định dạng email không hợp lệ",
        unique: "Email đã có người sử dụng",
        required: "Vui lòng nhập địa chỉ email"
    },
    password: {
        required: "Vui lòng nhập mật khẩu",
        same: "Mật khẩu phải khớp với mật khẩu nhập lại"
    }
}
Yêu cầu: Viết hàm getError(field) có tham số truyền vào là field tương ứng với nhóm cần lấy lỗi. Tuy nhiên, chỉ trả về 1 chuỗi là lỗi đầu tiên tìm được(lỗi đầu tiên đúng) của 1 nhóm, mặc định là require
*/
var errors = {
    name: {
        required: "Vui lòng nhập họ tên",
        min: "Họ tên phải từ 5 ký tự",
    },
    email: {
        email: "Định dạng email không hợp lệ",
        unique: "Email đã có người sử dụng",
        required: "Vui lòng nhập địa chỉ email",
    },
    password: {
        required: "Vui lòng nhập mật khẩu",
        same: "Mật khẩu phải khớp với mật khẩu nhập lại",
    },
};

const getError = function (field) {
    if (!field.includes(".")) {
        if (errors[field]) {
            console.log(errors[field]["required"]);
        } else {
            console.log(`Khong tim thay loi`);
        }
    } else {
        field = field.split(".");
        if (errors[field[0]] && errors[field[0]][field[1]]) {
            console.log(errors[field[0]][field[1]]);
        } else {
            console.log(`Khong tim thay loi`);
        }
    }
};
getError("name"); //Vui lòng nhập họ tên
getError("name.min"); //Họ tên phải từ 5 ký tự

getError("email"); //Vui lòng nhập địa chỉ email
getError("email.unique"); //Email đã có người sử dụng

/*
Bài 2
*/

function customer(name, age, address) {
    return {
        name: name,
        age: age,
        address: address,
    };
}
// console.log(customer("mai", 25, "abg"));
const createCustomers = function (arr) {
    var check = true;
    var newArr = [];

    arr.forEach(function (value) {
        value.age = +value.age;
        if (
            typeof value.name === "string" &&
            value.name &&
            value.age > 0 &&
            value.age % 1 === 0 &&
            typeof value.address === "string" &&
            value.address
        ) {
            var newCustomer = customer(value.name, value.age, value.address);
            newArr.push(newCustomer);
        } else {
            check = false;
        }
    });
    if (check) {
        newArr.forEach(function (value) {
            value.shortname =
                value.name.split(" ").slice(0, 1) +
                " " +
                value.name.split(" ").slice(-1);
        });
        newArr = newArr.sort(function (a, b) {
            return a.age - b.age;
        });
        return newArr;
    }
    return `Nhap lai du lieu`;
};
const customers = [
    { name: "Nguyễn Văn A", age: "13", address: "Ha Noi", abc: "a" },
    { name: "Nguyễn Văn B", age: 11, address: "Hai Phong" },
    { name: "Nguyễn Văn C", age: 12, address: "TP.HCM" },
    { name: "Mai Việt Hoàng", age: 25, address: "Thanh Hoa" },
];
const result = createCustomers(customers);
console.log(result);
/**
 Bài 3
 */
function customerEx03(name, password, email) {
    return {
        name: name,
        password: password,
        email: email,
    };
}

var data = [];
var check = [];
const register = function (name, password, email) {
    if (!name || !password || !email) {
        console.log(`Thieu thong tin`);
        return;
    } else {
        var user = customerEx03(name, password, email);
        user.role = "user";
        if (check.includes(user.name) || check.includes(user.email)) {
            console.log(`Ten hoac email da ton tai`);
            return;
        } else {
            data.push(user);
        }
        check.push(name, email);
    }
    return data;
};

// Login Function
const login = function (email, password) {
    for (let value of data) {
        if (value["email"] === email && value["password"] === password)
            return value;
    }
    return `Thông tin đăng nhập không hợp lệ`;
};
var dataRegister = register("Nguyen Van A", "1234567", "nguyenvana@email.com");
var dataRegister = register("Nguyen Van B", "1234567", "nguyenvanb@email.com");
var dataRegister = register("Nguyen Van B", "1234567", "nguyenvanb@email.com");
const dataLogin = login("nguyenvanb@email.com", "1234567");
console.log(data);
console.log(dataLogin);

// console.log(dataRegister);
// console.log(customer("Nguyen Van A", "123456", "nguyenvana@email.com"));
