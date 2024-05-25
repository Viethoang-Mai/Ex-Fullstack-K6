import { config } from "./config.js";
const { SERVER_API } = config;
import { debounce } from "./debounce.js";
const todoEl = document.querySelector(".todo-list");
const formEl = document.querySelector(".form");

const getTask = async () => {
    const response = await fetch(`${SERVER_API}/task`);
    const data = await response.json();
    render(data);
};
const renderTask = (name, id) => {
    return `<div
    class="mt-2.5 flex w-full items-center justify-between bg-white p-4 rounded-lg border border-gray-200 shadow " data-id=${id}
    >
    <span class="font-normal text-gray-700"
        >${name}</span
    >
    <div class="flex gap-2 " data-id=${id}>
        <button
            type="button"
            class="flex h-10 w-10 items-center justify-center rounded-lg bg-rose-700 hover:bg-rose-800 focus:outline-none focus:ring-4 focus:ring-rose-300 btn-delete "
        >
            <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-4 w-4 svg-delete"
                viewBox="0 0 448 512" 
            >
                <path
                    class="fill-white path-delete"
                    d="M170.5 51.6L151.5 80h145l-19-28.4c-1.5-2.2-4-3.6-6.7-3.6H177.1c-2.7 0-5.2 1.3-6.7 3.6zm147-26.6L354.2 80H368h48 8c13.3 0 24 10.7 24 24s-10.7 24-24 24h-8V432c0 44.2-35.8 80-80 80H112c-44.2 0-80-35.8-80-80V128H24c-13.3 0-24-10.7-24-24S10.7 80 24 80h8H80 93.8l36.7-55.1C140.9 9.4 158.4 0 177.1 0h93.7c18.7 0 36.2 9.4 46.6 24.9zM80 128V432c0 17.7 14.3 32 32 32H336c17.7 0 32-14.3 32-32V128H80zm80 64V400c0 8.8-7.2 16-16 16s-16-7.2-16-16V192c0-8.8 7.2-16 16-16s16 7.2 16 16zm80 0V400c0 8.8-7.2 16-16 16s-16-7.2-16-16V192c0-8.8 7.2-16 16-16s16 7.2 16 16zm80 0V400c0 8.8-7.2 16-16 16s-16-7.2-16-16V192c0-8.8 7.2-16 16-16s16 7.2 16 16z"
                ></path>
            </svg></button
        ><button
            type="button"
            class="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 btn-edit"data-id=${id}
        >
            <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-4 w-4 svg-edit"
                viewBox="0 0 512 512"
                style="margin-right: -1px"
            >
                <path
                    class="fill-white path-edit"
                    d="M471.6 21.7c-21.9-21.9-57.3-21.9-79.2 0L362.3 51.7l97.9 97.9 30.1-30.1c21.9-21.9 21.9-57.3 0-79.2L471.6 21.7zm-299.2 220c-6.1 6.1-10.8 13.6-13.5 21.9l-29.6 88.8c-2.9 8.6-.6 18.1 5.8 24.6s15.9 8.7 24.6 5.8l88.8-29.6c8.2-2.7 15.7-7.4 21.9-13.5L437.7 172.3 339.7 74.3 172.4 241.7zM96 64C43 64 0 107 0 160V416c0 53 43 96 96 96H352c53 0 96-43 96-96V320c0-17.7-14.3-32-32-32s-32 14.3-32 32v96c0 17.7-14.3 32-32 32H96c-17.7 0-32-14.3-32-32V160c0-17.7 14.3-32 32-32h96c17.7 0 32-14.3 32-32s-14.3-32-32-32H96z"
                ></path>
            </svg></button
        ><button
            type="button"
            class="bg-gray-400 flex h-10 w-10 items-center justify-center rounded-lg hover:bg-emerald-800 focus:outline-none focus:ring-4 focus:ring-emerald-300 complete-btn"data-id=${id}
        >
            <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-4 w-4 svg-complete"
                viewBox="0 0 576 512"
            >
                <path
                    class="fill-white path-complete"
                    d="M96 80c0-26.5 21.5-48 48-48H432c26.5 0 48 21.5 48 48V384H96V80zm313 47c-9.4-9.4-24.6-9.4-33.9 0l-111 111-47-47c-9.4-9.4-24.6-9.4-33.9 0s-9.4 24.6 0 33.9l64 64c9.4 9.4 24.6 9.4 33.9 0L409 161c9.4-9.4 9.4-24.6 0-33.9zM0 336c0-26.5 21.5-48 48-48H64V416H512V288h16c26.5 0 48 21.5 48 48v96c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V336z"
                ></path>
            </svg>
        </button>
    </div>
    </div>`;
};
let completeTask = [];

const render = (todo) => {
    todoEl.innerHTML = `
<div class="flex min-h-screen items-center bg-gray-50">
    <div class="mx-auto w-full max-w-3xl px-4 py-6">
    <h1 class="py-3 text-center text-4xl font-bold text-gray-900">
        <span
            class="bg-gradient-to-r from-blue-400 to-emerald-600 bg-clip-text text-transparent"
            >Smatyx</span
        >&nbsp;<span>Todos App</span>
    </h1>
    <div class="pt-5">
        <div class="flex items-center gap-3">
            <div class="relative w-full">
                <input
                    type="search"
                    class="w-full bg-gray-50 p-4 rounded-lg border border-gray-300 text-gray-900 focus:border-blue-500 focus:ring-blue-500 input-search"
                    placeholder="Search Todos"
                    value="${query.q ?? ""}"
                /><button
                    type="button"
                    class="absolute bottom-2 right-2 top-2 rounded-lg bg-blue-700 px-4 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300"
                >
                    <svg
                        class="w-4 h-4"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 512 512"
                    >
                        <path
                            class="fill-white"
                            d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z"
                        ></path>
                    </svg>
                </button>
            </div>
            <button
                type="button"
                class="rounded-lg bg-emerald-700 px-4 py-2.5 font-medium text-white hover:bg-emerald-800 focus:outline-none focus:ring-4 focus:ring-emerald-300 add-todo"
            >
                Add&nbsp;Todos
            </button>
        </div>
    </div>
    <div class="py-3">
        ${todo
            .filter(({ status }) => status === false)
            .map(({ name, id }) => renderTask(name, id))
            .join("")}
        <button
            type="button"
            class="bg-gray-400 hover:bg-gray-500 focus:ring-emerald-300 mt-2.5 flex items-center gap-2 rounded-lg px-4 py-2.5 transition-all focus:outline-none focus:ring-4 show-complete"
        >
            <span class="font-medium text-white"
                >Completed Todos ${
                    (completeTask = todo.filter(
                        ({ status }) => status === true
                    )).length
                }</span
            ><svg
                xmlns="http://www.w3.org/2000/svg"
                class="-rotate-90 h-4 w-4 transition-all"
                viewBox="0 0 512 512"
            >
                <path
                    class="fill-white"
                    d="M256 464a208 208 0 1 1 0-416 208 208 0 1 1 0 416zM256 0a256 256 0 1 0 0 512A256 256 0 1 0 256 0zM376.9 294.6c4.5-4.2 7.1-10.1 7.1-16.3c0-12.3-10-22.3-22.3-22.3H304V160c0-17.7-14.3-32-32-32l-32 0c-17.7 0-32 14.3-32 32v96H150.3C138 256 128 266 128 278.3c0 6.2 2.6 12.1 7.1 16.3l107.1 99.9c3.8 3.5 8.7 5.5 13.8 5.5s10.1-2 13.8-5.5l107.1-99.9z"
                ></path>
            </svg>
        </button>
        <div class="complete-task close">
        ${todo
            .filter(({ status }) => status === true)
            .map(({ name, id }) =>
                renderTask(name, id).replace("bg-gray-400", "bg-emerald-700")
            )

            .join("")}
        </div>
        
    </div>
</div>
</div>`;
};
const addTodo = async (data) => {
    const response = await fetch(`${SERVER_API}/task`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });
    if (!response.ok) {
        alert("có lỗi");
        return;
    }
    getTask();
};

const deleteTask = async (id) => {
    const response = await fetch(`${SERVER_API}/task/${id}`, {
        method: "DELETE",
    });
    if (!response.ok) {
        alert("Có lỗi");
        return;
    }
    getTask();
};
const editTask = async (data, id) => {
    const response = await fetch(`${SERVER_API}/task/${id}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });
    if (!response.ok) {
        alert("Có lỗi");
        return;
    }
    getTask();
    formEl.removeAttribute("data-id");
};

todoEl.addEventListener("click", (e) => {
    e.preventDefault();
    if (
        e.target.classList.contains("show-complete") ||
        e.target.parentElement.classList.contains("show-complete")
    ) {
        const btn = document.querySelector(".show-complete");
        const svg = btn.querySelector("svg");
        if (btn.classList.contains("bg-gray-400")) {
            btn.classList.remove("bg-gray-400", "hover:bg-gray-500");
            btn.classList.add("bg-emerald-700", "hover:bg-emerald-800");
            btn.classList.replace(
                "focus:ring-gray-100",
                "focus:ring-emerald-300"
            );
            svg.classList.replace("-rotate-90", "rotate-0");
        } else {
            btn.classList.remove("bg-emerald-700", "hover:bg-emerald-800");
            btn.classList.add("bg-gray-400", "hover:bg-gray-500");
            btn.classList.replace(
                "focus:ring-emerald-300",
                "focus:ring-gray-100"
            );
            svg.classList.replace("rotate-0", "-rotate-90");
        }
        btn.nextElementSibling.classList.toggle("close");
    }
    if (e.target.classList.contains("add-todo")) {
        renderForm();
    }
    if (
        e.target.classList.contains("btn-delete") ||
        e.target.classList.contains("svg-delete") ||
        e.target.classList.contains("path-delete")
    ) {
        const id = e.target.parentElement.parentElement.dataset.id;
        if (confirm("Bạn muốn xóa task này?")) {
            deleteTask(id);
        }
    }
    if (
        e.target.classList.contains("btn-edit") ||
        e.target.classList.contains("svg-edit") ||
        e.target.classList.contains("path-edit")
    ) {
        const id = e.target.parentElement.parentElement.dataset.id;
        formEl.dataset.id = id;
        getATask(id);
    }
    if (
        e.target.classList.contains("complete-btn") ||
        e.target.classList.contains("svg-complete") ||
        e.target.classList.contains("path-complete")
    ) {
        const id = e.target.parentElement.parentElement.dataset.id;
        toComplete(id);
    }
});
const query = {};
todoEl.addEventListener("keyup", (e) => {
    if (e.target.classList.contains("input-search")) {
        const value = e.target.value;
        handleSearch(value);
    }
});

const renderForm = (data = {}) => {
    formEl.innerHTML = `<div class="fixed bottom-0 left-0 right-0 top-0 z-50 flex items-center justify-center bg-gray-700/60 p-4">
    <div class="w-full max-w-md">
        <form class="rounded-lg bg-white shadow"><div class="p-6">
            <input required="" type="text" class="w-full bg-gray-50 p-4 rounded-lg border border-gray-300 text-gray-900 focus:border-blue-500 focus:ring-blue-500" placeholder="${
                data.placeholder ?? "Add Todos"
            }" value="${data.value ?? ""}">
    </div>
    <div class="flex items-center justify-center space-x-8 p-4 rounded-b border-t border-gray-200"><button type="submit" class="rounded-lg bg-emerald-700 px-5 py-2.5 text-center font-medium text-white hover:bg-emerald-800 focus:outline-none focus:ring-4 focus:ring-emerald-300">Save</button><button type="button" class="bg-white px-5 py-2.5 rounded-lg border border-gray-200 font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-900 focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-200 cancel-form">Cancel</button></div></form></div></div>`;
};
formEl.addEventListener("submit", (e) => {
    e.preventDefault();
    const inputEl = formEl.querySelector("input");

    if (inputEl.value) {
        if (formEl.dataset.id) {
            const id = formEl.dataset.id;
            editTask({ name: inputEl.value }, id);
        } else {
            addTodo({
                name: inputEl.value,
                status: false,
            });
        }

        formEl.innerHTML = ``;
    }
});

formEl.addEventListener("click", (e) => {
    if (e.target.classList.contains("cancel-form")) {
        formEl.innerHTML = ``;
    }
});

const getATask = async (id) => {
    const response = await fetch(`${SERVER_API}/task/${id}`);
    const data = await response.json();
    const name = data.name;
    renderForm({
        placeholder: "Edit Todo",
        value: name,
    });
};
const toComplete = async (id) => {
    const response = await fetch(`${SERVER_API}/task/${id}`);
    const data = await response.json();
    if (data.status) {
        data.status = false;
    } else {
        data.status = true;
    }

    editTask(data, id);
};
const getTodoBySearch = async () => {
    const keyword = new URLSearchParams(query).toString();
    const response = await fetch(`${SERVER_API}/task?${keyword}`);
    const data = await response.json();
    render(data);
};

const handleSearch = debounce((value) => {
    query.q = value;
    getTodoBySearch();
}, 500);

getTask();
