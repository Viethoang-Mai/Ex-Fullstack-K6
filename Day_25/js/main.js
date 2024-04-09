/*
Bài 1 

*/
console.log(`Bài 1: Bài tập về nhà buổi 24`);
console.log(`Bài 2: Bài tập về nhà buổi 24`);
/*
Bài 3: Viết lại hàm push() trong Array. Đặt tên là push2() 

*/
Array.prototype.push2 = function (item) {
    return (this[this.length] = item), this.length;
};

const arrEx03 = [2, 3, 4];
const newArrEx03 = [0, 1];
const resultEx03 = newArrEx03.push2(arrEx03);
console.log(resultEx03);
console.log(newArrEx03);

/*
Bài 4: Viết làm vòng lặp filter trong Array. Đặt tên là filter2()

*/

Array.prototype.filter2 = function (cb) {
    let res = [];
    for (let i = 0; i < this.length; i++) {
        if (cb(this[i], i, this)) res[res.length] = this[i];
    }

    return res;
};
const arrEx04 = [0, 1, 2, 3, 4, 5];
const resultEx04 = arrEx04.filter2(function (value, index) {
    return value >= 2 && index > 2;
});
console.log(resultEx04);

/*
Bài 5:
Chuyển mảng sau thành dạng thẻ html select option
*/

var categories = [
    {
        id: 1,
        name: "Chuyên mục 1",
    },
    {
        id: 2,
        name: "Chuyên mục 2",
        children: [
            {
                id: 4,
                name: "Chuyên mục 2.1",
            },
            {
                id: 5,
                name: "Chuyên mục 2.2",
                children: [
                    {
                        id: 10,
                        name: "Chuyên mục 2.2.1",
                        children: [
                            {
                                id: 13,
                                name: "Chuyên mục 2.2.1.1",
                            },
                        ],
                    },
                    {
                        id: 11,
                        name: "Chuyên mục 2.2.2",
                    },
                    {
                        id: 12,
                        name: "Chuyên mục 2.2.3",
                    },
                ],
            },
            {
                id: 6,
                name: "Chuyên mục 2.3",
            },
        ],
    },
    {
        id: 3,
        name: "Chuyên mục 3",
        children: [
            {
                id: 7,
                name: "Chuyên mục 3.1",
            },
            {
                id: 8,
                name: "Chuyên mục 3.2",
            },
            {
                id: 9,
                name: "Chuyên mục 3.3",
            },
        ],
    },
];

function toRender(arr, childLevel = 0) {
    // console.log(childLevel);
    if (!arr.length || !Array.isArray(arr)) {
        return false;
    }
    var html = ``;
    arr.forEach(function (value) {
        const option = `<option value="${value.id}">${
            childLevel > 0 ? "--|".repeat(childLevel) + value.name : value.name
        }</option>`;
        html += option;
        if (value.children && value["children"].length) {
            html += toRender(value.children, childLevel + 1);
        }
    });
    return html;
}
if (!toRender(categories)) {
    console.log(`Kiểm tra dữ liệu đầu vào`);
} else {
    const result = `<select> <option value="0">Chọn chuyên mục</option> ${toRender(
        categories
    )}</select>`;
    document.write(result);
}
