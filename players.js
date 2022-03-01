console.log('loading players');

var playerCount = 4;
var teamSize = 4;
var teams = [];

function makePlayers(teamSize) {
    var players = [];
    for (var i = 0; i < teamSize; i++) {
        players.push({
            id: i,
            location: -1,
            avatar: new Konva.Circle({
                x: i * 20,
                y: 10,
                radius: 5,
                fill: 'black',
                stroke: 'black',
                strokeWidth: 1
            })
        });
    }
    return players;
}

function makeTeam(teamSize, start) {
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
        teams.push(makeTeam(size, start));
    }
    return teams;
}

