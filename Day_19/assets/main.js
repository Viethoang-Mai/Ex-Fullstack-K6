var paragraph = `Giờ mới biết làm gì có ai yêu mãi một người em ơi`;
paragraph = paragraph.replaceAll(" ", `</span> <span>`);
paragraph = `<span>${paragraph}</span>`;
var i = 0;
setInterval(function () {
    var index = paragraph.charAt(i);
    var nextIndex = paragraph.charAt(i + 1);
    if (index === ">" && nextIndex !== " ") {
        var newPara =
            paragraph.slice(0, i) + ` class="highlight"` + paragraph.slice(i);
        document.body.innerHTML = newPara;
    }
    i++;
    if (i === paragraph.length) {
        i = 0;
    }
}, 50);
document.write(paragraph);
