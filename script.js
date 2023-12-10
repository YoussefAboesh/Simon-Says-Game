let playerName = "";
let level = 1;
let sequence = [];
let userSequence = [];
let score = 0;

document.querySelector("form").addEventListener("submit", (e) => {
  e.preventDefault();
  startGame();
});

function startGame() {
  playerName = document.getElementById("playerName").value;
  if (playerName.trim() !== "") {
    document.getElementById("welcomeMessage").style.display = "none";
    document.getElementById("registration").style.display = "none";
    document.getElementById("game").style.display = "block";
    nextLevel();
  } else {
    alert("Please enter your name.");
  }
}

function nextLevel() {
  sequence = [];
  userSequence = [];
  updateDisplay();
  generateSequence();
  playSequence();
}

function generateSequence() {
  for (let i = 0; i < level; i++) {
    let randomColor = getRandomColor();
    sequence.push(randomColor);
  }
}

function getRandomColor() {
  let colors = ["red", "blue", "green", "yellow"];
  return colors[Math.floor(Math.random() * colors.length)];
}

function playSequence() {
  let i = 0;
  let interval = setInterval(() => {
    flashColor(sequence[i]);
    i++;
    if (i >= sequence.length) {
      clearInterval(interval);
      allowUserInput();
    }
  }, 1000);
}

function flashColor(color) {
  // Make the chosen color very dark
  document.getElementById(color).style.backgroundColor = darkenColor(color);
  setTimeout(() => {
    document.getElementById(color).style.backgroundColor = "";
  }, 500);
}

function darkenColor(color) {
  const darkenFactor = 0.5; // Adjust this value to control the darkness
  const rgbValues = colorToRgb(color);
  const darkenedRgb = rgbValues.map((value) =>
    Math.round(value * darkenFactor)
  );
  return `rgb(${darkenedRgb.join(",")})`;
}

function colorToRgb(color) {
  const hex = document.getElementById(color).style.backgroundColor;
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);

  if (result) {
    return [
      parseInt(result[1], 16),
      parseInt(result[2], 16),
      parseInt(result[3], 16),
    ];
  }
  // Fallback to white if the color is not in hex format
  return [255, 255, 255];
}

function allowUserInput() {
  document.getElementById("levelDisplay").innerText = `Level: ${level}`;
  document.getElementById("scoreDisplay").innerText = `Score: ${score}`;
  userSequence = [];
  document.getElementById("simonContainer").style.pointerEvents = "auto";
}

function checkColor(color) {
  userSequence.push(color);
  flashColor(color);
  if (userSequence.length === sequence.length) {
    if (arraysEqual(userSequence, sequence)) {
      score++;
      level++;
      nextLevel();
    } else {
      endGame();
    }
  }
}

function arraysEqual(arr1, arr2) {
  return arr1.every((value, index) => value === arr2[index]);
}

function endGame() {
  alert(`Game Over, ${playerName}! Your final score is ${score}.`);
  resetGame();
}

function resetGame() {
  level = 1;
  score = 0;
  document.getElementById("welcomeMessage").style.display = "block";
  document.getElementById("simonContainer").style.pointerEvents = "none";
  document.getElementById("registration").style.display = "flex";
  document.getElementById("registration").style.flexDirection = "column";
  document.getElementById("game").style.display = "none";
  document.getElementById("playerName").value = "";
}

function updateDisplay() {
  if (level > 1) {
    document.getElementById("levelDisplay").innerText = `Level: ${level}`;
    document.getElementById(
      "scoreDisplay"
    ).innerText = `${playerName}'s Score: ${score}`;
  }
}
