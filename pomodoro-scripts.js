// Description: The clock function and mins, now, and deadline variables are based on 
// code for creating a countdown timer in JavaScript on Stack Overflow
// Author: "I wrestled a bear once"
// Originality: I modified the clock function to be able to start, pause, and reset,
// and modified the HTML output format.
// All other funtions in the module are my original work.
// 
// Date: 6/6/2023
// Source Code: https://stackoverflow.com/questions/56569124/countdown-timer-in-vanilla-javascript-without-using-a-function


// Get header element that shows FOCUS or BREAK
let header = document.getElementById("focus-break");

// Toggle text on top of clock from FOCUS to BREAK
const toggleText = () => {
    // Toggle text and style rules
    if (header.innerText === "FOCUS") {
        header.innerText = "BREAK";
        header.style.color = "Red";
    } else {
        header.innerText = "FOCUS";
        header.style.color = "Whitesmoke";
    };
};


// Get clock buttons
const startBtn = document.getElementById("start");
const pauseBtn = document.getElementById("pause");
const resetBtn = document.getElementById("reset")
// Get clock display HTML element
const timeSpan = document.getElementById('clock-interface');

// set initial start time at 25 minutes
let mins = 25;
let secs = 0;
// get current time when timer starts (in milliseconds since epoch)
let now = new Date().getTime();
// set when timer should stop based on current start time (will change)
let deadline = mins * 60 * 1000 + (secs * 1000) + now;

// initialize interval variable
let timer;

// Countdown timer that counts down from 25 or 5 minutes
const clock = () => {
  timer = setInterval(() => {
    // reset current time in milliseconds for each function call
    let currentTime = new Date().getTime();
    // calculate how far in milliseconds current time is from the set end time to account for lag/drift
    let distance = deadline - currentTime;
    // calculate minutes and seconds remaining until end time
    // math floor returns the largerst int less than or equal to a number
    let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = Math.floor((distance % (1000 * 60)) / 1000);
    
    // update global mins and secs, will be used in startClock()
    mins = minutes;
    secs = seconds;

    // Switch to focus or break time when timer ends
    toggleFocusBreak();

    // add "0" to 1 digit minutes and seconds
    if (minutes < 10) {
      minutes = "0" + minutes;
    }
    if (seconds < 10) {
      seconds = "0" + seconds;
    }
    
    // output minutes and seconds to UI
    timeSpan.innerHTML = minutes + ':' + seconds;
  }, 500)
};


// Set clock to FOCUS time - 25 minutes, or BREAK time - 5 minutes
const toggleFocusBreak = () => {
  if (secs === 0 && mins === 0 && header.innerText === "FOCUS") {
      // reset timer to 5 minutes and set header to BREAK
      toggleText();
      // reset deadline using 5 minutes
      mins = 5;
      secs = 0;
      now = new Date().getTime();
      deadline = mins * 60 * 1000 + (secs * 1000) + now;
  } else if (secs === 0 && mins === 0 && header.innerText === "BREAK") {
      // reset timer to 25 minutes and set header to FOCUS
      toggleText();
      // reset deadline using 25 minutes
      mins = 25;
      secs = 0;
      now = new Date().getTime();
      deadline = mins * 60 * 1000 + (secs * 1000) + now;
  };
};


// Variable prevents start button from speeding up countdown timer
let countdownOn = false;

// Start countdown timer
const startClock = () => {
  if (!countdownOn) {
    clock();
    countdownOn = true;
    // reset deadline based on time from start button click
    now = new Date().getTime();
    deadline = mins * 60 * 1000 + (secs * 1000) + now;
  };
};
startBtn.addEventListener("click", startClock);


// Pause countdown timer
const pauseClock = () => {
  // stop calls to startClock function
  clearTimeout(timer);
  countdownOn = false;
};
pauseBtn.addEventListener("click", pauseClock);


// Reset pomodoro clock to 25 minutes and FOCUS
const resetClock = () => {
  // stop calls to clock function
  clearTimeout(timer);
  // set header to FOCUS
  header.innerText = "FOCUS";
  header.style.color = "Whitesmoke";
  // reset clock display
  mins = 25;
  secs = 0;
  timeSpan.innerHTML = mins + ':' + "0" + secs;
  countdownOn = false;
}

resetBtn.addEventListener("click", resetClock);