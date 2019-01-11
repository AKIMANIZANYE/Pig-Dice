

var scores, roundScore, activePlayer, gamePlaying;
var btnRoll = document.querySelector('.btn-roll');
var btnHold = document.querySelector('.btn-hold');


var diceimgs = {

    diceimg01: "1.png",
    diceimg02: '2.png',
    diceimg03: "3.png",
    diceimg04: "4.png",
    diceimg05: "https://cdn.pbrd.co/images/70Zqc4icX.png",
    diceimg06: "https://cdn.pbrd.co/images/712DzRw22.png",
    diceimg11: "https://cdn.pbrd.co/images/713n3lHQN.png",
    diceimg12: 'https://cdn.pbrd.co/images/713JSMJDr.png',
    diceimg13: "https://cdn.pbrd.co/images/HvoZO4Gb.png",
    diceimg14: "https://cdn.pbrd.co/images/HvqN3Kjq.png",
    diceimg15: "https://cdn.pbrd.co/images/714IXBStH.png",
    diceimg16: "https://cdn.pbrd.co/images/714ZovsdD.png"
};
init();



document.querySelector('.btn-roll').addEventListener('click', function () {
    if (gamePlaying) {

        var dice = Math.floor(Math.random() * 6) + 1;


        var diceDOM = document.querySelector('.dice');
        diceDOM.style.display = 'block';
        diceDOM.src = diceimgs['diceimg' + activePlayer + dice];

        document.querySelector('#ongoing-' + activePlayer).innerHTML = '<em>' + dice + '</em';

        if (dice !== 1) {
            hideRolledMsg();
            //add score
            roundScore += dice;
            document.querySelector('#ongoing-' + activePlayer).textContent = roundScore;
        } else {
            //disable button

            disableBtn(btnRoll, 1000);
            hideRolledMsg();
            document.querySelector('.player-' + activePlayer + '-rolled-1').style.visibility = 'visible';
            nextPlayer();
        }
    }


});



document.querySelector('.btn-hold').addEventListener('click', function () {
    if (gamePlaying) {
        disableBtn(btnRoll, 1000);
        // Add current score to global score
        scores[activePlayer] += roundScore;

        //Update the UI
        document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];

        //check if player won the game

        if (scores[activePlayer] >= 50) {
            document.querySelector('#name-' + activePlayer).textContent = 'Winner!';
            document.querySelector('.dice').style.display = 'none';
            document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner-' + activePlayer);
            document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active-' + activePlayer);
            gamePlaying = false;

        } else {
            nextPlayer();
        }
    }


});


document.querySelector('.btn-new').addEventListener('click', init);

document.querySelector('.btn-rules').addEventListener('click', function () {
    var games = document.getElementsByClassName('game-panel');
    for (i = 0; i < games.length; i++) {
        games[i].style.display = 'none';
    }

    document.querySelector('.btn-back').style.display = 'block';
    var rules = document.getElementsByClassName('rules-panel');
    for (i = 0; i < rules.length; i++) {
        rules[i].style.display = 'block';
    }

});

document.querySelector('.btn-back').addEventListener('click', function () {
    var games = document.getElementsByClassName('game-panel');
    for (i = 0; i < games.length; i++) {
        games[i].style.display = 'block';
    }

    document.querySelector('.btn-back').style.display = 'none';
    var rules = document.getElementsByClassName('rules-panel');
    for (i = 0; i < rules.length; i++) {
        rules[i].style.display = 'none';
    }

});

function init() {
    scores = [0, 0];
    roundScore = 0;
    activePlayer = 0;
    gamePlaying = true;
    document.querySelector('.dice').style.display = 'none';
    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('ongoing-0').textContent = '0';
    document.getElementById('ongoing-1').textContent = '0';
    document.querySelector('.player-0-rolled-1').style.visibility = 'hidden';
    document.querySelector('.player-1-rolled-1').style.visibility = 'hidden';

    document.querySelector('#name-0').textContent = 'Player 1';
    document.querySelector('#name-1').textContent = 'Player 2';
    document.querySelector('.player-0-panel').classList.add('active-0');
    document.querySelector('.player-0-panel').classList.remove('winner-0');
    document.querySelector('.player-1-panel').classList.remove('winner-1');

}

function nextPlayer() {
    //next player
    var icons = document.getElementsByTagName('i');
    for (i = 0; i < icons.length; i++) {
        icons[i].classList.remove('color-' + activePlayer);
    }

    document.querySelector('.dice').style.display = 'none';
    document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active-' + activePlayer);
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    roundScore = 0;

    for (i = 0; i < icons.length; i++) {
        icons[i].classList.add('color-' + activePlayer);
    }
    document.querySelector('.player-' + activePlayer + '-panel').classList.add('active-' + activePlayer);
    document.querySelector('#ongoing-0').textContent = '0';
    document.querySelector('#ongoing-1').textContent = '0';
}

function disableBtn(btn, time) {
    //disable button
    btn.disabled = true;
    setTimeout(function () { btn.disabled = false; }, time);
}

function hideRolledMsg() {
    document.querySelector('.player-0-rolled-1').style.visibility = 'hidden';
    document.querySelector('.player-1-rolled-1').style.visibility = 'hidden';
}


