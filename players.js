console.log('loading players');

var playerCount = 4;
var teamSize = 4;
var teams = [];

function makePlayers(teamSize) {
    var players = [];
    for (var i = 0; i < teamSize; i++) {
        players.push({
            location: -1,
            avatar: {}
        });
    }
    return players;
}

function makeTeam(size, start) {
    return {
        start: start, // location on board where team starts
        end: start - 1,
        players: makePlayers(teamSize)
    }
}

function makeTeams(size) {
    var teams = [];
    for (var i = 0; i < size; i++) {
        var start = i * 8;
        teams.push(makeTeam(teamSize, start));
    }
    return teams;
}

