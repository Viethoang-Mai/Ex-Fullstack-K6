const SpeechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition;

const micro = document.querySelector(".micro");
const begin = document.querySelector(".begin");

const recognition = new SpeechRecognition();
recognition.continuous = false;
recognition.lang = "vi-VN";
recognition.interimResults = false;
recognition.maxAlternatives = 1;

const handleCommands = function (keyword) {
    const commands = {
        google: "https://google.com",
        facebook: "https://facebook.com",
        youtube: "https://youtube.com",
        "google drive": "https://drive.google.com",
        "google maps": "https://maps.google.com",
        "bản đồ": "https://maps.google.com",
    };
    if (commands[keyword]) {
        window.open(commands[keyword]);
        return true;
    }
    const details = {
        zingMp3: ["bài hát", "mở bài hát", "nghe bài hát"],
        youtube: ["video", "mở video", "xem video"],
        maps: ["chỉ đường", "chỉ đường tới", "đường tới", "tới"],
    };
    let checkZing = false;
    let checkMaps = false;
    let checkYoutube = false;
    details.zingMp3.forEach((item) => {
        if (keyword.includes(item)) {
            checkZing = true;
            keyword = keyword
                .replace(/bài hát|mở bài hát|nghe bài hát/g, "")
                .trim();
            return;
        }
    });
    details.youtube.forEach((item) => {
        if (keyword.includes(item)) {
            checkYoutube = true;
            keyword = keyword.replace(/video|mở video|xem video/g, "").trim();
            return;
        }
    });
    details.maps.forEach((item) => {
        if (keyword.includes(item)) {
            checkMaps = true;
            keyword = keyword
                .replace(/mở đường|chỉ đường tới|đường tới|tới/g, "")
                .trim();
            return;
        }
    });

    if (checkZing) {
        const urlZing = `https://zingmp3.vn/tim-kiem/tat-ca?q=${keyword}`;
        window.open(urlZing);
        return true;
    }
    if (checkYoutube) {
        const keywordEl = keyword.replaceAll(" ", "+");
        const urlYoutube = `https://www.youtube.com/results?search_query=${keywordEl}`;
        window.open(urlYoutube);
        return true;
    }
    if (checkMaps) {
        const keywordEl = keyword.replaceAll(" ", "+");
        const urlMap = `https://www.google.com/maps/search/${keywordEl}`;
        window.open(urlMap);
        return true;
    }

    return false;
};

const handleStart = function () {
    recognition.start();
    micro.classList.add("click");
    begin.innerText = "Listening ...";
};
const handleResult = (event) => {
    const keyword = event.results[0][0].transcript.toLowerCase().trim();
    let check = handleCommands(keyword);
    begin.innerHTML = `Searching for <i><b>${keyword}</b><i> ...`;

    if (!check) {
        setTimeout(() => {
            begin.innerHTML = `<p style="color:#d84444">Sorry. I didn't recognize those words</p>`;
            micro.classList.remove("click");
        }, 1000);
        return;
    } else {
        begin.innerText = `Searching for ${keyword} ...`;
        setTimeout(() => {
            begin.innerText = "Done!";
        }, 500);
        micro.classList.remove("click");
    }
};
const handleEnd = function () {
    recognition.stop();
};

micro.addEventListener("click", function (e) {
    handleStart();
});
recognition.onspeechend = () => {
    handleEnd();
};
recognition.onresult = (event) => {
    handleResult(event);
};
