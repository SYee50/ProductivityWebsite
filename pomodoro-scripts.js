// Scripts for Pomodoro Clock Functionality

// get FOCUS/BREAK header
let header = document.getElementById("focus-break");

// Toggle text on top of clock from FOCUS to BREAK
const toggleText = () => {
    // toggle text between FOCUS and BREAK
    if (header.innerText === "FOCUS") {
        header.innerText = "BREAK";
        header.style.color = "Red";
    } else {
        header.innerText = "FOCUS";
        header.style.color = "Whitesmoke";
    };
};

// Clock decrementing functionality

// get minutes and seconds
let minutes = document.getElementById("minutes");
let seconds = document.getElementById("seconds");

// get clock buttons
const startBtn = document.getElementById("start");
const pauseBtn = document.getElementById("pause");
const resetBtn = document.getElementById("reset")

// initialize interval variable
let timer;

const clock = () => {
    if (seconds.innerText > 0 && seconds.innerText < 60) {
        // decrement seconds when seconds between 1 and 59
        // add 0 to seconds that are single digits
        if (seconds.innerText <= 10) {
            let decrementedSec = seconds.innerText - 1
            seconds.innerText = "0" + decrementedSec;
        } else {
            seconds.innerText--;
        }
    } else if (seconds.innerText == 0 && minutes.innerText != 0) {
        // decrement minutes when 0 seconds reached and minutes remaining
        if (minutes.innerText <= 10) {
            let decrementedMin = minutes.innerText - 1
            minutes.innerText = "0" + decrementedMin;
            // reset seconds to 59
            seconds.innerText = 59;
        } else {
            minutes.innerText--;
            // reset seconds to 59
            seconds.innerText = 59;
        }
    }
    // set timer to FOCUS or Break
    toggleFocusBreak();

    // continuously call function until paused or reset
    timer = setTimeout(clock, 925);
};

// Set clock to 25 minutes or 5 minutes
const toggleFocusBreak = () => {
    if (seconds.innerText == 0 && minutes.innerText == 0 && header.innerText == "FOCUS") {
        // reset timer to 5 minutes and set header to BREAK
        toggleText();
        minutes.innerText = "0" + 5;
    } else if (seconds.innerText == 0 && minutes.innerText == 0 && header.innerText == "BREAK") {
        // reset timer to 25 minutes and set header to FOCUS
        toggleText();
        minutes.innerText = 25;
    };
};

// variable indicates if the clock has started
// prevents speed up of countdown
let countdownOn = false;

// Start pomodoro clock
const startClock = () => {
    // call clock function every second
    if (!countdownOn) {
        clock();
        countdownOn = true;
    }
    // setTimeout(clock, 10);
};

startBtn.addEventListener("click", startClock);


// Pause pomodoro clock
const pauseClock = () => {
    // stop calls to startClock function
    clearTimeout(timer);
    countdownOn = false;
};

pauseBtn.addEventListener("click", pauseClock);

// Reset pomodoro clock to 25 minutes and FOCUS
const resetClock = () => {
    // stop calls to startClock function
    clearTimeout(timer);
    // set header to FOCUS
    header.innerText = "FOCUS";
    header.style.color = "Whitesmoke";
    // reset clock display
    minutes.innerText = 25;
    seconds.innerText = "0" + 0;
    countdownOn = false;
}

resetBtn.addEventListener("click", resetClock);
