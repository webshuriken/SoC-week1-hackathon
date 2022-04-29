

let playerMove = "scissors";
let computerMove = "scissors";

if (playerMove === computerMove) {
    console.log("Draw");
}

if (playerMove === "rock" && computerMove === "paper") {
    console.log("You lose");
} else {
    console.log("You win")
}

if (playerMove === "scissors" && computerMove === "rock") {
    console.log("You lose");
} else {
    console.log("You win")
}

if (playerMove === "paper" && computerMove === "scissors") {
    console.log("You lose");
} else {
    console.log("You win")
}
