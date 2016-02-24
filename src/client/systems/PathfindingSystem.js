'use strict';

import Tile from '../components/Tile';
import Transform from '../components/Transform';
import Pathfinder from '../components/Pathfinder';

export default class PathfindingSystem {
  constructor(boardSystem) {
    this.boardSystem = boardSystem;
    this.destinationTile = this.boardSystem.getTileByAbsCoordinates(4, 7).getComponent(Tile);
    console.log(boardSystem);
    console.log(this.boardSystem);
    this.board = boardSystem.tiles;
    this.matrix = [];

    for (let i = 0; i < this.board.length; i++) {
      const xArray = this.board[i];
      const matrixXarray = [];
      for (let j = 0; j < xArray.length; j++) {
        if (xArray[j].getComponent(Tile).walkable) {
          matrixXarray.push(0);
        } else {
          matrixXarray.push(1);
        }
      }
      this.matrix.push(matrixXarray);
    }
    console.log(this.matrix);

    window.addEventListener('mousedown', (event) => {
      console.log(this.boardSystem.getTileByAbsCoordinates(event.clientX, event.clientY));
      this.destinationTile = this.boardSystem.getTileByAbsCoordinates(event.clientX, event.clientY).getComponent(Tile);
      console.log(this.destinationTile);
    });
  }

  update(entities) {
    const pathfinderEntities = entities.filter((el) => {
      return el.hasComponent(Pathfinder);
    });

    /* var entitiestoUpdate = pathfinderEntities.filter(function(pathfinderEntity) {
        return pathfinderEntity.destinationPosition != pathfinderEntity.currentPosition;
    }); */

    pathfinderEntities.forEach(this.updateEntity, this);
  }

  updateEntity(entity) { // почти научились ходить
    const pathfinder = entity.getComponent(Pathfinder);
    const transform = entity.getComponent(Transform);

    if (pathfinder.currentPosition.x === -1) { // где-то здесь косяк, который переворачивает зайца
      // console.log("Abs: " + pathfinder.startingPosition.x + ":" + pathfinder.startingPosition.y);
      pathfinder.startingPosition = this.boardSystem.getTileByAbsCoordinates(pathfinder.startingPosition.x, pathfinder.startingPosition.y).getComponent(Tile).position;
      // console.log(pathfinder.startingPosition.x + ":" + pathfinder.startingPosition.y);
      // console.log("old:" + pathfinder.currentPosition.x + ":" + pathfinder.currentPosition.y);
      pathfinder.currentPosition = pathfinder.startingPosition;
      // console.log("new:" + pathfinder.currentPosition.x + ":" + pathfinder.currentPosition.y);
      const currentTile = this.board[pathfinder.currentPosition.y][pathfinder.currentPosition.x]; // why?
      const tileTransform = currentTile.getComponent(Transform);
      const tileTile = currentTile.getComponent(Tile);
      console.log('CurrentTile: ' + tileTile.position.x + ':' + tileTile.position.y);
      console.log('CurrentTileTransform: ' + tileTransform.position.x + ':' + tileTransform.position.y);
      transform.position.x = tileTransform.position.x;
      transform.position.y = tileTransform.position.y;
    }

    pathfinder.destinationPosition = this.destinationTile.position;

    pathfinder.destinationPosition.x = this.destinationTile.position.x;
    pathfinder.destinationPosition.y = this.destinationTile.position.y;

    // console.log(pathfinder.destinationPosition);

    if (pathfinder.currentPosition.x !== this.destinationTile.position.x || pathfinder.currentPosition.y !== this.destinationTile.position.y) {
      const grid = new PF.Grid(this.matrix);
      const finder = new PF.AStarFinder();
      const path = finder.findPath(pathfinder.currentPosition.x, pathfinder.currentPosition.y, pathfinder.destinationPosition.x, pathfinder.destinationPosition.y, grid);
      console.log(path);

      if (path.length > 1) {
        pathfinder.currentPosition.x = path[1][0];
        pathfinder.currentPosition.y = path[1][1];
        const currentTile = this.board[pathfinder.currentPosition.y][pathfinder.currentPosition.x]; // whyyyy?
        const tileTransform = currentTile.getComponent(Transform);
        const tileTile = currentTile.getComponent(Tile);

        console.log('CurrentTile: ' + tileTile.position.x + ':' + tileTile.position.y);
        console.log('CurrentTileTransform: ' + tileTransform.position.x + ':' + tileTransform.position.y);
        transform.position.x = tileTransform.position.x;
        transform.position.y = tileTransform.position.y;
      }
    }
  }
}
