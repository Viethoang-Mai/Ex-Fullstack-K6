/*
    Bài 1: N số fibonaci
Hiển thị N số Fibonaci đầu tiên
Ví dụ: Gán n = 10 sẽ hiển thị danh sách 10 số fibonaci

Yêu cầu: Không dùng vòng lặp
*/
var output = "Dãy Fibonacci: ";

function fibonacci(n) {
    if (n < 2) {
        return n;
    }
    return fibonacci(n - 1) + fibonacci(n - 2);
}
function listFibonacci(n) {
    var output = `Dãy n = ${n} số Fibonacci: `;
    var cnt = 0;
    if (typeof n === "number" && !isNaN(n) && n > 0 && n % 1 === 0) {
        while (cnt < n) {
            fibonacci(cnt);
            output += `${fibonacci(cnt)} `;
            cnt++;
        }
        console.log(output);
    } else console.log("Nhập lại số");
}
listFibonacci(21);
/*
    Bài 2: Đảo ngược số
Viết hàm đảo ngược số nguyên với tham số là số cần đảo ngược

Ví dụ: Khi gọi hàm và truyền đối số 12345 sẽ trả về kết quả 54321
*/

function reverse(n) {
    var initial = n;
    var res = 0,
        tmp;
    if (typeof n === "number" && !isNaN(n) && n % 1 === 0) {
        while (n !== 0) {
            tmp = n % 10;
            res = res * 10 + tmp;
            n = parseInt(n / 10);
        }
        console.log(`Số ${initial} ban đầu được lật lại thành: ${res}`);
    } else console.log("Nhập lại số");
}
reverse(-989888);

/*
    Bài 3: Viết hàm chuyển số thành chữ 
Ví dụ: Số 4298 sẽ chuyển thành: Bốn ngàn hai trăm chín tám

Ràng buộc: Số cần chuyển đổi có giá trị từ 0 đến 9999

*/

function getNumber(n) {
    switch (n) {
        case 0:
            return "Không";
        case 1:
            return "Một";
        case 2:
            return "Hai";
        case 3:
            return "Ba";
        case 4:
            return "Bốn";
        case 5:
            return "năm";
        case 6:
            return "Sáu";
        case 7:
            return "Bảy";
        case 8:
            return "Tám";
        case 9:
            return "Chín";

        default:
            return "Mười";
    }
}
function getString(n) {
    var display = "",
        a,
        b,
        c,
        d;
    if (
        typeof n === "number" &&
        !isNaN(n) &&
        n % 1 === 0 &&
        n >= 0 &&
        n <= 9999
    ) {
        if (n >= 0 && n <= 10) {
            return (display = getNumber(n));
        }
        a = Math.floor(n / 1000);
        b = Math.floor((n - a * 1000) / 100);
        c = Math.floor((n - a * 1000 - b * 100) / 10);
        d = n - a * 1000 - b * 100 - c * 10;
        if (a !== 0) {
            display +=
                getNumber(a) + " ngàn " + getNumber(b).toLowerCase() + " trăm ";
            if (b === 0 && c === 0 && d === 0) return getNumber(a) + " ngàn ";
        } else if (a === 0 && b !== 0) {
            display += getNumber(b) + " trăm ";
        } else if (a === 0 && b === 0) {
            if (c === 1 && d !== 0) {
                return (display += "Mười " + getNumber(d).toLowerCase());
            } else if (c !== 0) {
                if (d === 0) {
                    return (display += getNumber(c) + " mươi");
                } else if (d === 1) {
                    return (display += getNumber(c) + " mươi mốt");
                }
            }
            return (display +=
                getNumber(c) + " mươi " + getNumber(d).toLowerCase());
        }
        if (c !== 0 && c !== 1) {
            if (d === 0) {
                return (display += getNumber(c) + " mươi ");
            } else if (d === 1) {
                return (display += getNumber(c).toLowerCase() + " mươi mốt");
            }
            return (display +=
                getNumber(c).toLowerCase() +
                " mươi " +
                getNumber(d).toLowerCase());
        } else if (c === 1 && d === 0) {
            display += " mười";
        } else if (c === 0) {
            if (d !== 0) {
                return (display += "linh " + getNumber(d).toLowerCase());
            } else return (display += "");
        } else {
            display += "mười " + getNumber(d).toLowerCase();
        }
        return display;
    }
    return 0;
}
var n = 4298;
console.log(
    `${
        getString(n)
            ? `Số ${n} sẽ chuyển thành: ${getString(n)}`
            : `Nhập lại n thỏa mãn đk!!!`
    }`
);
