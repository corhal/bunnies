'use strict';

import TilePrefab from '../prefabs/TilePrefab';
import Transform from '../components/Transform';
import Appearance from '../components/Appearance';

/**
 * @TODO: Эта система что-то делает
 * @class BoardSystem
 */
export default class BoardSystem {
  /**
   * @param {number} width  ширина поля
   * @param {number} height высота поля
   * @constructor
   */
  constructor(width, height) {
    this.tiles = [];

    for (let i = 0; i < height; i++) {
      const xArray = [];

      for (let j = 0; j < width; j++) {
        const newTile = new TilePrefab(j, i);

        xArray.push(newTile);
      }

      this.tiles.push(xArray);
    }
  }
  
  update() {

  }

  /**
   * @method
   * @param {number} x
   * @param {number} y
   * @return {TilePrefab}
   */ 
  getTileByAbsCoordinates(x, y) {
    let result;

    const xFloored = Math.floor(x / 64);
    const yFloored = Math.floor(y / 64);
    
    result = this.tiles[yFloored][xFloored];

    return result;
  }
}
