import { config } from "./config.js";
const { SERVER_API } = config;
let isScroll = false;
let limitItems;
import { httpClient } from "./client.js";
const mainContent = document.querySelector(".meals-inner");
const overLoading = document.querySelector(".over-loading");
const query = {
    _limit: 6,
    _page: 1,
};

const render = (data) => {
    data.forEach(({ name, price, description, img }) => {
        const item = document.createElement("div");
        item.classList.add("item");
        const html = `<div><p class="font-medium text-md mt-2">${name}</p>
        <p class="font-light text-xs my-2">${description}</p>
    <p class="font-semibold text-md mt-5 ">${price}</p></div>
    <img class="object-cover h-full w-32" src=${img} alt="food">`;
        item.innerHTML = html;
        mainContent.append(item);
    });
};
const getData = async () => {
    if (isScroll) return;
    limitItems = mainContent.children.length;
    isScroll = true;
    overLoading.style.display = "flex";
    try {
        const keyword = new URLSearchParams(query).toString();
        const { response, data } = await httpClient.get(
            `${SERVER_API}/menu?${keyword}`
        );
        if (!response.ok) {
            throw new Error("Failed to load");
        }
        render(data);
        query._page++;
    } catch (error) {
        console.log(error);
    } finally {
        isScroll = false;
        overLoading.style.display = "none";
    }
};
const handleScroll = () => {
    const { scrollTop, scrollHeight, clientHeight } = mainContent;
    if (
        scrollTop + clientHeight >= scrollHeight - 10 &&
        limitItems < mainContent.children.length
    ) {
        getData();
    }
};
mainContent.addEventListener("scroll", handleScroll);
getData();
