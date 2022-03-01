//loop that runs the game

var gameState = {
    paused: true
};

function reset() {
    var newTeams = makeTeams(4);
    gameState = {
        teams: newTeams,
        currentTeam: 0,
        paused: false
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

function takeTurn() {
    var turnValue = rollDie(6);
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
