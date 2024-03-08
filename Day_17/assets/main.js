/*
    Bài 1: Hoán vị 2 số
Input: Cho trước 2 số a, b
Output: Thực hiện hoán vị 2 số không dùng biến trung gian  vhm
*/
var a = 3,
    b = 0;
if (typeof (a, b) === "number" && !isNaN(a, b)) {
    a += b;
    b = a - b;
    a -= b;
} else {
    console.log(`a hoặc b không phải số! Nhập lại a, b.`);
}

console.log(`2 số đã được hoán vị thành:a = ${a}, b = ${b} `);
/*
    Bài 2: Thực hiện phép toán
Viết chương trình tính toán biểu thức sau vhm
S = 10 + 20 + 5^10 / 2
*/
let res = 10 + 20 + 5 ** 10 / 2;
console.log(`S = ${res}`);

/*
    Bài 3: Tìm số lớn nhất
Học viên tìm hiểu về câu lệnh rẽ nhánh và giải bài tập sau
Input:
Cho trước 3 số a, b, c
Output:
Tìm số lớn nhất trong 3 số và hiển thị kết quả
*/
var a = 3,
    b = 2,
    c = 1e6,
    max = a;
if (max < b) max = b;
if (max < c) max = c;

console.log(`Số lớn nhất là: Max = ${max}`);

/*Bài 4: Kiểm tra số cùng dấu
Input:
Cho trước 2 số a, b
Output:
Kiểm tra 2 số cùng dấu hay không và hiển thị kết quả ra màn hình*/
var a = 2,
    b = 5;
if (a === 0 || b === 0) {
    console.log("nhập số khác 0");
} else if (a * b > 0) {
    console.log("a, b cùng dấu");
} else {
    console.log("a, b khác dấu");
}

/*
    Bài 5: Sắp xếp 3 số
Input:
Cho trước 3 số a, b, c
Output:
Thực hiện đổi chỗ 3 số a, b, c sao cho 3 số có thứ tự tăng dần
vh*/
var a = 3,
    b = 2,
    c = 0,
    tmp;
if (typeof (a, b, c) === "number" && !isNaN(a, b)) {
    if (a >= b) {
        tmp = a;
        a = b;
        b = tmp;
    }
    if (a >= c) {
        tmp = a;
        a = c;
        c = tmp;
    }

    if (b >= c) {
        tmp = b;
        b = c;
        c = tmp;
    }

    console.log(`Dãy số được sắp xếp lại thành: ${a}, ${b}, ${c}`);
} else {
    console.log(`a, b hoặc c không phải là số`);
}
