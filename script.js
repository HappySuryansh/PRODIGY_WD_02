let startTime = 0;
let elapsed = 0;
let interval = null;
let running = false;
let laps = [];

const display = document.getElementById("display");
const totalTime = document.getElementById("totalTime");
const bestLap = document.getElementById("bestLap");
const avgLap = document.getElementById("avgLap");
const lapCount = document.getElementById("lapCount");

function format(ms) {
  let date = new Date(ms);
  return date.toISOString().substr(11, 11);
}

function updateDisplay() {
  display.textContent = format(elapsed);
  totalTime.textContent = format(elapsed);
}

function updateStats() {
  if (laps.length === 0) {
    bestLap.textContent = avgLap.textContent = "--";
    lapCount.textContent = "0";
    return;
  }
  let times = laps.map(l => l.time);
  let best = Math.min(...times);
  let avg = times.reduce((a, b) => a + b, 0) / times.length;
  bestLap.textContent = format(best);
  avgLap.textContent = format(avg);
  lapCount.textContent = times.length;
}

function start() {
  startTime = Date.now() - elapsed;
  interval = setInterval(() => {
    elapsed = Date.now() - startTime;
    updateDisplay();
  }, 10);
}

function stop() {
  clearInterval(interval);
}

document.getElementById("startPause").onclick = function () {
  if (!running) {
    start();
    this.textContent = "Pause";
  } else {
    stop();
    this.textContent = "Start";
  }
  running = !running;
};

document.getElementById("reset").onclick = function () {
  stop();
  elapsed = 0;
  laps = [];
  running = false;
  document.getElementById("startPause").textContent = "Start";
  updateDisplay();
  document.getElementById("laps").innerHTML = "";
  updateStats();
};

document.getElementById("lap").onclick = function () {
  if (!running) return;
  const lapName = document.getElementById("lapName").value || `Lap ${laps.length + 1}`;
  const time = elapsed;
  laps.push({ name: lapName, time });
  const li = document.createElement("li");
  li.textContent = `${lapName}: ${format(time)}`;
  document.getElementById("laps").appendChild(li);
  document.getElementById("lapName").value = "";
  updateStats();
};
