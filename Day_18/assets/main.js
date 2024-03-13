/*
    Bài 1: Tính tiền taxi
Tính tiền cước taxi dựa vào các điều kiện sau
Số km ≤ 1 giá 15000đ
1 < số km ≤ 5 giá 13500đ
Số km > 5 giá 11000đ
Nếu số km > 120 km sẽ được giảm 10% trên tổng số tiền
*/
const price1 = 15000,
    price2 = 13500,
    price3 = 11000,
    nkm = 120;
if (nkm > 0) {
    let res = 0;
    if (nkm <= 1) {
        res = nkm * price1;
    } else if (nkm < 5) {
        res = (nkm - 1) * price2 + price1;
    } else {
        res = (nkm - 5) * price3 + price1 + 4 * price2;
        if (nkm >= 120) {
            res -= res * 0.1;
        }
    }
    console.log(`Tiền taxi cho ${nkm} là ${res}đ;`);
} else {
    console.log("Nhập số lớn hơn 0!!!");
}

/*
    Bài 2: Học viên viết chương trình tiền điện hàng tháng theo yêu cầu sau
Input: Số điện tiêu thụ hàng tháng
Output: Hiển thị số tiền phải đóng
*/

function totalBill(n) {
    if (n <= 0) {
        console.log(`Không dùng điện mà tính ???`);
    } else if (typeof n === "number" && !isNaN(n)) {
        let total = 0;
        function calc(kWh, price) {
            if (n === 0) {
                return total;
            }
            const use = Math.min(n, kWh);
            total += use * price;
            n -= use;
            // console.log(n);
        }

        calc(50, 1678); // 50kWh đầu tiên
        calc(50, 1734); // Từ kWh 51 - 100
        calc(100, 2014); // Từ kWh 101 - 200
        calc(100, 2536); // Từ kWh 201 - 300
        calc(100, 2834); // Từ kWh 301 - 400
        calc(Infinity, 2927); // Từ kWh 401 trở đi
        console.log(`Số tiền điện tháng này là: ${total}đ`);
    }
}
totalBill(500);

/*
    Bài 3: Tính giá trị biểu thức
Cho trước số nguyên n. Tính giá trị biểu thức sau
S= 1*2 + 2*3 + 3*4 + ... + n*(n+1)
*/
let n = 4;
if (typeof n === "number" && !isNaN(n) && n % 1 == 0) {
    let res = 0;
    for (let i = 1; i <= n; i++) {
        res += i * (i + 1);
    }
    console.log(`Tổng S(n) = ${res}`);
} else {
    console.log(`nhập lại n!`);
}

/*Bài 4: Viết hàm kiểm tra số nguyên tố
Viết 1 hàm kiểm tra 1 số có phải số nguyên tố hay không?

Hàm có 1 tham số là số cần kiểm tra
Hàm có giá trị trả về
Gọi hàm trong câu điều kiện if else*/
const isPrime = function (isP) {
    if (typeof isP === "number" && !isNaN(isP) && isP % 1 == 0) {
        if (isP < 2) {
            return 0;
        } else {
            for (let i = 2; i <= Math.sqrt(isP); i++) {
                if (isP % i === 0) {
                    return 0;
                }
            }
            return 1;
        }
    }
    return 0;
};

console.log(`Đây${isPrime(8) ? ` là ` : ` không phải `}số nguyên tố`);

/*
    Bài 5: Vẽ tam giác số
Vẽ tam giác số sau với N dòng

1

2 3

4 5 6

7 8 9 10

11 12 13 14 15
*/
document.write("</br><h2>Bài 05</h2>");
const triangle = function (n) {
    var number = 1;
    for (let i = 1; i <= n; i++) {
        for (let j = 1; j <= i; j++) {
            document.write(`${number} `);
            number++;
        }
        document.write("</br>");
        document.write("</br>");
    }
};
triangle(6);
document.write("<h2>Bài 06</h2></br>");
/*Bài 6: Vẽ bàn cờ vua
Học viên sử dụng kiến thức đã học về vòng lặp, câu lệnh rẽ nhánh để vẽ bàn cờ vua*/
for (let i = 1; i <= 8; i++) {
    var row = `<div class="row" style="display:flex;width:fit-content; ">`;
    for (let j = 1; j <= 8; j++) {
        if ((j % 2 == 0 && i % 2 != 0) || (i % 2 == 0 && j % 2 != 0)) {
            row += `<span style=" display:block; width:40px; height:40px; background:#000; ;"></span> `;
        } else {
            row += `<span style=" display:block; width:40px; height:40px; background:pink;"></span> `;
        }
    }
    row += `</div>`;
    document.write(row);
}
document.write("</br><h2>Bài 07</h2></br>");
// #Bài 7: Vẽ bảng cửu chương
// Học viên sử dụng kiến thức đã học để vẽ bảng cửu chương từ 1 đến 10

for (let i = 1; i <= 10; i++) {
    var ex7 = `<div  style="display:inline-block; margin-right:15px">`;
    for (let j = 1; j <= 10; j++) {
        ex7 += `<span style="width:100px; height: 30px;display: inline-block; border: 1px solid #000; background:#f8ca3f; text-align: center ;line-height: 30px">${i} x ${j} = ${
            i * j
        }</span> </br>`;
    }
    ex7 += `</br></div>`;
    document.write(ex7);
}
// Bài 8: Tính giá trị biểu thức không dùng vòng lặp
// Tính giá trị biểu thức: S = 1 + 1/2 + 1/3 + 1/4 + 1/5 +…+1/N
const res = function (n) {
    if (typeof n === "number" && !isNaN(n) && n > 0) {
        if (n === 1) {
            return 1;
        } else {
            return res(n - 1) + 1 / n;
        }
    } else {
        return 0;
    }
};
const result = res(3);
console.log(`${result ? `S = ${result}` : `Nhập lại n!`}`);
