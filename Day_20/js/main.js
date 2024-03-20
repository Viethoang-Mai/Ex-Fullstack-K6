const checkInteger = function (arr) {
    if (arr.length && Array.isArray(arr)) {
        for (var value of arr) {
            if (+value % 1 !== 0) {
                return 0;
            }
        }
        return 1;
    }
    return 0;
};

/*
    Bài 01
 Cho trước 1 mảng số nguyên, yêu cầu tìm số lớn nhất, nhỏ nhất trong mảng và vị trí
*/
const findMaxMin = function (arr) {
    if (checkInteger(arr)) {
        var max = arr[0];
        var min = arr[0];
        var iMax, iMin;
        for (var i = 0; i < arr.length; i++) {
            if (arr[i] >= max) {
                max = arr[i];
                iMax = i;
            }
            if (arr[i] <= min) {
                min = arr[i];
                iMin = i;
            }
        }
        console.log(`Max = ${max} ở vị trí index = ${iMax}`);
        console.log(`Min = ${min} ở vị trí index = ${iMin}`);
    } else {
        console.log(
            `Mảng rỗng hoặc vui lòng nhập lại mảng chỉ gồm các số nguyên`
        );
    }
};
const arr01 = [1, 5, 2, 3, 6];
findMaxMin(arr01);

/*
    Bài 02
 Cho trước 1 mảng số nguyên, tính trung bình các số nguyên tố trong mảng. Nếu trong mảng không có số nguyên tố thì hiển thị “Không có số nguyên tố”
*/
const isPrime = function (n) {
    if (n < 2) {
        return 0;
    }
    for (var i = 2; i <= Math.sqrt(n); i++) {
        if (n % i === 0) {
            return 0;
        }
    }
    return 1;
};
const getAverage = function (arr) {
    if (checkInteger(arr)) {
        var cnt = 0;
        var res = 0;

        for (var value of arr) {
            if (isPrime(value)) {
                res += value;
                cnt++;
            }
        }
        console.log(
            `${
                res
                    ? `Trung bình ${cnt} số nguyên tố có trong mảng = ${
                          res / cnt
                      }`
                    : `Mảng đã cho không có số nguyên tố nào cả`
            }`
        );
    } else {
        console.log(
            `Mảng rỗng hoặc vui lòng nhập lại mảng chỉ gồm các số nguyên`
        );
    }
};
const arr02 = [2, 2, 6, 3, 4, 5, 9];
getAverage(arr02);

/*
    Bài 03
 Cho trước 1 mảng bất kỳ, nếu trong mảng có các phần tử trùng nhau thì chỉ giữa lại 1 (Gọi là lọc trùng). In ra mảng sau khi đã xử lý
*/
const arr03 = [
    "Viet",
    0,
    null,
    3.5,
    undefined,
    3.5,
    null,
    1,
    2,
    0,
    "Viet",
    "Hoang",
    undefined,
];
const filterCoincidence = function (arr) {
    if (arr.length && Array.isArray(arr)) {
        var result = [];
        for (var i = 0; i < arr.length; i++) {
            var tmp = 1;
            for (var j = 0; j < result.length; j++) {
                if (arr[i] === result[j]) {
                    tmp = 0;
                    break;
                }
            }
            if (tmp) {
                result[result.length] = arr[i];
            }
        }
        console.log("Mảng mới trở thành", result);
    } else {
        console.log(`Mảng rỗng`);
    }
};

filterCoincidence(arr03);

/**
    Bài 04
 Cho trước 1 mảng số nguyên và thực hiện các yêu cầu sau

    Bước 1: Sắp xếp mảng theo thứ tự tăng dần

    Bước 2: Chèn thêm 1 số vào bất kỳ vị trí nào trong mảng mà không làm thay đổi thứ tự sắp xếp của mảng 

 */
var numbers = [5, 1, 9, 8, 10];
var element = 4;
if (checkInteger(numbers)) {
    //Bước 1: Sắp xếp mảng theo thứ tự tăng dần
    const bubbleSort = function (arr) {
        for (var i = 0; i < arr.length - 1; i++) {
            for (var j = 0; j < arr.length - i - 1; j++) {
                if (arr[j] > arr[j + 1]) {
                    var tmp = arr[j];
                    arr[j] = arr[j + 1];
                    arr[j + 1] = tmp;
                }
            }
        }
        return arr;
    };

    bubbleSort(numbers);
    // console.log(numbers);

    //Bước 2: Chèn thêm 1 số vào bất kỳ vị trí nào trong mảng mà không làm thay đổi thứ tự sắp xếp của mảng

    function insertElement(arr, addElement) {
        //Cách 1
        let indexElement = -1;
        // Tìm index phù hợp của element
        for (let i = 0; i < arr.length; i++) {
            if (arr[i] > addElement) {
                indexElement = i;
                break;
            }
        }
        // Khi tìm được vị trí phù hợp thì dịch các phần tử từ vị trí chèn trở về sau một vị trí
        if (indexElement !== -1) {
            for (let i = arr.length; i > indexElement; i--) {
                arr[i] = arr[i - 1];
            }
            // console.log(arr);
        } else {
            indexElement = arr.length; // Nếu không tìm được thì element là gtri lớn nhất trong mảng => cho xuống cuối
        }

        arr[indexElement] = addElement;
        return arr;

        //Cách 2
        /*
         arr[arr.length] = addElement;
         bubbleSort(arr)
         return arr;
         */
    }
    console.log(insertElement(numbers, element));
} else {
    console.log(`Mảng rỗng hoặc vui lòng nhập lại mảng chỉ gồm các số nguyên`);
}
