//-------------------- RULE OF THE GAME ----------------------//
/*
  Rules:

    - The game has 2 players, playing in rounds
    - EachPlayer should roll dice one after another (IMPORTANT !!)
    - The player should chose 'Hold' after rolling dice so that his current score gets added to his player total score. After 
    that,it's the next player's turn
    - In each turn, a player rolls a dice. Each result get added to his current
    score.
    - But, if the player rolls  1 but it wont be seen in UI and all his  current score gets lost. After that,it's the next player's turn
    - Unless there is no dice roll u cant choose the hold button.
    - The first player to reach 50 points on total score wins the game.
*/


//------- Intialize ------//
let playing, activeOne, currentScore, playerScore; // It should be accessible in all scope.

// SELECTING ELEMENTS
const base = {
  dice: document.querySelector('.dice'),
  newGame: document.querySelector('.btn-new'),
  roll: document.querySelector('.btn-roll'),
  hold: document.querySelector('.btn-hold'),
  current0: document.querySelector('#current-0'),
  current1: document.querySelector('#current-1'),
  playerScore0: document.querySelector('#score-0'),
  playerScore1: document.querySelector('#score-1'),
  name0: document.querySelector('#name-0'),
  name1: document.querySelector('#name-1'),
  player0: document.querySelector('.player-0-panel'),
  player1: document.querySelector('.player-1-panel'),
};

// Starting Game with some initialization
const startGame = () => {
  // Initializing score
  playerScore = [0, 0]; // Global Score for two player
  activeOne = 0;
  currentScore = 0;
  playing = true; // Setting the game platform
  document.querySelector('.dice').style.display = 'none';

  // Updating UI
  base.current0.textContent = '0';
  base.current1.textContent = '0';
  base.playerScore0.textContent = '0';
  base.playerScore1.textContent = '0';

  // Updating UI
  base.name0.textContent = 'Player 1';
  base.name1.textContent = 'Player 2';

  // Updating UI
  base.player0.classList.remove('winner');
  base.player1.classList.remove('winner');
  base.player1.classList.remove('loser');
  base.player1.classList.remove('loser');

  // Updating UI
  base.player0.classList.remove('active');
  base.player1.classList.remove('active');
  base.player0.classList.add('active'); // Starting from first player
};

// Getting current score
const rollDice = () => {
  if (playing) {
    // 1) Calculating random number from 1 to 6 for dice
    // random number start from 0 and it will be in decimal
    const diceNum = Math.floor(Math.random() * 6) + 1;

    // 2) Setting the dice image with number generated
    base.dice.style.display = 'block';
    base.dice.src = './img/dice-' + diceNum + '.png';

    // 3) Now updating the current score
    // The diceNum should not get 1 value (check the rule)
    if (diceNum === 1) return nextPlayer();

    // If there is another value
    if (diceNum) {
      // Add the num to current score
      currentScore = currentScore + diceNum;

      // Update the UI for playing one.
      document.querySelector(
        '#current-' + activeOne
      ).textContent = currentScore;

      return;
    }
  }
};

// Another player plays the game
const nextPlayer = () => {
  // Switching active to another player
  activeOne === 0 ? (activeOne = 1) : (activeOne = 0);

  // Setting current score to 0 for player
  currentScore = 0;
  base.current0.textContent = '0';
  base.current1.textContent = '0';

  // Updating classlist for active player
  base.player0.classList.toggle('active');
  base.player1.classList.toggle('active');
  document.querySelector('.dice').style.display = 'none';
};

// Getting player score
const holdDice = () => {
  // If there is round score and the playing continues unless anyone win
  if (currentScore && playing) {
    // Now Adding current score to player score
    playerScore[activeOne] = playerScore[activeOne] + currentScore;

    // Update the UI
    document.querySelector('#score-' + activeOne).textContent =
      playerScore[activeOne];

    // Now checking the player score
    // If it is more than or equal to 50 then the player won (check the rule)
    if (playerScore[activeOne] >= 50) {
      document.querySelector('#name-' + activeOne).innerText = `Winner!!`;
      base.dice.style.display = 'none';
      document.querySelector('#score-' + activeOne).textContent = '';
      document
        .querySelector('.player-' + activeOne + '-panel')
        .classList.add('winner');
      document
        .querySelector('.player-' + activeOne + '-panel')
        .classList.remove('active');

      //----- For losers -----//
      if (activeOne === 0) {
        document.querySelector(
          '#name-' + `${activeOne + 1}`
        ).innerText = `Try Again!!`;
        document.querySelector('#score-' + `${activeOne + 1}`).textContent = '';
        document
          .querySelector('.player-' + `${activeOne + 1}` + '-panel')
          .classList.add('loser');
      }
      if (activeOne === 1) {
        document.querySelector(
          '#name-' + `${activeOne - 1}`
        ).innerText = `Try Again`;
        document.querySelector('#score-' + `${activeOne - 1}`).textContent = '';
        document
          .querySelector('.player-' + `${activeOne - 1}` + '-panel')
          .classList.add('loser');
      }

      return (playing = false); // Since the player won the game should stop
    }

    // Then next player turn
    if (playerScore[activeOne]) return nextPlayer();
  }
};

// Adding event to roll dice
base.roll.addEventListener('click', (e) => {
  rollDice();
});

// Adding event to holdDice
base.hold.addEventListener('click', (e) => {
  holdDice();
});

// When player starts a new game
base.newGame.addEventListener('click', (e) => {
  startGame();
});

//----- Intial Load Event ------//
// Starting the Game
window.addEventListener('load', (e) => {
  startGame();
});
