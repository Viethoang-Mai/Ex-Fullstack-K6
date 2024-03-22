/*
 Bài 1: Lấy kết quả giao giữa 2 mảng

*/

var arrA = [1, 4, 3, 2];
var arrB = [5, 2, 6, 7, 1];
const getCoincidence = function (arr1, arr2) {
    if (
        Array.isArray(arr1) &&
        Array.isArray(arr2) &&
        arr1.length &&
        arr2.length
    ) {
        var newArr1 = arr1.filter(function (value) {
            return arr2.includes(value);
        });
        if (newArr1.length) {
            console.log(`Mảng phần phần tử trùng nhau: `, newArr1);
        } else console.log("Hai mảng không có phần tử giống nhau");
    } else console.log(`Mảng rỗng hoặc một trong 2 không phải mảng`);
};
getCoincidence(arrA, arrB);

/*
    Bài 2
Làm phẳng array sau (Chuyển về mảng 1 chiều) Không được sử dụng flat()

var arr = [0, 1, [2, 3], [4, 5, [6, 7]], [8, [9, 10, [11, 12]]]];
Kết quả

[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
*/
var arrC = [0, 1, [2, 3], [4, 5, [6, 7]], [8, [9, 10, [11, 12]]]];
const flatArr = function (arr) {
    if (arr.length && Array.isArray(arr)) {
        var newArr2 = [];
        arr.forEach(function (value) {
            Array.isArray(value)
                ? (newArr2 = newArr2.concat(flatArr(value)))
                : newArr2.push(value);
        });
        return newArr2;
    } else {
        console.log(`Mảng rỗng hoặc không phải mảng`);
    }
};
console.log(flatArr(arrC));

/*
    Bài 3
Tách phần tử trong mảng theo đúng kiểu dữ liệu

var arr = [["a", 1, true], ["b", 2, false]]
Kết quả

[["a", "b"], [1, 2], [true, false]]
*/

var arrC = [
    [1, "a", true, undefined, {}],
    ["b", 2, false, null, function () {}],
    [function () {}, null, undefined, []],
];
function getTypeOf(arr) {
    if (arr.length && Array.isArray(arr)) {
        var res = [];
        arr.map(function (value) {
            value.map(function (inValue) {
                if (!res[typeof inValue]) res[typeof inValue] = [];
                res[typeof inValue].push(inValue);
                // console.log(res);
            });
        });
        var newArrC = [];
        for (let index in res) newArrC.push(res[index]);
        console.log(newArrC);
    } else {
        console.log(`Mảng rỗng hoặc không phải mảng`);
    }
}

getTypeOf(arrC);

/**
    Bài 04
 */

const arrD = [
    [
        "./assets/img/image.jpg",
        "Tiêu đề bài viết 1",
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolore debitis blanditiis, ipsa unde excepturi libero at sapiente adipisci consequuntur earum reprehenderit, voluptates neque facere id pariatur voluptatum nihil minus? Dignissimos!Lorem ipsum dolor sit amet consectetur adipisicing elit.",
    ],
    [
        "./assets/img/image.jpg",
        "Tiêu đề bài viết 2",
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolore debitis blanditiis, ipsa unde excepturi libero at sapiente adipisci consequuntur earum reprehenderit, voluptates neque facere id pariatur voluptatum nihil minus? Dignissimos!Lorem ipsum dolor sit amet consectetur adipisicing elit.",
    ],
    [
        "./assets/img/image.jpg",
        "Tiêu đề bài viết 3",
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolore debitis blanditiis, ipsa unde excepturi libero at sapiente adipisci consequuntur earum reprehenderit, voluptates neque facere id pariatur voluptatum nihil minus? Dignissimos!Lorem ipsum dolor sit amet consectetur adipisicing elit.",
    ],
    [
        "./assets/img/image.jpg",
        "Tiêu đề bài viết 4",
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolore debitis blanditiis, ipsa unde excepturi libero at sapiente adipisci consequuntur earum reprehenderit, voluptates neque facere id pariatur voluptatum nihil minus? Dignissimos!Lorem ipsum dolor sit amet consectetur adipisicing elit.",
    ],
];
const render = function (arr) {
    if (arr.length && Array.isArray(arr)) {
        document.write(`<div class="container">`);
        arr.forEach(function (value, index) {
            var display = `<div class="image"><img src="${value[0]}" alt="image"></div> <div class="info"> <h2 class="title">${value[1]}</h2> <p class="desc">${value[2]}</p></div>`;
            if (index % 2 === 0) {
                document.write(`<div class="content"> ${display}</div>`);
            } else {
                document.write(
                    `<div class="content" style="flex-direction:row-reverse"> ${display}</div>`
                );
            }
        });
        document.write(`</div>`);
    } else console.log(`Mảng rỗng`);
};
render(arrD);
