'use strict';

export default class Tile {
  constructor(x, y, walkable) {
    this.position = {
      x: x, // dont't ask
      y: y
    };
    this.walkable = walkable;
  }
}
