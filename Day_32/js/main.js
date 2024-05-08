
const list = document.querySelector(".list");
var moduleIndex = 0;
var itemIndex = 0;

const sortable = function (list, dragOver) {
    var dragEl;
    render(list);
    const onDragOver = (event) => {
        event.preventDefault();
        var target = event.target;
        if (target && target.nodeName === "DIV") {
            var rect = target.getBoundingClientRect();
            var offset = event.pageY - rect.top;
            var middleY = (rect.bottom - rect.top) / 2;
            if (offset > middleY) {
                if (target.nextSibling.parentElement === list) {
                    list.insertBefore(dragEl, target.nextSibling);
                }
            } else {
                if (target.parentElement === list) {
                    list.insertBefore(dragEl, target);
                }
            }
        }
    };

    const onDragEnd = (event) => {
        event.preventDefault();
        list.removeEventListener("dragover", onDragOver);
        list.removeEventListener("dragend", onDragEnd);
        dragEl.classList.remove("dragging");
        dragOver(dragEl);
    };

    list.addEventListener("dragstart", function (e) {
        dragEl = e.target;
        list.addEventListener("dragover", onDragOver);
        list.addEventListener("dragend", onDragEnd);
        dragEl.classList.add("dragging");
    });
};

var render = (list) => {
    Array.from(list.children).forEach((item) => {
        item.setAttribute("draggable", "true");
        var title = "Bài";
        if (item.classList.contains("module")) {
            title = "Module";
            moduleIndex++;
        } else {
            itemIndex++;
        }

        if (!item.children.length) {
            item.innerHTML = `${title} ${
                title === "Module" ? moduleIndex : itemIndex
            }: <span>${item.innerText}</span>`;
        } else {
            item.innerHTML = `${title} ${
                title === "Module" ? moduleIndex : itemIndex
            }: <span>${item.children[0].innerText}</span>`;
        }
    });
};

sortable(list, () => {
    itemIndex = 0;
    moduleIndex = 0;
    render(list);
});
