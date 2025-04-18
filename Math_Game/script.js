const questionEl = document.getElementById("question");
const optionsEl = document.getElementById("options");
const scoreEl = document.getElementById("score");
const highScoreEl = document.getElementById("high-score");
const timerEl = document.getElementById("timer");
const gameOverEl = document.getElementById("game-over");
const finalScoreEl = document.getElementById("final-score");

const startScreen = document.getElementById("start-screen");
const gameScreen = document.getElementById("game-screen");

const startBtn = document.getElementById("start-btn");
const difficultyButtons = document.querySelectorAll(".difficulty-btn");

const congratsPopup = document.getElementById("congrats-popup");
const quitBtn = document.getElementById("quit-btn");
const playAgainBtn = document.getElementById("play-again-btn");

let score = 0;
let timeLeft = 30;
let timerInterval;
let currentDifficulty = null;
let newHighScore = false;

const difficultySettings = {
  easy: { min: 1, max: 10 },
  medium: { min: 10, max: 50 },
  hard: { min: 20, max: 100 }
};

// Select difficulty
difficultyButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    difficultyButtons.forEach(b => b.classList.remove("selected"));
    btn.classList.add("selected");
    currentDifficulty = btn.getAttribute("data-difficulty");
    startBtn.classList.add("enabled");
    startBtn.disabled = false;
    updateHighScore(); 
  });
});

// Start game
startBtn.addEventListener("click", () => {
  if (!currentDifficulty) return;
  startScreen.style.display = "none";
  gameScreen.style.display = "block";
  startGame();
});

// Start game logic
function startGame() {
  score = 0;
  timeLeft = 30;
  newHighScore = false;

  scoreEl.textContent = `Score: ${score}`;
  timerEl.textContent = `Time Left: ${timeLeft}s`;

  questionEl.style.display = "block";
  optionsEl.style.display = "flex";
  scoreEl.style.display = "block";
  timerEl.style.display = "block";
  gameOverEl.style.display = "none";
  congratsPopup.style.display = "none";

  generateQuestion();
  startTimer();
  updateHighScore();
}

// Timer countdown
function startTimer() {
  timerInterval = setInterval(() => {
    timeLeft--;
    timerEl.textContent = `Time Left: ${timeLeft}s`;

    if (timeLeft === 0) {
      clearInterval(timerInterval);
      endGame();
    }
  }, 1000);
}

// Generate question 
function generateQuestion() {
  const { min, max } = difficultySettings[currentDifficulty];
  const num1 = Math.floor(Math.random() * (max - min + 1)) + min;
  const num2 = Math.floor(Math.random() * (max - min + 1)) + min;
  const operations = ["+", "-", "×", "÷"];
  const operation = operations[Math.floor(Math.random() * operations.length)];

  let correctAnswer;
  let displayQuestion;

  switch (operation) {
    case "+":
      correctAnswer = num1 + num2;
      displayQuestion = `${num1} + ${num2}`;
      break;
    case "-":
      correctAnswer = num1 - num2;
      displayQuestion = `${num1} - ${num2}`;
      break;
    case "×":
      correctAnswer = num1 * num2;
      displayQuestion = `${num1} × ${num2}`;
      break;
    case "÷":
      correctAnswer = num1;
      const divisor = num2 === 0 ? 1 : num2;
      displayQuestion = `${num1 * divisor} ÷ ${divisor}`;
      break;
  }

  questionEl.textContent = `What is ${displayQuestion}?`;

  const options = [correctAnswer];
  while (options.length < 4) {
    const offset = Math.floor(Math.random() * 10) + 1;
    let wrong = correctAnswer + (Math.random() > 0.5 ? offset : -offset);
    if (!options.includes(wrong)) options.push(wrong);
  }

  options.sort(() => Math.random() - 0.5);
  optionsEl.innerHTML = "";

  options.forEach(answer => {
    const button = document.createElement("button");
    button.textContent = answer;
    button.onclick = () => checkAnswer(answer, correctAnswer);
    optionsEl.appendChild(button);
  });
}

// Check if correct
function checkAnswer(selected, correct) {
  if (selected === correct) score++;
  else score--;

  scoreEl.textContent = `Score: ${score}`;
  generateQuestion();
  updateHighScore();
}

// Update high score per difficulty
function updateHighScore() {
  const highScoreKey = `highScore_${currentDifficulty}`;
  let storedScore = localStorage.getItem(highScoreKey) || 0;

  if (score > storedScore) {
    localStorage.setItem(highScoreKey, score);
    newHighScore = true;
  }

  highScoreEl.textContent = `High Score (${currentDifficulty}): ${localStorage.getItem(highScoreKey)}`;
}

// End game
function endGame() {
  clearInterval(timerInterval);

  questionEl.style.display = "none";
  optionsEl.style.display = "none";
  scoreEl.style.display = "none";
  timerEl.style.display = "none";
  gameOverEl.style.display = "block";

  finalScoreEl.textContent = `Your final score: ${score}`;

  // Congrats popup
  if (newHighScore) {
    congratsPopup.style.display = "block";
    congratsPopup.textContent = `🎉 New High Score in ${currentDifficulty} Mode! 🎉`;
  }
}

// Quit game early
quitBtn.addEventListener("click", () => {
  clearInterval(timerInterval);
  endGame();
});

// Play again – go to start screen
playAgainBtn.addEventListener("click", () => {
  startScreen.style.display = "block";
  gameScreen.style.display = "none";
  gameOverEl.style.display = "none";
  congratsPopup.style.display = "none";

  score = 0;
  timeLeft = 30;
  currentDifficulty = null;
  difficultyButtons.forEach(b => b.classList.remove("selected"));
  startBtn.classList.remove("enabled");
  startBtn.disabled = true;
  highScoreEl.textContent = "";
});
