let gamesPlayed = 0;
let wins = 0;
let loss = 0;
let draws = 0;

let keepPlaying = true;

let checkUsername = true;

let username = prompt("Enter your username(max 10 characters)");

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

while(keepPlaying) {

    // Moves
    let playerMove = prompt("Type rock, paper, scissors");
    let computerMove = randomMove();

    function randomMove() {
        let moves = ["rock", "paper", "scissors"]
        let random = Math.floor(Math.random() * 2);
        return moves[random]
    }

    // player2 is the computer
    function checkWinner(player1, player2) {
        let moveResult;
        // check the moves
        if (playerMove === computerMove) {
            draws++;
            return 0;
        }else{
            if (playerMove === "rock" && computerMove === "paper") {
                moveResult = -1;
                loss++;
            } else {
                if (playerMove === "scissors" && computerMove === "rock") {
                    moveResult = -1;
                    loss++
                } else {
                    if (playerMove === "paper" && computerMove === "scissors") {
                        moveResult = -1;
                        loss++;
                    } else {
                        moveResult = 1;
                        wins++;
                    }
                }
            }
        }
        return moveResult;
    }

    let result = checkWinner(playerMove, computerMove);
    gamesPlayed++;
    
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


