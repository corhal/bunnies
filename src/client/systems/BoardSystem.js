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

  // this.getEntities() === this.tiles;
  getEntities() {
    return this.tiles;
  }

  // this.entities === this.tiles;
  get entities() {
    return this.tiles;
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

    this.tiles.forEach(function iterateTileRows(tileRow) {
      const tileWeNeed = tileRow.filter(function findTile(tile) {
        const position = tile.getComponent(Transform).position;
        const appearance = tile.getComponent(Appearance);
        const xCollision = x >= position.x - appearance.width / 2 && x <= (position.x + appearance.width / 2);
        const yCollision = y >= position.y - appearance.height / 2 && y <= (position.y + appearance.height / 2);

        return xCollision && yCollision;
      });

      const anotherCheck = tileWeNeed.length > 0;

      if (anotherCheck) {
        result = tileWeNeed[0];
      }
    });

    return result;
  }
}
