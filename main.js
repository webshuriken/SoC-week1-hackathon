let gamesPlayed = 0;
let wins = 0;
let loss = 0;
let draws = 0;

let keepPlaying = true;

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
    Player move: ${playerMove}
    Computer move: ${computerMove}
    -------------------------------
    Games played: ${gamesPlayed}
    Wins: ${wins}
    Losses: ${loss}
    Draws: ${draws}`);

    keepPlaying = confirm("Do you want to keep playing?");
}


