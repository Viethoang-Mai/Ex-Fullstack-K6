import { config } from "./config.js";
const { SERVER_API } = config;
import { httpClient } from "./client.js";
const quizEl = document.querySelector(".quiz");
let timeInit = 3200;
let currentAnswer = [];
let countToStart = 3;
let index = 0;
let checkRender = true;
let timer;
let time;
let score = 0;
let correct = 0;
let incorrect = 0;
let streak = 0;
let checkStreak;
const home = `<div class="rules pr-5">
<p>
    <i class="fa-regular fa-circle-dot"></i> Có tổng cộng 10
    câu hỏi
</p>
<p>
    <i class="fa-regular fa-circle-dot"></i> Người chơi có
    10s để trả lời mỗi câu hỏi
</p>
<p>
    <i class="fa-regular fa-circle-dot"></i> Có những câu
    hỏi phải chọn 2 đáp án
</p>
</div>

<button
class="start-btn bg-indigo-500 cursor-pointer text-2xl p-5 text-slate-50 rounded-lg h-full w-24"
>
Start
</button>`;

const render = (data) => {
    if (checkRender) {
        quizEl.innerHTML = home;
    } else {
        if (index < data.length) {
            currentAnswer = [];
            quizEl.innerHTML = `<div class="in-game w-full">
            <div class="progress w-full h-2 relative">
                <span
                    class="progress-bar absolute left-0 h-full bg-sky-500"
                ></span>
            </div>
            <div class="flex justify-between my-5">
            <span>Câu hỏi: ${data[index].id}/${data.length}</span>
            <span class="score">Điểm:${score}</span>
            </div>
    
            <div><p>${data[index].content}</p></div>
            <div class="answer flex gap-x-5 justify-center">${data[
                index
            ].answers
                .map(
                    ({ id, text }) =>
                        `<button class="answer-btn py-1 px-6 rounded my-5 font-medium" data-question-id=${data[index].id} data-answer-id=${id}>Đ.án${id}: ${text}</button>`
                )
                .join("")}</div>

                <div class="notification text-lime-500 text-center w-full h-5"></div>
            
            </div>`;
            handleProgress();
            handleClickAnswer(index + 1);
        } else {
            quizEl.innerHTML = `<div class="w-full""> 
            <h2 class="text-2xl text-center font-semibold">Game Over</h2>
            
            <div class="flex gap-x-10 justify-center mt-4">
                <div class="statistic flex flex-col gap-y-2">
                    <p>
                <i class="fa-regular fa-circle-dot"></i> Số điểm: ${score}
                    </p>    
                    <p>
                    <i class="fa-regular fa-circle-dot"></i> Số câu trả lời đúng: ${correct}
                    </p>
                    <p>
                    <i class="fa-regular fa-circle-dot"></i> Số câu trả lời sai: ${incorrect}
                </p>
                <p>
                    <i class="fa-regular fa-circle-dot"></i> Số câu trả lời đúng liên tiếp: ${streak}
                </p>      
                </div>
                <button
                class="restart-btn bg-indigo-500 cursor-pointer text-2xl p-5 text-slate-50 rounded-lg w-26"
                >
                Again
                </button>
            </div>
        
            </div>`;
        }
    }
};
render();
quizEl.addEventListener("click", (e) => {
    if (e.target.classList.contains("start-btn")) {
        const startBtn = quizEl.querySelector(".start-btn");
        startBtn.disabled = true;
        const handleStart = setInterval(() => {
            if (countToStart) {
                startBtn.innerText = `${countToStart}`;
                countToStart--;
            } else {
                startBtn.innerText = `Go!`;
                clearInterval(handleStart);
                countToStart = 3;
                checkRender = false;
                setTimeout(() => {
                    getQuestions();
                }, 1000);
            }
        }, 1000);
    }
});
quizEl.addEventListener("click", (e) => {
    if (e.target.classList.contains("answer-btn")) {
        e.target.disabled = true;
        const answerId = e.target.dataset.answerId;
        const questionId = e.target.dataset.questionId;
        handleClickAnswer(questionId, time);
        pushAnswerId(answerId);
    }
});
quizEl.addEventListener("click", (e) => {
    if (e.target.classList.contains("restart-btn")) {
        timeInit = 10;
        currentAnswer = [];
        countToStart = 1;
        index = 0;
        checkRender = true;
        score = 0;
        correct = 0;
        incorrect = 0;
        streak = 0;
        getQuestions();
    }
});
const getQuestions = async function () {
    const { data } = await httpClient.get(`${SERVER_API}/questions`);
    render(data);
};
const handleProgress = () => {
    const progressBar = document.querySelector(".progress-bar");
    time = timeInit;
    timer = setInterval(() => {
        time--;
        let rate = (time * 100) / timeInit;
        progressBar.style.width = `${rate}%`;
        if (time === 0) {
            nextQuestion();
        }
    }, 0);
};
const nextQuestion = () => {
    clearInterval(timer);
    setTimeout(() => {
        time = timeInit;
        index++;
        getQuestions();
    }, 1000);
};

const handleClickAnswer = async (questionsId, currentScore) => {
    const { data } = await httpClient.get(
        `${SERVER_API}/answers/?questionId=${+questionsId}`
    );
    if (data.length) {
        const answerId = data[0].answerId;
        if (answerId.length === currentAnswer.length) {
            if (
                answerId.sort((a, b) => a - b).toString() ===
                currentAnswer.sort((a, b) => a - b).toString()
            ) {
                currentAnswer.forEach((item) => {
                    document.querySelector(
                        `button[data-answer-id="${item}"]`
                    ).style.background = "#c4f2cf";
                });
                document.querySelector(
                    ".notification"
                ).innerHTML = `<span><i class="fa-solid fa-circle-check "></i> Đáp án đúng</span> `;
                score += currentScore;
                correct++;
                checkStreak = true;
            } else {
                currentAnswer.forEach((item) => {
                    document.querySelector(
                        `button[data-answer-id="${item}"]`
                    ).style.background = "#f8d7da";
                });
                answerId.forEach((item) => {
                    document.querySelector(
                        `button[data-answer-id="${item}"]`
                    ).style.background = "#c4f2cf";
                });
                document.querySelector(
                    ".notification"
                ).innerHTML = ` <span class="text-red-500"><i class="fa-solid fa-circle-xmark"></i> Đáp án sai</span>`;
                incorrect++;
                checkStreak = false;
            }
            checkStreak ? streak++ : (streak = 0);
            nextQuestion();
        }
    }
};
// #f8d7da
const pushAnswerId = (answerId) => {
    const check = currentAnswer.includes(+answerId);
    if (!check) {
        currentAnswer.push(+answerId);
    }
};
