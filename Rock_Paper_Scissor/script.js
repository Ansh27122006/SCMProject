let userScore = 0;
let compScore = 0;

function play(userChoice) {
  const choices = ['stone', 'paper', 'scissors'];
  const compChoice = choices[Math.floor(Math.random() * choices.length)];

  let message = '';

  if (userChoice === compChoice) {
    message = `Draw! Both chose ${userChoice}`;
  } else if (
    (userChoice === 'stone' && compChoice === 'scissors') ||
    (userChoice === 'paper' && compChoice === 'stone') ||
    (userChoice === 'scissors' && compChoice === 'paper')
  ) {
    userScore++;
    message = `You Win! ${userChoice} beats ${compChoice}`;
  } else {
    compScore++;
    message = `You Lose! ${compChoice} beats ${userChoice}`;
  }

  document.getElementById('message').innerText = message;
  document.getElementById('user-score').innerText = userScore;
  document.getElementById('comp-score').innerText = compScore;
}
