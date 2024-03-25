const checkInt = function (num) {
    if (typeof num === "number" && !isNaN(num) && num % 1 === 0) {
        return 1;
    }
    return 0;
};
const checkArr = function (arr) {
    if (arr.length && Array.isArray(arr)) {
        return arr.every(function (value) {
            return value % 1 === 0;
        });
    }
    return 0;
};

/*
 Cho một số nguyên n, trả về số nguyên tố đối xứng nhỏ nhất lớn hơn hoặc bằng n.

Lưu ý rằng 1 không phải là số nguyên tố.

Ví dụ: 2, 3, 5, 7, 11, và 13 đều là số nguyên tố.

Ví dụ, 101 và 12321 là số đối xứng.

*/

// Hàm kiểm tra xem một số có phải là số nguyên tố đối xứng hay không
const isPrime = function (n) {
    if (n < 2) return 0;
    for (let i = 2; i <= Math.sqrt(n); i++) {
        if (n % i === 0) {
            return 0;
        }
    }
    const strN = n.toString();
    return strN === strN.split("").reverse().join("");
};

const getNumber = function (n) {
    if (checkInt(n)) {
        let number = n + 1;
        while (true) {
            if (isPrime(number)) {
                return number;
            }
            number++;
        }
    }
    return 0;
};

const n = -3.2;
console.log(`${getNumber(n) ? `Result = ${getNumber(n)}` : `Nhap lai n`}`);

/*
    Bài 2
Cho hai mảng đã sắp xếp nums1 và nums2 có kích thước lần lượt là m và n, trả về trung vị của hai mảng đã sắp xếp đó.

Ví dụ 1:

Input: nums1 = [1,3], nums2 = [2]

Output: 2
*/
var nums1 = [1, 2],
    nums2 = [3, 4];
const getMedian = function (arr1, arr2) {
    var getArr = arr1.concat(arr2).sort(function (a, b) {
        return a - b;
    });
    if (checkArr(getArr)) {
        if (getArr.length % 2 === 0) {
            const index1 = getArr.length / 2;
            const index2 = getArr.length / 2 - 1;
            return (getArr[index1] + getArr[index2]) / 2;
        } else {
            return getArr[Math.floor(getArr.length / 2)];
        }
    }
    return 0;
};
console.log(
    `${
        getMedian(nums1, nums2)
            ? `Trung vị của 2 mảng là: ${getMedian(nums1, nums2)}`
            : `Mảng rỗng hoặc nhập lại số là các số nguyên`
    }`
);

/*
Bài 3
Cho một mảng số nguyên chưa được sắp xếp nums. Hãy trả về số nguyên dương nhỏ nhất không có trong nums.
*/
const nums = [0, -1, 2, 2, 3];

const getMinInt = function (arr) {
    if (checkArr(arr)) {
        arr.sort(function (a, b) {
            return a - b;
        });
        var getArrPositive = arr.filter(function (value) {
            return value > 0;
        });
        // console.log(getArrPositive);
        var tmp = 1;
        for (let value of getArrPositive) {
            // console.log(tmp);
            if (value === tmp) {
                tmp++;
            } else if (tmp > value) {
                return tmp;
            }
        }
        return tmp;
    }
};
console.log(
    `${
        getMinInt(nums)
            ? `Result: ${getMinInt(nums)}`
            : `Mảng rỗng hoặc nhập lại số là các số nguyên`
    }`
);
