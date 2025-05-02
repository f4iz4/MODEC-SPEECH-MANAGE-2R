let timers = {
  country: { timeLeft: 0, interval: null, paused: false },
  reason: { timeLeft: 0, interval: null, paused: false },
  final: { timeLeft: 0, interval: null, paused: false }
};

function toggleSection(id) {
  const section = document.getElementById(id);
  section.classList.toggle("show");
}

function updateFlag() {
  const countryCode = document.getElementById("countrySelect").value;
  const flagImg = document.getElementById("flagImage");

  flagImg.src = `https://flagcdn.com/w160/${countryCode}.png`;
  flagImg.alt = countryCode.toUpperCase();
}

function startTimer(type) {
  const input = document.getElementById(`${type}TimeInput`);
  const minutes = parseInt(input.value);
  if (isNaN(minutes) || minutes <= 0) {
    alert("Please enter a valid time.");
    return;
  }

  clearInterval(timers[type].interval);
  timers[type].timeLeft = minutes * 60;
  timers[type].paused = false;

  updateDisplay(type);

  timers[type].interval = setInterval(() => {
    if (!timers[type].paused) {
      timers[type].timeLeft--;
      updateDisplay(type);
      if (timers[type].timeLeft <= 0) {
        clearInterval(timers[type].interval);
        document.getElementById(`${type}TimerDisplay`).textContent = "⏰ Time's up!";
        alert(`Time is up for ${type} section!`);
      }
    }
  }, 1000);
}

function pauseTimer(type) {
  timers[type].paused = true;
}

function resumeTimer(type) {
  if (timers[type].timeLeft > 0) {
    timers[type].paused = false;
  }
}

function updateDisplay(type) {
  let seconds = timers[type].timeLeft;
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  const formatted = `${mins}:${secs.toString().padStart(2, '0')}`;
  document.getElementById(`${type}TimerDisplay`).textContent = `Time Left: ${formatted}`;
}
