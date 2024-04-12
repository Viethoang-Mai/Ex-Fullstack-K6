function $(tag) {
    return document.querySelector(tag);
}
var btn = $(".todo-btn");
var mainTodo = $(".todo-main");
var listItem = $(".list-item");

var form = $(".form");
var input = $(".todo-input");

function addTask(e) {
    e.preventDefault();
    var contentIp = input.value.trim();
    if (contentIp === "") {
        alert("Vui lòng nhập lại dữ liệu");
        input.value = "";
        return;
    } else {
        const li = document.createElement("li");
        li.innerHTML = `<div class="item"><span >${contentIp}</span> 
            <div class=btn-item>
            <i class="fa-solid fa-pen-to-square"></i>
            <i class="fa-solid fa-trash"></i>
            </div></div><form action="" class="form form-edit">
                        <input
                            type="text"
                            class="todo-input"
                        />
                        <button type="submit" class="todo-btn">Add Task</button>
                </form>
             `;
        listItem.appendChild(li);
        input.value = "";
        input.focus();
    }

    var deletes = listItem.querySelectorAll(".item i.fa-trash");
    var edits = listItem.querySelectorAll(".item i.fa-pen-to-square");
    var formEdits = listItem.querySelectorAll(".form");
    var itemAll = listItem.querySelectorAll(".item");
    var liEls = listItem.querySelectorAll("li");
    var inputs = listItem.querySelectorAll(".todo-input");
    var spans = listItem.querySelectorAll(".item  span");
    edits.forEach(function (value, index) {
        value.addEventListener("click", function (e) {
            itemAll[index].style.display = "none";
            formEdits[index].style.display = "flex";
            inputs[index].value = spans[index].innerText.trim();
            inputs[index].focus();
        });
        formEdits[index].addEventListener("submit", function (e) {
            e.preventDefault();
            itemAll[index].style.display = "flex";
            formEdits[index].style.display = "none";
            spans[index].innerText = inputs[index].value;
        });
    });
    deletes.forEach(function (value, index) {
        value.addEventListener("click", function (e) {
            liEls[index].remove();
        });
    });
}
listItem.addEventListener("click", function (e) {
    if (e.target.tagName === "SPAN") {
        e.target.classList.toggle("todo-complete");
    }
});
form.addEventListener("submit", addTask);
