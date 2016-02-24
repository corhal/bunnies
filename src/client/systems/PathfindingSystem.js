'use strict';

import Canvas from '../constants/canvas';
import Tile from '../components/Tile';
import Transform from '../components/Transform';
import Pathfinder from '../components/Pathfinder';

export default class PathfindingSystem {
  constructor(boardSystem) {
    this.boardSystem = boardSystem;
    
    do {
        this.destinationTile = this.boardSystem.getTileByAbsCoordinates(Math.round(Math.random(Canvas.Width)), Math.round(Math.random(Canvas.Height))).getComponent(Tile);        
    } while(!this.destinationTile.walkable);
    
    //this.destinationTile = this.boardSystem.getTileByAbsCoordinates(4, 7).getComponent(Tile);    
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

    window.addEventListener('mousedown', (event) => {    
      const clickedTile = this.boardSystem.getTileByAbsCoordinates(event.clientX, event.clientY).getComponent(Tile)
      if (clickedTile.walkable) {
          this.destinationTile = this.boardSystem.getTileByAbsCoordinates(event.clientX, event.clientY).getComponent(Tile);  
      }          
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

    if (pathfinder.currentPosition.x === -1) { // Определяем положение зайца в первый раз
        
      let availableTile;
      
      do {
        availableTile = this.boardSystem.getTileByAbsCoordinates(Math.round(Math.random(Canvas.Width)), Math.round(Math.random(Canvas.Height))).getComponent(Tile);        
      } while(!availableTile.walkable);   
         
      this.destinationTile = availableTile;
      pathfinder.startingPosition = availableTile.position;
      
      pathfinder.currentPosition.x = pathfinder.startingPosition.x;
      pathfinder.currentPosition.y = pathfinder.startingPosition.y;
      
      const currentTile = this.board[pathfinder.currentPosition.y][pathfinder.currentPosition.x]; 
      const tileTransform = currentTile.getComponent(Transform);     
      
      transform.position.x = tileTransform.position.x;
      transform.position.y = tileTransform.position.y;
    }

    pathfinder.destinationPosition.x = this.destinationTile.position.x;
    pathfinder.destinationPosition.y = this.destinationTile.position.y;    

    if (pathfinder.currentPosition.x !== this.destinationTile.position.x || pathfinder.currentPosition.y !== this.destinationTile.position.y) {
      const grid = new PF.Grid(this.matrix);
      const finder = new PF.AStarFinder();
      const path = finder.findPath(pathfinder.currentPosition.x, pathfinder.currentPosition.y, pathfinder.destinationPosition.x, pathfinder.destinationPosition.y, grid);      

      if (path.length > 1) {
        pathfinder.currentPosition.x = path[1][0];
        pathfinder.currentPosition.y = path[1][1];
        const currentTile = this.board[pathfinder.currentPosition.y][pathfinder.currentPosition.x]; 
        const tileTransform = currentTile.getComponent(Transform);        
        
        transform.position.x = tileTransform.position.x;
        transform.position.y = tileTransform.position.y;
      }
    }
  }
}
