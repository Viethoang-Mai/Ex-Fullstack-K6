var initTimer = 30;
let speed = 1000;
var startTime = performance.now();
const btn = document.querySelector(".btn");
const time = document.querySelector(".time");
time.innerText = initTimer;

document.addEventListener("contextmenu", (e) => e.preventDefault());
document.addEventListener("keydown", (e) => {
    if (
        (e.ctrlKey && e.key === "u") ||
        (e.ctrlKey && e.shiftKey) ||
        e.key === "F12"
    ) {
        e.preventDefault();
    }
});
const step = (timestamp) => {
    let elapsedTime = timestamp - startTime;
    if (elapsedTime >= speed) {
        time.innerText = --initTimer;
        startTime = performance.now();
    }
    if (initTimer) {
        window.requestAnimationFrame(step);
    } else {
        btn.disabled = false;
        btn.style.cursor = "pointer";
        btn.style.background = "transparent";
    }
};
window.requestAnimationFrame(step);
btn.addEventListener("click", () => {
    if (initTimer === 0) {
        window.location.href = "https://fullstack.edu.vn";
    }
});
