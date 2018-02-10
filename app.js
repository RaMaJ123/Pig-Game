var scores, roundScore, activePlayer, gamePlaying;
var diceImage, winningScore,previousRoll;

gameInit();

document.querySelector('.btn-roll').addEventListener('click', function(){
    if(gamePlaying){
    //Generate a Random Number
    var dice = Math.floor(Math.random() * 6) + 1;
    var dice1 = Math.floor(Math.random() * 6) + 1;
        
    //Display the result as a dice image.
    document.getElementById('dice-1').src = "dice-" + dice + '.png';
    document.getElementById('dice-2').src = "dice-" + dice1 + '.png';
    document.getElementById('dice-1').style.display = "block";
    document.getElementById('dice-2').style.display = "block";
    
    //Update the result of the roundScore only if the dice value is not 1
    if(previousRoll === 12 && dice === 6){
        scores = [0, 0];
        roundScore = 0;
        document.querySelector("#current-" + activePlayer).textContent = 0;
        document.querySelector("#score-" + activePlayer).textContent = 0;
        activePlayerToggle();
    } else if(dice === 1 || dice1 === 1){
        document.querySelector('#current-' + activePlayer).textContent = 0;
        activePlayerToggle();
    } else {
       roundScore += (dice + dice1);
       document.querySelector('#current-' + activePlayer).textContent = roundScore;
    }
        
    previousRoll = (dice + dice1);
 }
});

document.querySelector('.btn-hold').addEventListener('click', function(){
    if(gamePlaying){
    scores[activePlayer] += roundScore;
    document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer]; 
        
    var input = document.getElementById('winningScore').value;
    if(input){
        winningScore = input;
    }else{
        winningScore = 100;
    }
    if(scores[activePlayer] >= winningScore){
        document.querySelector('#name-' + activePlayer).textContent = "Winner!"
        document.getElementById('dice-1').style.display = "none";
        document.getElementById('dice-2').style.display = "none";
        document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
        document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
        gamePlaying = false;
    }else{
        activePlayerToggle();
    }
    }
});

function activePlayerToggle(){
     activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
     roundScore = 0;
     document.getElementById('dice-1').style.display = "none";
     document.getElementById('dice-2').style.display = "none";
     document.querySelector('.player-0-panel').classList.toggle('active');
     document.querySelector('.player-1-panel').classList.toggle('active');
}

function gameInit() {
    scores = [0, 0];
    roundScore = 0;
    activePlayer = 0;
    gamePlaying = true;
    document.getElementById('current-0').textContent = 0;
    document.getElementById('score-0').textContent = 0;
    document.getElementById('current-1').textContent = 0;
    document.getElementById('score-1').textContent = 0;
    document.getElementById('winningScore').value = null;
    document.getElementById('name-0').textContent = "Player 1";
    document.getElementById('name-1').textContent = "Player 2";
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.add('active');
    document.getElementById('dice-1').style.display = "none";
    document.getElementById('dice-2').style.display = "none";
}

// Function called when the New game button is clicked        
document.querySelector('.btn-new').addEventListener('click', gameInit);
