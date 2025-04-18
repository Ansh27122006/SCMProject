let secretNumber = Math.floor(Math.random() * 100) + 1;
let attempts = 0;
let score = 0;
let bestScore = 0;

function checkGuess() {
    const guess = Number(document.getElementById("guessInput").value);
    attempts++;
    document.getElementById("attempts").innerText = attempts;

    if (guess === secretNumber) {
        score = 100 - attempts * 2;
        if (score < 0) score = 0;
        document.getElementById("score").innerText = score;
        document.getElementById("result").innerText = `Correct! The number was ${secretNumber}`;

        if (score > bestScore) {
            bestScore = score;
            document.getElementById("best-score").innerText = bestScore;
        }
    } else if (guess > secretNumber) {
        document.getElementById("result").innerText = "Too High!";
    } else {
        document.getElementById("result").innerText = "Too Low!";
    }
}

function newGame() {
    secretNumber = Math.floor(Math.random() * 100) + 1;
    attempts = 0;
    score = 0;
    document.getElementById("attempts").innerText = attempts;
    document.getElementById("score").innerText = score;
    document.getElementById("result").innerText = "";
    document.getElementById("guessInput").value = "";
}

function playAgain() {
    newGame();
}
