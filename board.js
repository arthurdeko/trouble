var degub = {};
// first we need to create a stage
var stageSize = 700;

var stage = new Konva.Stage({
    container: 'container',   // id of container <div>
    width: stageSize,
    height: stageSize
});

var theme = {
    teamColors: [
        "#FBF46D",
        "#B4FE98",
        "#77E4D4",
        "#998CEB"
    ]
}

// then create layer
var layer = new Konva.Layer();
var wedgeStroke = 0;

var sectionNW = new Konva.Wedge({
    x: stage.width() / 2,
    y: stage.height() / 2,
    radius: (stageSize / 2) - 5,
    angle: 90,
    fill: theme.teamColors[3],
    stroke: 'black',
    strokeWidth: wedgeStroke,
    rotation: 0,
});

var sectionNE = new Konva.Wedge({
    x: stage.width() / 2,
    y: stage.height() / 2,
    radius: (stageSize / 2) - 5,
    angle: 90,
    fill: theme.teamColors[2],
    stroke: 'black',
    strokeWidth: wedgeStroke,
    rotation: 90,
});

var sectionSW = new Konva.Wedge({
    x: stage.width() / 2,
    y: stage.height() / 2,
    radius: (stageSize / 2) - 5,
    angle: 90,
    fill: theme.teamColors[1],
    stroke: 'black',
    strokeWidth: wedgeStroke,
    rotation: 180,
});

var sectionSE = new Konva.Wedge({
    x: stage.width() / 2,
    y: stage.height() / 2,
    radius: (stageSize / 2) - 5,
    angle: 90,
    fill: theme.teamColors[0],
    stroke: 'black',
    strokeWidth: wedgeStroke,
    rotation: 270,
});

layer.add(sectionNW);
layer.add(sectionNE);
layer.add(sectionSW);
layer.add(sectionSE);

// create our shape
var circle = new Konva.Circle({
    x: stage.width() / 2,
    y: stage.height() / 2,
    radius: 5,
    fill: 'black',
    stroke: 'black',
    strokeWidth: 1
});

function basicSpace(x, y, size, fill) {
    return new Konva.Circle({
        x: x,
        y: y,
        radius: size,
        fill: fill,
        stroke: 'black',
        strokeWidth: 4
    });
}

function makeSpaces(steps) {
    var spaces = [];
    var radius = (stageSize / 2) - 30;
    for (var i=1; i <= steps; i++) {
        var x = (stageSize / 2) + radius * Math.cos(2 * Math.PI * (i / steps));
        var y = (stageSize / 2) + radius * Math.sin(2 * Math.PI * (i / steps));
        var type = 'basic';
        if ( (i - 1) % 8 == 0 ) {
            type = 'start';
        } else if ((i + 4) % 8 == 0) {
            type = 'double';
        } else {
            type = 'basic';
        }
        spaces.push({x, y, type});
    }
    return spaces;
}

var spaces = makeSpaces(32);

for (var i = 0; i < spaces.length; i++) {
    if ( spaces[i].type == 'start') {
        layer.add(basicSpace(spaces[i].x, spaces[i].y, 15, 'grey'));
    } else if (spaces[i].type == 'double') {
        layer.add(basicSpace(spaces[i].x, spaces[i].y, 15, 'white'));
    } else {
        layer.add(basicSpace(spaces[i].x, spaces[i].y, 15, 'lightgray'));
    }
}

for (var i = 0; i < 4;i++) {
    layer.add(basicSpace(stageSize / 2, (60 * i) + 80, 15, theme.teamColors[0]));
}

for (var i = 0; i < 4;i++) {
    layer.add(basicSpace((60 * i) + 80, stageSize / 2, 15, theme.teamColors[1]));
}

for (var i = 0; i < 4;i++) {
    layer.add(basicSpace(stageSize / 2, (60 * i) + (stageSize - 260), 15, theme.teamColors[2]));
}

for (var i = 0; i < 4;i++) {
    layer.add(basicSpace((60 * i) + (stageSize - 260), stageSize / 2, 15, theme.teamColors[3]));
}

// add the layer to the stage
stage.add(layer);

dieLayer = new Konva.Layer();
var dieRadius = 50;
var dieCircle = new Konva.Circle({
    x: stage.width() / 2,
    y: stage.height() / 2,
    radius: dieRadius,
    fill: 'white',
    stroke: 'black',
    strokeWidth: 4
});
var dieValue = new Konva.Text({
    x: (stage.width() / 2) - 8,
    y: (stage.height() / 2) - 8,
    fontSize: 24,
    font: 'helvetica',
    text: 1
});

dieCircle.on('mouseup', function(event) {
    takeTurn();
    dieValue.text(gameState.dieValue);
});

dieLayer.add(dieCircle);
dieLayer.add(dieValue);
stage.add(dieLayer);

// draw the image
layer.draw();
dieLayer.draw();
