const content = document.querySelector(".editor-content");
const boldBtn = document.querySelector(".btn-bold");
const underlineBtn = document.querySelector(".btn-underline");
const italicBtn = document.querySelector(".btn-italic");
const colorBtn = document.querySelector(".btn-color");
const char = document.querySelector(".char");
const word = document.querySelector(".word");
const filename = document.querySelector(".filename");
const fileBtn = document.querySelector(".btn-file");
const newBtn = document.querySelector(".new-btn");
const textBtn = document.querySelector(".txt-btn");
const pdfBtn = document.querySelector(".pdf-btn");
const dropMenu = document.querySelector(".drop-menu");
var initFilename = filename.value;
console.log(filename.value);

window.addEventListener("DOMContentLoaded", function () {
    content.focus();

    fileBtn.addEventListener("click", function (e) {
        e.stopPropagation();
        dropMenu.classList.toggle("drop-display");
    });
    document.addEventListener("click", function (e) {
        if (dropMenu.classList.contains("drop-display")) {
            dropMenu.classList.remove("drop-display");
        }
    });
    newBtn.addEventListener("click", function () {
        content.innerText = "";
        handleContent();
        filename.value = initFilename;
        content.focus();
    });
    textBtn.addEventListener("click", function () {
        var newName = filename.value;
        var contentText = content.innerText.trim();
        var blob = new Blob([contentText]);
        var url = URL.createObjectURL(blob);
        var a = document.createElement("a");
        a.href = url;
        a.download = `${newName}.txt`;
        a.click();
    });

    pdfBtn.addEventListener("click", function () {
        var newName = filename.value;
        html2pdf().from(content).save(`${newName}.pdf`);
    });

    boldBtn.addEventListener("click", function () {
        document.execCommand("bold");
    });
    underlineBtn.addEventListener("click", function () {
        document.execCommand("underline");
    });

    italicBtn.addEventListener("click", function () {
        document.execCommand("italic");
    });
    colorBtn.addEventListener("input", function () {
        document.execCommand("foreColor", false, this.value);
    });
    function handleContent() {
        var innerTextContent = content.innerText;
        char.children[0].innerText = innerTextContent.trim().length;
        var wordCount = innerTextContent.trim().match(/\S+/g)?.length;
        console.log(wordCount);
        word.children[0].innerText = wordCount ?? 0;
    }
    content.addEventListener("input", handleContent);
    content.addEventListener("paste", function (e) {
        e.preventDefault();
        var clipboardData = e.clipboardData;
        var pastedData = clipboardData.getData("Text");
        content.innerText = pastedData;
        handleContent();
        content.focus();
    });
});
