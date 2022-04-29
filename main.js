// Moves
let playerMove = prompt("Type rock, paper, scissors");
let computerMove = "paper";



// player2 is the computer
function checkWinner(player1, player2) {
    let moveResult;
    // check the moves
    if (playerMove === computerMove) {
        return 0;
    }else{
        if (playerMove === "rock" && computerMove === "paper") {
            moveResult = -1;
        } else {
            if (playerMove === "scissors" && computerMove === "rock") {
                moveResult = -1;
            } else {
                if (playerMove === "paper" && computerMove === "scissors") {
                    moveResult = -1;
                } else {
                    moveResult = 1;
                }
            }
        }
    }
    return moveResult;
}

let result = checkWinner(playerMove, computerMove);

alert(result);


