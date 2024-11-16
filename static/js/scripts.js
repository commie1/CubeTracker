let timerActive = false; 
let timerArmed = false;  
let startTime;
let timerInterval;

function startTimer() {
    timerActive = true;
    startTime = Date.now();
    timerInterval = setInterval(updateTime, 10); 
    document.getElementById("timeDisplay").classList.remove("fin"); 
}


function stopTimer() {
    clearInterval(timerInterval);
    timerActive = false;
    document.getElementById("timeDisplay").classList.add("fin"); 
}


function updateTime() {
    const elapsedTime = (Date.now() - startTime) / 1000; 
    document.getElementById("timeDisplay").innerText = elapsedTime.toFixed(3); 
}


document.addEventListener("keydown", (event) => {
    if (event.code === "Space") {
        event.preventDefault(); 
        document.getElementById("timeDisplay").classList.add("armed"); 
        
        if (!timerArmed) {
            timerArmed = true;
        }
    }
});


document.addEventListener("keyup", (event) => {
    if (event.code === "Space") {
        event.preventDefault(); 

        if (timerArmed) {
            timerArmed = false;
            if (!timerActive) {
                startTimer(); 
            } else {
                stopTimer();
            }
            document.getElementById("timeDisplay").classList.remove("armed");
        }
    }
});
