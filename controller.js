//loop that runs the game

var gameState = {
    paused: true
};

var dieLayer = {}

function reset() {
    var newTeams = makeTeams(4);
    gameState = {
        teams: newTeams,
        currentTeam: 0,
        paused: false,
        dieValue: rollDie(6)
    }
}

function placeOnBoard(teamNumber) {
    var team = gameState.teams[teamNumber];
    team.players[0].location = team.start;
}

function playersInHome(teamNumber) {
    console.log(`Finding players in ${teamNumber}`);
    return gameState.teams[teamNumber].players.find(function (player) {
        return player.location == -1;
    });
}

function rollDie(max) {
    return Math.ceil(Math.random() * max);
}

function takeTurn() {
    gameState.dieValue = rollDie(6);
    var turnValue = gameState.dieValue;
    console.log(turnValue);
    var currentTeam = gameState.currentTeam;
    
    if (playersInHome(currentTeam) && turnValue == 6) {
        placeOnBoard(currentTeam);
        gameState.paused = true;
    }
                     
    if (gameState.currentTeam == gameState.teams.length - 1) {
        gameState.currentTeam = 0;
    } else {
        gameState.currentTeam++;
    }
    console.log('Drawing die');
    dieLayer.draw();
    
}

reset();

/*
process flow

start game
reset all pieces to home
pick team to start
roll die
if 6 -> place piece on board -> roll again -> move piece
else -> next

*/
