let gamesPlayed = 0;
let wins = 0;
let loss = 0;
let draws = 0;
let playerMove;
let computerMove

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
                if ( (playerMove === "paper" && computerMove === "scissors") || (playerMove === "paper" && computerMove === "lizzard") ) {
                    moveResult = -1;
                    loss++;
                } else {
                    if ( (playerMove === "lizzard" && computerMove === "scissors") || (playerMove === "lizzard" && computerMove === "rock") ) {
                        moveResult = -1;
                        loss++;
                    } else {
                        if ( (playerMove === "spock" && computerMove === "paper") || (playerMove === "spock" && computerMove === "lizzard") ) {
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

// return random move from computer
function randomMove() {
    let moves = ["rock", "paper", "scissors", "lizzard", "spock"]
    let random = Math.floor(Math.random() * 4);
    return moves[4];
}

while(keepPlaying) {

    // Moves
    playerMove = prompt("Type rock, paper, scissors, lizzard, spock");
    computerMove = randomMove();

    // check for winner
    let result = checkWinner(playerMove, computerMove);
    gamesPlayed++;
    
    // resutl box
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


