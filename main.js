// Modals
var startModalElem = document.querySelector('#StartScreenModal');
const startModal = new bootstrap.Modal(startModalElem);
var usernameModalElem = document.querySelector('#UsernameScreenModal');
const usernameModal = new bootstrap.Modal(usernameModalElem);
const movesModal = new bootstrap.Modal(document.querySelector('#MovesScreenModal'));
const resultModal = new bootstrap.Modal(document.querySelector('#ResultScreenModal'));

let username = 'Anonymous';
let keepPlaying = true;
let playerMove;

let gamesPlayed = 0;
let wins = 0;
let loss = 0;
let draws = 0;
let computerMove;


let checkUsername = true;

function getUserName() {
  
  let username = prompt("Enter your username(max 10 characters)");
    // Lets keep looping until user enters the right name
    while (checkUsername) {
        
        if (username === null) {
            username = "player";
        } else {
            username = username.charAt(0).toUpperCase() + username.slice(1).substring(0, 9);
        }
        if (username.match(/^[a-zA-Z]/)) {
            checkUsername = false;
        } else {
            username = prompt("Enter a valid username(not starting with numbers/symbols)");
        }
    }
}
    
// TODO: IF USER TYPES ANYTHING OTHER THAN WHATS ON THS LIST OF MOVES THE PLAYER WINS
// player2 is the computer
function checkWinner(player1, player2) {
    let moveResult;
    // check the moves
    if (playerMove === computerMove) {
        draws++;
        return 0;
    }else{
        if ( (playerMove === "rock" && computerMove === "paper") || (playerMove === "rock" && computerMove === "spock") ) {
            moveResult = -1;
            loss++; 
        } else {
            if ( (playerMove === "scissors" && computerMove === "rock") || (playerMove === "scissors" && computerMove === "spock") ) {
                moveResult = -1;
                loss++
            } else {
                if ( (playerMove === "paper" && computerMove === "scissors") || (playerMove === "paper" && computerMove === "lizard") ) {
                    moveResult = -1;
                    loss++;
                } else {
                    if ( (playerMove === "lizard" && computerMove === "scissors") || (playerMove === "lizard" && computerMove === "rock") ) {
                        moveResult = -1;
                        loss++;
                    } else {
                        if ( (playerMove === "spock" && computerMove === "paper") || (playerMove === "spock" && computerMove === "lizard") ) {
                            moveResult = -1;
                            loss++;
                        } else {
                            moveResult = 1;
                            wins++;
                        }
                    }
                }
            }
        }
    }
    return moveResult;
}

// computer makes random move
function randomMove() {
    let moves = ["rock", "paper", "scissors", "lizard", "spock"]
    let random = Math.floor(Math.random() * 4);
    computerMove = moves[random];
}

// computer always wins
function alwaysWins() {
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
}

// computer will always loose their move
function alwaysLose() {
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
}

// computer decides how many times to win or loose
function clairvoyant() {
    let winRateLimit = 90;
    let winRate = Math.round((100 * loss) / gamesPlayed);
    // start with a random winner
    if (gamesPlayed === 0) {
        randomMove();
    }else{
        if (winRate > winRateLimit) {
            alwaysLose();
        }else {
            alwaysWins();
        }
    }

}

function gameRound() {

    // Game loop
    // while(keepPlaying) {
            
        // Moves
        // playerMove = prompt("Type rock, paper, scissors, lizard, spock");
        // computerMove = randomMove();
        // alwaysLose();
        clairvoyant();
        
        // check for winner
        let result = checkWinner(playerMove, computerMove);
        gamesPlayed++;
        
        // result box
        console.log(`
        ${username} move: ${playerMove}
        Computer move: ${computerMove}
        -------------------------------
        Games played: ${gamesPlayed}
        Wins: ${wins}
        Losses: ${loss}
        Draws: ${draws}`);
        
        // keepPlaying = confirm("Do you want to keep playing?");
    // }

}

// MOVES SCREEN
// const playerMove = '.moves-screen__img-player'
// const playerMove = '.moves-screen__img-robot'



// const startScreenModal = new bootstrap.Modal(document.querySelector('#StartScreenModal'));
// startScreenModal.show();






function gameInit(event) {
	// because im using a form
	event.preventDefault();
	// remove modal to reveal game buttons
	usernameModal.hide();
	// store the username in global scope
	username = document.querySelector('#Username').value;
	// the buttons should only be active when game is active
	const gameScreenbtn = document.querySelector('.game-screen');
	gameScreenbtn.addEventListener('click', elem => {
		playerMove = elem.target.innerText.toLowerCase();
		gameRound()
	});
}

// only seem to be able to close a model if its programmatically opened by me and not BS
const startScreenBtn = document.querySelector('.start-screen__btn');
startScreenBtn.addEventListener('click', elem => {
	startModal.hide();
});

// must await for the start modal to close before opening the usernamem modal
startModalElem.addEventListener('hidden.bs.modal', e => {
	usernameModal.show();
});

// username form
const usernameForm = document.querySelector('.username-form');
usernameForm.addEventListener('submit', gameInit);

startModal.show();