const startButton = document.getElementById('start');
const pauseButton = document.getElementById('pause');
const resetButton = document.getElementById('reset');
const minutes = document.getElementById('minutes');
const seconds = document.getElementById('seconds');
const circle = document.querySelector('.progress-ring__circle');
const appMessage = document.getElementById('app-message');
const bells = new Audio('bell.wav');
let interval;
let isRunning = false;

const radius = circle.r.baseVal.value;
const circumference = 2 * Math.PI * radius;
circle.style.strokeDashOffset = circumference;
circle.style.strokeDasharray = circumference;


let totalseconds = 25 * 60; // 25 minutes

let rotation = () => {
    const total = 25*60;
    let progress = (total - totalseconds) / total;
    circle.style.strokeDashoffset = circumference - (progress * circumference);
}


let timer = () => {
    let currentMinutes = Math.floor(totalseconds / 60);
    let currentSeconds = totalseconds % 60;

    minutes.innerText = currentMinutes < 10 ? `0${currentMinutes}` : currentMinutes;
    seconds.innerText = currentSeconds < 10 ? `0${currentSeconds}` : currentSeconds;

    rotation();

    totalseconds--;
    if(totalseconds <= 0){
        clearInterval(interval);
        bells.play();
        isRunning = false;
        appMessage.innerText = "Hope the session was productive! Take a break.";
    }
}

startButton.addEventListener("click", () => {
    if(!isRunning){
        isRunning = true;
        appMessage.innerText = "Good luck!";
                // flush styles to prevent initial jump
        circle.style.transition = "none";
        circle.style.strokeDashoffset = circumference;
        circle.getBoundingClientRect(); // force reflow
        interval = setInterval(timer, 1000);
    }
    else {
        appMessage.innerText = "Time is already running! Focus please.";
    }
});

pauseButton.addEventListener("click", () => {
    if(isRunning){
        clearInterval(interval);
        isRunning = false;
    }
    else {
        appMessage.innerText = "Time is not running! Press start to start the timer.";
    }
})

resetButton.addEventListener("click", () => {
    clearInterval(interval);
    isRunning = false;
    totalseconds = 25 * 60;
    circle.style.strokeDashoffset = circumference;
    appMessage.innerText = "Press start to begin.";
    minutes.innerText = "25";
    seconds.innerText = "00";

})
