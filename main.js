var xMax = 800;
var yMax = 600;
var render = new RenderSystem(800, 600, 0x1099bb);

var assetsToLoad = [ '_assets/bunny.png', '_assets/carrot.png', '_assets/tileWalkable.png', '_assets/tileUnwalkable.png'];
// create a new loader
var loader = PIXI.loader; // pixi exposes a premade instance for you to use.

loader.add(assetsToLoad);

loader.once('complete',onAssetsLoaded);

loader.load();

function onAssetsLoaded() {
    var board = new BoardSystem(12, 9);
    
    engine.init();
    engine.registerSystem(render);
    engine.registerSystem(board);
    var boardMatrix = board.getEntities();
    for (var i = 0; i < boardMatrix.length; i++) {
        var xArray = boardMatrix[i];
        for (var j = 0; j < xArray.length; j++) {
            engine.addEntity(xArray[j]);           
        }        
    }
    var pathfinding = new PathfindingSystem(board);
    engine.registerSystem(pathfinding);
    engine.registerSystem(new ControlSystem(0, 0, 800, 600));
    engine.registerSystem(new HungerSystem());
    engine.registerSystem(new CollisionSystem());       
    
    var carl = new Bunny();
    engine.addEntity(carl);
    
    var tile = board.getTileByAbsCoordinates(400, 100);
    console.log("Tile: " + tile.getComponent(Tile).position.x + ":" + tile.getComponent(Tile).position.y);
    

    window.setInterval(function () {
        if (Math.random() > 0.5) {
            engine.addEntity(new Carrot());
        }
    }, 2000);
}