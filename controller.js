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
        dieResult: rollDie(6)
    }
}

function placeOnBoard(teamNumber, playerId) {
    var team = gameState.teams[teamNumber];
    var player = team.players.find(function (p) {
        return p.id == playerId;
    });
    player.location = team.start;
    player.avatar.x(spaces[team.start].x);
    player.avatar.y(spaces[team.start].y);
    playerLayer.add(player.avatar);
    console.log(player.avatar);
    playerLayer.draw();
}

function playersInHome(teamNumber) {
    return gameState.teams[teamNumber].players.find(function (player) {
        return player.location == -1;
    });
}

function rollDie(max) {
    var value = Math.ceil(Math.random() * max);
    gameState.dieResult = value;
    return value;
}

function playersOnBoard(teamNumber) {
    return gameState.teams[teamNumber].players.filter(function (player) {
        return player.location != -1;
    });
}

function takeTurn() {
    gameState.dieResult = rollDie(6);
    var turnValue = gameState.dieResult;
    console.log(turnValue);
    var currentTeam = gameState.currentTeam;
    
    var playerInHome = playersInHome(currentTeam);
    var onBoard = playersOnBoard(currentTeam);

    if ( playerInHome && turnValue == 6) {
        placeOnBoard(currentTeam, playerInHome.id);
    } else if (onBoard) {
        console.log(onBoard);
    } else {
        if (gameState.currentTeam == gameState.teams.length - 1) {
            gameState.currentTeam = 0;
        } else {
            gameState.currentTeam++;
        }
    }
                     

    console.log('Drawing die');
    dieLayer.draw();

    turnIndicator.fill(theme.teamColors[currentTeam]);
    layer.draw();
}

reset();
