const breakIncrement = document.getElementById('break-increment');
const breakDecrement = document.getElementById('break-decrement');
const sessionIncrement = document.getElementById('session-increment');
const sessionDecrement = document.getElementById('session-decrement');
const breakLength = document.getElementById('break-length');
const sessionLength = document.getElementById('session-length');
const timerLabel = document.getElementById('timer-label');
const timeLeft = document.getElementById('time-left');
const startStop = document.getElementById('start_stop');
const reset = document.getElementById('reset');
const beep = document.getElementById('beep');

let isRunning = "start";
startStop.innerText = isRunning.toUpperCase();
let timer;

startStop.addEventListener('click', () => {
    if(isRunning === "start"){
        timer = setInterval(() => {
            timeLeft.innerText = decrementTime(timeLeft.innerText);
        }, 1000);
        isRunning = 'stop';
    } else if(isRunning === "stop") {
        isRunning = 'start';
        clearInterval(timer);
    }
    startStop.innerText = isRunning.toUpperCase();
});

reset.addEventListener('click', () => {
    clearInterval(timer);
    sessionLength.innerText = 25;
    breakLength.innerText = 5;
    timeLeft.innerText = sessionLength.innerText + ":00";
    timerLabel.innerText = 'Session';
    beep.pause();
    beep.currentTime = 0;
});

const decrementTime = (timeString) => {
    let timeDisplay = timeString.split(':');
    let minutes = parseInt(timeDisplay[0]);
    let seconds = parseInt(timeDisplay[1]);

    seconds -= 1;

    if(seconds < 0) {
        seconds = 59;
        minutes -= 1;
    }

    if(seconds < 10) {
        seconds = '0' + seconds;
    }

    if(minutes < 0) {
        minutes = breakLength.innerText;
        seconds = '00';
        if(timerLabel.innerText === 'Session') {
            timerLabel.innerText = 'Break';
        } else {
            timerLabel.innerText = 'Session';
        }
        beep.play();
    }

    if(minutes < 10) {
        minutes = '0' + minutes;
    }

    return minutes + ':' + seconds;
}

sessionIncrement.addEventListener('click', () => {
    if(parseInt(sessionLength.innerText) < 60) {
        sessionLength.innerText = parseInt(sessionLength.innerText) + 1;
    }
    if(timerLabel.innerText === 'Session') {
        timeLeft.innerText = sessionLength.innerText + ":00";
    }
});

sessionDecrement.addEventListener('click', () => {
    if(parseInt(sessionLength.innerText) > 1) {
        sessionLength.innerText = parseInt(sessionLength.innerText) - 1;
        timeLeft.innerText = sessionLength.innerText + ":00";
        if(timerLabel.innerText === 'Session') {
            timeLeft.innerText = sessionLength.innerText + ":00";
        }
        if(parseInt(timeLeft.innerText.split(':')[0]) < 10) {
            timeLeft.innerText = '0' +  sessionLength.innerText + ":00";
        };
    }
});

breakIncrement.addEventListener('click', () => {
    if(parseInt(breakLength.innerText) < 60) {
        breakLength.innerText = parseInt(breakLength.innerText) + 1;
    }
    if(timerLabel.innerText === 'Break') {
        timeLeft.innerText = breakLength.innerText + ":00";
    }
});

breakDecrement.addEventListener('click', () => {
    if(parseInt(breakLength.innerText) > 1) {
        breakLength.innerText = parseInt(breakLength.innerText) - 1;
        if(timerLabel.innerText === 'Break') {
            timeLeft.innerText = breakLength.innerText + ":00";
        }
        if(parseInt(timeLeft.innerText.split(':')[1]) < 10 && timerLabel.innerText === "Break") {
            timeLeft.innerText = '0' +  breakLength.innerText + ":00";
        };
    }
});