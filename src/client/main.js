/* global RenderSystem, PIXI, BoardSystem, ControlSystem, HungerSystem, CollisionSystem, engine, PathfindingSystem, Bunny, Tile, Carrot */
var xMax = 800;
var yMax = 600;
var render = new RenderSystem(xMax, yMax, 0x1099bb);

var assetsToLoad = [ 'assets/bunny.png', 'assets/carrot.png', 'assets/tileWalkable.png', 'assets/tileUnwalkable.png'];
var loader = PIXI.loader;

loader.add(assetsToLoad);

loader.once('complete', onAssetsLoaded);

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
  console.log('Tile: ' + tile.getComponent(Tile).position.x + ':' + tile.getComponent(Tile).position.y);

  window.setInterval(function addCarrot() {
    if (Math.random() > 0.5) {
      engine.addEntity(new Carrot());
    }
  }, 2000);
}
