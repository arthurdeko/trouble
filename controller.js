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

function makeMarkers(players) {
    var markerLocations = players.forEach(function (player) {
        var markerSpace = spaces[player.location + gameState.dieResult];
        var marker = basicSpace(markerSpace.x, markerSpace.y, 20, 'orange');
        marker.opacity(0.7);
        marker.on('mouseup', function () {
            markerLayer.clear();
        });
        markerLayer.add(marker);
    });
    
}

function takeTurn() {
    gameState.dieResult = rollDie(6);
    var turnValue = gameState.dieResult;
    var currentTeam = gameState.currentTeam;
    
    var playerInHome = playersInHome(currentTeam);
    var onBoard = playersOnBoard(currentTeam);

    if (playerInHome && onBoard.length == 0 && turnValue == 6) {
        placeOnBoard(currentTeam, playerInHome.id);
    } else if (onBoard.length > 0 && turnValue == 6) {
        console.log(makeMarkers(onBoard));
    } else if (onBoard.length > 0) {
        console.log(makeMarkers(onBoard));
        if (gameState.currentTeam == gameState.teams.length - 1) {
            gameState.currentTeam = 0;
        } else {
            gameState.currentTeam++;
        }
    } else {
        if (gameState.currentTeam == gameState.teams.length - 1) {
            gameState.currentTeam = 0;
        } else {
            gameState.currentTeam++;
        }
    }
                     
    dieLayer.draw();
    turnIndicator.fill(theme.teamColors[currentTeam]);
    layer.draw();
}

reset();
