function $(tagname) {
    return document.querySelector(tagname);
}
var player = $(".player");
var playerAction = player.querySelector(".player-action");
var progressBar = player.querySelector(".progress-bar");
var progress = progressBar.querySelector(".progress");
var progressSpan = progress.children[0];
var hoverTimer = progressBar.querySelector(".hover-timer");
var progressBarWidth = progressBar.clientWidth;
var check = true;

progressBar.addEventListener("mousedown", function (e) {
    if (e.which === 1) {
        dragSpace = e.offsetX;
        var rate = (dragSpace * 100) / progressBarWidth;
        progress.style.width = `${rate}%`;
        initialClientX = e.clientX;
        currentSpace = dragSpace;
        document.addEventListener("mousemove", handleDrag);
        currentTimeEl.innerText = getTime(
            audio.duration * (dragSpace / progressBarWidth)
        );
        audio.currentTime = audio.duration * (dragSpace / progressBarWidth);
    }
});
var initialClientX = 0;
var currentSpace = 0;
var dragSpace = 0;

function handleDrag(e) {
    check = false;
    var clientX = e.clientX;
    dragSpace = clientX - initialClientX + currentSpace;
    var checkDragSpace = dragSpace < 0 ? 0 : dragSpace;
    currentTimeEl.innerText = getTime(
        audio.duration * (checkDragSpace / progressBarWidth)
    );
    var rate = (dragSpace * 100) / progressBarWidth;
    if (rate > 100) {
        rate = 100;
    }
    if (rate < 0) {
        rate = 0;
    }
    progress.style.width = `${rate}%`;
}
progressSpan.addEventListener("mousedown", function (e) {
    e.stopPropagation();
    check = false;
    if (e.which === 1) {
        initialClientX = e.clientX;
        document.addEventListener("mousemove", handleDrag);
    }
});
document.addEventListener("mouseup", function (e) {
    check = true;
    e.stopPropagation();
    document.removeEventListener("mousemove", handleDrag);
    currentSpace = dragSpace;
    audio.currentTime = audio.duration * (currentSpace / progressBarWidth);
});
playerAction.addEventListener("mouseup", function (e) {
    e.stopPropagation();
});
var audio = $("audio");
var durationEl = progressBar.nextElementSibling;
var currentTimeEl = progressBar.previousElementSibling;
function getTime(seconds) {
    var mins = Math.floor(seconds / 60);
    seconds = Math.floor(seconds - mins * 60);
    return `${mins < 10 ? "0" + mins : mins}:${
        seconds < 10 ? "0" + seconds : seconds
    }`;
}
window.addEventListener("load", function () {
    durationEl.innerText = getTime(audio.duration);
    playerAction.addEventListener("click", function (e) {
        if (audio.paused) {
            audio.play();
            playerAction.children[0].classList.replace("fa-play", "fa-pause");
            console.log(audio.currentTime);
        } else {
            audio.pause();

            playerAction.children[0].classList.replace("fa-pause", "fa-play");
        }
    });
    audio.addEventListener("timeupdate", function () {
        if (check) {
            currentTimeEl.innerText = getTime(audio.currentTime);
        }
        var rate = (dragSpace * 100) / progressBarWidth;
        progress.style.width = `${rate}%`;
    });
    progressBar.addEventListener("mouseover", function (e) {
        hoverTimer.style.display = "block";
        progressBar.addEventListener("mousemove", function (e) {
            var offsetX = e.offsetX;
            var timeNow = audio.duration * (offsetX / progressBarWidth);
            hoverTimer.style.left = `${offsetX}px`;
            hoverTimer.innerText = getTime(timeNow);
        });
    });
    progressBar.addEventListener("mouseout", function (e) {
        hoverTimer.style.display = "none";
    });
    progressSpan.addEventListener("mouseover", function (e) {
        {
            e.stopPropagation();
        }
    });
});
