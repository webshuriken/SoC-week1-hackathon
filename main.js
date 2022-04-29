let gamesPlayed = 0;
let wins = 0;
let loss = 0;
let draws = 0;
let playerMove;
let computerMove;

let keepPlaying = true;

let checkUsername = true;

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

// Game loop
while(keepPlaying) {

    // Moves
    playerMove = prompt("Type rock, paper, scissors, lizard, spock");
    // computerMove = randomMove();
    // alwaysLose();
    clairvoyant();

    // check for winner
    let result = checkWinner(playerMove, computerMove);
    gamesPlayed++;

    // result box
    alert(`
    ${username} move: ${playerMove}
    Computer move: ${computerMove}
    -------------------------------
    Games played: ${gamesPlayed}
    Wins: ${wins}
    Losses: ${loss}
    Draws: ${draws}`);

    keepPlaying = confirm("Do you want to keep playing?");
}


