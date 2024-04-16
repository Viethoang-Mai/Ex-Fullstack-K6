var carousel = document.querySelector(".carousel");
var carouselInner = carousel.querySelector(".carousel-inner");
var carouselDots = carousel.querySelector(".carousel-dots");
var nextBtn = carousel.querySelector(".carousel-nav .next");
var prevBtn = carousel.querySelector(".carousel-nav .prev");
var dotItem = ``;
var curr = 0;
var index = 0;
var pos = 0;
var itemWidth = carouselInner.clientWidth;

Array.from(carouselInner.children).forEach(function () {
    dotItem += `<span></span>`;
    carouselDots.innerHTML = dotItem;
});
Array.from(carouselDots.children).forEach(function (item, index) {
    item.setAttribute("data-index", index);
});
carouselDots.children[0].classList.add("active");

function slideBtn() {
    carouselInner.style.translate = `${pos}px`;
    Array.from(carouselDots.children).forEach(function (item) {
        item.classList.remove("active");
        if (parseInt(item.dataset.index) === index) {
            item.classList.add("active");
        }
    });
}

Array.from(carouselDots.children).forEach(function (item) {
    item.addEventListener("click", function (e) {
        var activated = carouselDots.querySelector("span.active");
        activated.classList.remove("active");
        item.classList.add("active");
        index = item.dataset.index;
        pos = -index * itemWidth;
        carouselInner.style.translate = `${pos}px`;
    });
});

function handleBtn(btn) {
    if (btn === -1) {
        if (index > 0) {
            index--;
            pos += itemWidth;
            slideBtn();
        }
    } else {
        if (index < carouselInner.children.length - 1) {
            index++;
            pos -= itemWidth;
            slideBtn();
        }
    }
}
nextBtn.addEventListener("click", function () {
    handleBtn(1);
});
prevBtn.addEventListener("click", function () {
    handleBtn(-1);
});

var check = false;
var pointX = 0;
var distance = 0;
var distanceRequire = 14 * (itemWidth / 100);
console.log(distanceRequire);
carouselInner.addEventListener("mousedown", function (e) {
    if (e.which === 1) {
        check = true;
        pointX = e.clientX;
        console.log(pointX);
    }
});

carouselInner.addEventListener("mousemove", function (e) {
    e.preventDefault();
    if (check) {
        this.style.transition = `none`;
        this.style.cursor = `move`;
        distance = e.clientX - pointX;
        console.log(distance);
        if (distance > distanceRequire) {
            check = false;
            handleBtn(-1);
            this.style.transition = `translate 0.35s linear`;
        } else if (distance > 0) {
            this.style.translate = `${pos + distance}px`;
        } else if (distance < -distanceRequire) {
            handleBtn(1);
            check = false;
            this.style.transition = `translate 0.35s linear`;
        } else {
            this.style.translate = `${pos + distance}px`;
        }
    }
});
carouselInner.addEventListener("mouseup", function (e) {
    check = false;
    e.preventDefault();
    this.style.cursor = `default`;
    this.style.transition = `translate 0.35s linear`;
    this.style.translate = `${pos}px`;
});
