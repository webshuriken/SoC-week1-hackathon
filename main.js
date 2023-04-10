// Variables
const movesList = ["rock", "paper", "scissors", "lizard", "spock"]
let username = 'Anonymous';
let keepPlaying = true;
let gamesPlayed = 0;
let currentGameResult = '';
let wins = 0;
let loss = 0;
let draws = 0;

// Modals
var startModalElem = document.querySelector('#StartScreenModal');
const startModal = new bootstrap.Modal(startModalElem);
var usernameModalElem = document.querySelector('#UsernameScreenModal');
const usernameModal = new bootstrap.Modal(usernameModalElem);
var movesModalElem = document.querySelector('#MovesScreenModal');
const movesModal = new bootstrap.Modal(movesModalElem);
var resultModalElem = document.querySelector('#ResultScreenModal');
const resultModal = new bootstrap.Modal(resultModalElem);

// username form
const usernameForm = document.querySelector('.username-form');

// grab buttons
const resultModalBtns = document.querySelectorAll('.result-screen__btns');
const gameScreenbtn = document.querySelector('.game-screen');
// only seem to be able to close a model if its programmatically opened by me and not BS
const startScreenBtn = document.querySelector('.start-screen__btn');

// add listeners
resultModalBtns[0].addEventListener('click', event => {
	resultModal.hide();
});
resultModalBtns[1].addEventListener('click', event => {
	resultModal.hide();
	wins = 0;
	draws = 0;
	loss = 0;
	gamesPlayed = 0;
	username = 'Anonymous';
	keepPlaying = false;

	// clear username input
	const usernameElem = document.querySelector('#Username');
	usernameElem.value = '';
});

gameScreenbtn.addEventListener('click', elem => {
	gameRound(elem.target.innerText.toLowerCase());
});

usernameForm.addEventListener('submit', event => {
	event.preventDefault();
	if (event.submitter.innerText == 'Continue') {
		const usernameElem = document.querySelector('#Username');
		username = usernameElem.value;
		// name must be valid before doing anything else
		if (isUsernameValid(username)) {
			if (username === null) {
				username = "player";
			} else {
				username = username.charAt(0).toUpperCase() + username.slice(1).substring(0, 9);
			}
			// let the games begin
			gameInit(username);
		}else{
			usernameElem.value = 'Username cant start with numbers/symbols';
		}
	}
});

startScreenBtn.addEventListener('click', elem => {
	startModal.hide();
});

// must await for the start modal to close before opening the usernamem modal
startModalElem.addEventListener('hidden.bs.modal', e => {
	usernameModal.show();
});

// smooth the transition between the results model and the start modal
resultModalElem.addEventListener('hidden.bs.modal', e => {
	toggleResultModal();
	currentGameResult = '';
	if (!keepPlaying) {
		startModal.show();
	}
});

/**
 * checks the winner from a set of cases
 * @param {string} player1 
 * @param {string} player2 
 * @returns string (winner, loser, draw)
 */
function checkWinner(player1, player2) {
	let moveResult = 'loser';
	// catch any move not allowed and dismiss
	if (movesList.includes(player1) && movesList.includes(player2)) {
		switch (true) {
			case (player1 === player2):
				draws++;
				moveResult = 'draw';
				break;
			case (player1 === "rock" && (player2 === "paper" || player2 === "spock") ):
				loss++;
				break;
			case (player1 === "scissors" && (player2 === "rock" ||player2 === "spock") ):
				loss++;
				break;
			case (player1 === "paper" && (player2 === "scissors" || player2 === "lizard") ):
				loss++;
				break;
			case (player1 === "lizard" && (player2 === "scissors" || player2 === "rock") ):
				loss++;
				break;
			case (player1 === "spock" && (player2 === "paper" || player2 === "lizard") ):
				loss++;
				break;
			default:
				wins++;
				moveResult = 'winner';
		}
	}
	
	return moveResult;
}

// computer makes random move
function randomMove() {
	let random = Math.floor(Math.random() * 4);
	return movesList[random];
}

/**
 * checks the other player move and give it a counter
 * @returns string
 */
function alwaysWins() {
	let computerMove = '';
	switch(playerMove) {
		case "rock":
			computerMove = "paper";
			break;
		case "paper":
			computerMove = "scissors";
			break;
		case "scissors":
			computerMove = "rock";
			break;
		case "lizard":
			computerMove = "scissors";
			break;
		case "spock":
			computerMove = "lizard";
			break;
	}
	return computerMove;
}

/**
 * checks the other player move and looses on purpose
 * @returns string
 */
function alwaysLose() {
	let computerMove = '';
	switch(playerMove) {
		case "rock":
			computerMove = "scissors";
			break;
		case "paper":
			computerMove = "spock";
			break;
		case "scissors":
			computerMove = "lizard";
			break;
		case "lizard":
			computerMove = "spock";
			break;
		case "spock":
			computerMove = "rock";
			break;
	}
	return computerMove;
}

/**
 * tried to make the computer a bit smater by counting the players move depending on average game result
 */
function clairvoyant() {
	let computerMove;
	let winRateLimit = 90;
	let winRate = Math.round((100 * loss) / gamesPlayed);
	// start with a random winner
	if (gamesPlayed === 0) {
			computerMove = randomMove();
	}else{
		if (winRate > winRateLimit) {
			computerMove = alwaysLose();
		}else {
			computerMove = alwaysWins();
		}
	}

}

/**
 * after each move it checks the game moves
 * @param {string} playerMove 
 */
async function gameRound(playerMove) {
	gamesPlayed++;
	// robot makes random move
	let computerMove = randomMove();

	// show players hands for 1.4 second then remove
	await showHands(playerMove, computerMove);
	movesModal.hide();
	
	// TODO: storing in a global var so i can access it from various functions
	currentGameResult = checkWinner(playerMove, computerMove);
	// passing it as param so it is not dependent on global var
	showResults(currentGameResult);
}

/**
 * Displays the moves made by the players using icons
 * @param {string} pHand 
 * @param {string} cHand 
 * @returns Promise
 */
function showHands(pHand, cHand) {
	return new Promise(resolve => {
		const pImgSrc = `assets/hand-${pHand}.png`;
		const cImgSrc = `assets/hand-${cHand}.png`;
		document.querySelector('.moves-screen__img-player').setAttribute('src', pImgSrc);
		document.querySelector('.moves-screen__img-robot').setAttribute('src', cImgSrc);
		movesModal.show();
		// delay the next stage of the game by 1 sec
		setTimeout(() => {
			resolve();
		}, 1400);
	})
}

/**
 * preps the info for the result modal and opens the modal
 * @param {string} gameResult 
 */
function showResults(gameResult) {
	// get all the elements to add info to
	const usernameElem = document.querySelector('.result-screen__username');
	const gamesPlayedElem = document.querySelector('.result-screen__games-played');
	const winsElem = document.querySelector('.result-screen__wins');
	const lossesElem = document.querySelector('.result-screen__losses');
	const drawsElem = document.querySelector('.result-screen__draws');
	// assing values
	usernameElem.innerText = username;
	gamesPlayedElem.innerText = gamesPlayed;
	winsElem.innerText = wins;
	lossesElem.innerText = loss;
	drawsElem.innerText = draws;

	// add a class of winner, loser or draw
	toggleResultModal();

	resultModal.show();
}

/**
 * toggles the class of the results modal to change display
 */
function toggleResultModal() {
	// toggle game results
	if (currentGameResult == 'winner') {
		resultModalElem.classList.toggle('winner');
	}else if (currentGameResult == 'loser') {
		resultModalElem.classList.toggle('looser');
	}else {
		resultModalElem.classList.toggle('draw');
	}
}

/**
 * makes sure name start with the right characters. required for hackathon.
 * @param {string} username 
 * @returns boolean
 */
function isUsernameValid(username) {
	// start with valid characters
	if (username.match(/^[a-zA-Z]/)) {
		return true;
	}
}

/**
 * Start game init
 * @param {string} username 
 */
function gameInit(username) {
	console.log("ALUE: ", currentGameResult);
	keepPlaying = true;
	// remove modal to reveal game buttons
	usernameModal.hide();
}

startModal.show();