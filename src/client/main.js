'use strict';

import Canvas from './constants/canvas';
import RenderSystem from './systems/RenderSystem';
import BoardSystem from './systems/BoardSystem';
import ControlSystem from './systems/ControlSystem';
import HungerSystem from './systems/HungerSystem';
import CollisionSystem from './systems/CollisionSystem';
import PathfindingSystem from './systems/PathfindingSystem';
import MovementSystem from './systems/MovementSystem';
import Bunny from './prefabs/Bunny';
import Carrot from './prefabs/Carrot';
import engine from './engine';

const assetsToLoad = [ 'assets/bunny.png', 'assets/carrot.png', 'assets/tileWalkable.png', 'assets/tileUnwalkable.png'];

const render = new RenderSystem(Canvas.Width, Canvas.Height, Canvas.BackgroundColor);
const loader = PIXI.loader;

loader.add(assetsToLoad);
loader.once('complete', onAssetsLoaded);
loader.load();

function onAssetsLoaded() {
  const board = new BoardSystem(12, 9);

  engine.init();
  engine.registerSystem(render);
  engine.registerSystem(board);

  const boardMatrix = board.tiles;

  for (let i = 0; i < boardMatrix.length; i++) {
    const xArray = boardMatrix[i];

    for (let j = 0; j < xArray.length; j++) {
      engine.addEntity(xArray[j]);
    }
  }

  const pathfinding = new PathfindingSystem(board);

  engine.registerSystem(pathfinding);
  engine.registerSystem(new ControlSystem());
  engine.registerSystem(new HungerSystem());
  engine.registerSystem(new CollisionSystem());
  engine.registerSystem(new MovementSystem(0, 0, Canvas.Width, Canvas.Height));

  const carl = new Bunny();
  engine.addEntity(carl);

  window.setInterval(function addCarrot() {
    if (Math.random() > 0.5) {
      engine.addEntity(new Carrot());
    }
  }, 2000);
}
