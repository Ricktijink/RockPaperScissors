
// Grab DOM elements and store in variables
const choices = document.querySelectorAll('.choice');
const score = document.querySelector('#score');
const result = document.querySelector('#result');
const restart = document.querySelector('#restart');
const modal = document.querySelector('.modal');

// Scoreboard object
const scoreboard = {
    player: 0,
    ai: 0
}

// Play game 
function play(e) {
    // Show restart button after game is played
    restart.style.display = 'block'
    // Get player choice
    const playerChoice = e.target.id;
    // Get Ai choice
    const aiChoice = getAiChoice();
    // Decide winner
    const winner = decideWinner(playerChoice, aiChoice);
    // Open modal, show winner and Ai choice, increase score
    showWinner(winner, aiChoice);
}

// Get AI choice
function getAiChoice() {
    const randomNumber = Math.random();

    if(randomNumber < 0.34) {
        return 'rock';
    } else if(randomNumber <= 0.67) {
        return 'paper';
    } else { 
        return 'scissors';
    }
}

// Decide winner
function decideWinner(player, ai){
    if(player === ai) {
        return 'draw';
        // Player picks Rock
    } else if (player === 'rock') {
        if(ai === 'paper'){
            return 'ai'
        } else {
            return 'player'
        }
        // Player picks Paper
    } else if (player === 'paper') {
        if(ai === 'scissors'){
            return 'ai'
        } else {
            return 'player'
        }
        // Player picks Scissors
    } else if (player === 'scissors') {
        if(ai === 'rock'){
            return 'ai'
        } else {
            return 'player'
        }
    }
}

// Show the winner
function showWinner(winner, aiChoice) {
    if (winner === 'player') {
        // Increase player score
        scoreboard.player++;

        // Add results in result modal
        result.innerHTML = `
            <h1 class="text-win">You win!</h1>
            <i class="fas fa-hand-${aiChoice} fa-10x"></i>
            <p>Ai chose <strong>${aiChoice.charAt(0).toUpperCase() + aiChoice.slice(1)}</strong></p>`;
    } else if (winner === 'ai'){
        // Increase Ai score
        scoreboard.ai++;

        // Add results in result modal
        result.innerHTML = `
            <h1 class="text-lose">You Lose!</h1>
            <i class="fas fa-hand-${aiChoice} fa-10x"></i>
            <p>Ai chose <strong>${aiChoice.charAt(0).toUpperCase() + aiChoice.slice(1)}</strong></p>`;
    } else {
        // Add results in result modal
        result.innerHTML = `
            <h1>It's a draw!</h1>
            <i class="fas fa-hand-${aiChoice} fa-10x"></i>
            <p>Ai chose <strong>${aiChoice.charAt(0).toUpperCase() + aiChoice.slice(1)}</strong></p>`;
    }
    // Update score and show Modal
    score.innerHTML = `<p>Player: ${scoreboard.player}</p>
    <p>Ai: ${scoreboard.ai}</p>`;

    modal.style.display = 'flex';
}

// Reset scores, hide restart button
function restartGame(){
    scoreboard.player = 0;
    scoreboard.ai = 0;
    score.innerHTML = `
    <p>Player: 0</p>
    <p>Ai: 0</p>`;
    restart.style.display = 'none';
}

// Clear modal when clicking on overlay
function clearModal(e){
    if (e.target == modal) {
        modal.style.display = 'none';
    }
}

// Event listeners
choices.forEach(choice => choice.addEventListener('click', play));
modal.addEventListener('click', clearModal);
restart.addEventListener('click', restartGame)