var cart = document.querySelector("#cart");
var table = document.querySelector("#product-table");
var cartData = document.querySelector("#cart-data");
var index = 0;
var check = true;
var products = [
    {
        id: 1,
        name: "Sản phẩm 1",
        price: 1000,
    },
    {
        id: 2,
        name: "Sản phẩm 2",
        price: 2000,
    },
    {
        id: 3,
        name: "Sản phẩm 3",
        price: 3000,
    },
    {
        id: 4,
        name: "Sản phẩm 4",
        price: 4000,
    },
];
let listCarts = localStorage.getItem("products")
    ? JSON.parse(localStorage.getItem("products"))
    : [];

console.log(table);

products.forEach(function (product) {
    var addProduct = F8.createElement(
        "tbody",
        {},
        F8.createElement(
            "tr",
            {},
            F8.createElement("td", {}, product.id),
            F8.createElement("td", {}, product.name),
            F8.createElement("td", {}, product.price.toLocaleString()),
            F8.createElement(
                "td",
                {},
                F8.createElement("input", {
                    type: "number",
                    value: "1",
                    id: `quantity-${product.id}`,
                    style: "width:90%; display:block;margin:0 auto",
                }),
                F8.createElement(
                    "button",
                    {
                        type: "button",
                        className: `add-to-cart-${product.id}`,
                        style: "width:90% ",
                        onClick: function () {
                            var quantity = this.previousElementSibling.value;
                            addToCart(product.id, +quantity);
                            renderCart();
                        },
                    },
                    "Thêm vào giỏ"
                )
            )
        )
    );
    F8DOM.render(table, addProduct);
});
function getProduct(id) {
    return products.find(function (product) {
        return +product.id === +id;
    });
}

function addToCart(productId, quantity) {
    if (quantity < 0 || Number.isNaN(quantity)) quantity = 1;
    let index = listCarts.findIndex(function (value) {
        return value.productId === productId;
    });
    if (index === -1) {
        listCarts.push({ productId, quantity });
    } else {
        listCarts[index].quantity += quantity;
    }
    // console.log(productId, +quantity);
    console.log(listCarts);
}

function renderCart() {
    if (check) {
        var tableResult = F8.createElement(
            "table",
            { id: "cart-table", width: "100%" },
            F8.createElement(
                "thead",
                {},
                F8.createElement(
                    "tr",
                    { display: "block", padding: "5px 0" },
                    F8.createElement("th", { width: "10%" }, "STT"),
                    F8.createElement("th", {}, "Tên sản phẩm"),
                    F8.createElement("th", { width: "10%" }, "Giá"),
                    F8.createElement("th", {}, "Số lượng"),
                    F8.createElement("th", {}, "Thành tiền"),
                    F8.createElement("th", { width: "10%" }, "Xóa")
                )
            )
        );
        F8DOM.render(cartData, tableResult);
        check = false;
    }

    var cartTable = cartData.querySelector("#cart-table");

    listCarts.forEach(function (cart, index) {
        let product = getProduct(cart.productId);
        console.log(product);
        var addProduct = F8.createElement(
            "tbody",
            {},
            F8.createElement(
                "tr",
                {},
                F8.createElement("td", {}, index + 1),
                F8.createElement("td", {}, product.name),
                F8.createElement("td", {}, product.price),
                F8.createElement(
                    "td",
                    {},
                    F8.createElement("input", {
                        type: "number",
                        value: `${cart.quantity}`,
                        id: `quantity-${product.id}`,
                        style: "width:90%; display:block;margin:0 auto",
                    })
                ),
                F8.createElement(
                    "td",
                    {},
                    `${(product.price * cart.quantity).toLocaleString()}`
                ),
                F8.createElement(
                    "td",
                    {},
                    F8.createElement(
                        "button",
                        {
                            type: "button",
                            className: `remove-to-cart-${product.id}`,
                            style: "width:90% ",
                            onClick: function () {},
                        },
                        "Xóa"
                    )
                )
            )
        );

        cartTable.append(addProduct);
        return;
    });
}
