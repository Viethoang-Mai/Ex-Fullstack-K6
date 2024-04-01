/*
Bài 1
Viết 1 hàm tính tổng giá trị biểu thức, tham số truyền vào ở dạng Rest Parameter

Yêu cầu chi tiết:

Hàm return về giá trị
Ép ràng buộc kiểu dữ liệu là số
Nếu dữ liệu truyền vào không hợp lệ, trả về thông báo lỗi
*/

function getTotal(...args) {
    var res = 0;
    for (let value of args) {
        if (value === null) {
            return "Nhập lại dữ liệu";
        } else {
            value = +value;
            if (isNaN(value)) {
                return "Nhập lại dữ liệu";
            }
            res += value;
        }
    }
    return res;
}
// console.log(getTotal("2", 4, 6));
console.log(getTotal("10", NaN, 12));

/*
Bài 2
Viết 1 phương thức Prototype có tên là getCurrency có đối số truyền vào là đơn vị tiền tệ cần hiển thị

Kết quả sẽ hiển thị ra kết định dạng kèm đơn vị tiền tệ

Ví dụ:

//Case 1
var price = 12000;
console.log(price.getCurrency('đ')) //Hiển thị: 12,000 đ

//Case 2
var price = "12000000";
console.log(price.getCurrency('đ')) //Hiển thị: 12,000,000 đ
*/
Object.prototype.getCurrency = function (title) {
    if (!+this) {
        return "Dữ liệu không hợp lệ";
    }
    return Number(this).toLocaleString().replaceAll(".", ",") + " " + title;
};
var price = "12000000";
console.log(price.getCurrency("đ")); //Hiển thị: 12,000,000 đ
var price = 12000;
console.log(price.getCurrency("đ")); //Hiển thị: 12,000 đ
/*
Chuyển đổi mảng 1 chiều thành dạng lồng (nested)
*/
var data = [
    {
        id: 1,
        name: "Chuyên mục 1",
        parent: 0,
    },
    {
        id: 2,
        name: "Chuyên mục 2",
        parent: 0,
    },
    {
        id: 3,
        name: "Chuyên mục 3",
        parent: 0,
    },
    {
        id: 4,
        name: "Chuyên mục 2.1",
        parent: 2,
    },
    {
        id: 5,
        name: "Chuyên mục 2.2",
        parent: 2,
    },
    {
        id: 6,
        name: "Chuyên mục 2.3",
        parent: 2,
    },
    {
        id: 7,
        name: "Chuyên mục 3.1",
        parent: 3,
    },
    {
        id: 8,
        name: "Chuyên mục 3.2",
        parent: 3,
    },
    {
        id: 9,
        name: "Chuyên mục 3.3",
        parent: 3,
    },
    {
        id: 10,
        name: "Chuyên mục 2.2.1",
        parent: 5,
    },
    {
        id: 11,
        name: "Chuyên mục 2.2.2",
        parent: 5,
    },
    {
        id: 12,
        name: "Chuyên mục 2.2.1.1",
        parent: 10,
    },
];

function toNested(arr, id = 0) {
    if (!Array.isArray(arr) || !arr.length) {
        return `Kiểm tra dữ liệu đầu vào`;
    }
    var res = [];
    arr.forEach(function (value) {
        if (value.parent === id) {
            const newItem = { id: value.id, name: value.name };
            const children = toNested(arr, value.id);
            // console.log(children);
            if (children.length) {
                newItem.children = children;
            }
            res.push(newItem);
        }
    });
    return res;
}
console.log(toNested(data));
/*
Bài 4
Viết lại vòng lặp reduce() trong Array bằng cách sử dụng Prototype trong Javascript

Lưu ý: Đặt tên là reduce2()
*/
Array.prototype.reduce2 = function (cb, init) {
    var preValue = init === undefined ? this[0] : init;
    for (let i = init === undefined ? 1 : 0; i < this.length; i++) {
        preValue = cb(preValue, this[i], i, this);
        // console.log(cb(preValue, this[i], i, this));
    }
    return preValue;
};

var abc = [2, 3, 4];
var newA = abc.reduce2(function (pre, cur) {
    return pre + cur;
});
console.log(newA);
