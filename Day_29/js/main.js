window.addEventListener("load", function () {
    function $(tagname) {
        return document.querySelector(tagname);
    }

    var player = $(".player");
    var playerAction = player.querySelector(".player-action ");
    var progressBar = player.querySelector(".progress-bar");
    var progress = progressBar.querySelector(".progress");
    var progressSpan = progress.children[0];
    var hoverTimer = progressBar.querySelector(".hover-timer");
    var progressBarWidth = progressBar.clientWidth;
    var check = true;
    var rate = 0;

    progressBar.addEventListener("mousedown", function (e) {
        if (e.which === 1) {
            check = false;
            dragSpace = e.offsetX < 0 ? 0 : e.offsetX;

            rate = (dragSpace * 100) / progressBarWidth;

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
        rate = (dragSpace * 100) / progressBarWidth;
        if (rate > 100) {
            rate = 100;
            dragSpace = 0;
            currentTimeEl.innerText = getTime(audio.duration);
        }

        if (rate < 0) {
            rate = 0;
        }
        progress.style.width = `${rate}%`;
    }

    progressSpan.addEventListener("mousedown", function (e) {
        e.stopPropagation();

        if (e.which === 1) {
            check = false;
            initialClientX = e.clientX;
            document.addEventListener("mousemove", handleDrag);
        }
    });

    document.addEventListener("mouseup", function (e) {
        e.stopPropagation();
        if (!check) {
            document.removeEventListener("mousemove", handleDrag);
            currentSpace = dragSpace;
            audio.currentTime =
                audio.duration * (currentSpace / progressBarWidth);
            check = true;
            if (rate === 100) {
                dragSpace = 0;
                audio.pause();
                audio.currentTime = 0;
                currentTimeEl.innerText = getTime(audio.currentTime);
                playerAction.children[0].classList.replace(
                    "fa-pause",
                    "fa-play"
                );
            }
        }
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
        return `${
            mins < 10 ? "0" + mins : mins
        }:${seconds < 10 ? "0" + seconds : seconds}`;
    }

    durationEl.innerText = getTime(audio.duration);
    playerAction.children[0].addEventListener("click", function (e) {
        if (audio.paused) {
            audio.play();
            playerAction.children[0].classList.replace("fa-play", "fa-pause");
        } else {
            audio.pause();

            playerAction.children[0].classList.replace("fa-pause", "fa-play");
        }
    });

    audio.addEventListener("timeupdate", function () {
        if (check) {
            currentTimeEl.innerText = getTime(audio.currentTime);
            rate = (audio.currentTime * 100) / audio.duration;
            progress.style.width = `${rate}%`;
        }
    });

    audio.addEventListener("ended", function () {
        dragSpace = 0;
        audio.currentTime = 0;
        currentTimeEl.innerText = getTime(audio.currentTime);
        playerAction.children[0].classList.replace("fa-pause", "fa-play");
    });

    progressBar.addEventListener("mouseover", function (e) {
        hoverTimer.style.display = "block";
        progressBar.addEventListener("mousemove", function (e) {
            var offsetX = e.offsetX;
            offsetX = offsetX < 0 ? 0 : offsetX;
            var timeNow = audio.duration * (offsetX / progressBarWidth);
            hoverTimer.style.left = `${offsetX}px`;
            hoverTimer.innerText = getTime(timeNow);
        });
        progressSpan.addEventListener("mouseover", function (e) {
            {
                e.stopPropagation();
            }
        });
    });

    progressBar.addEventListener("mouseout", function (e) {
        hoverTimer.style.display = "none";
    });
});
