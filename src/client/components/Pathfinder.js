'use strict';

export default class Pathfinder {
  constructor(startingAbsX, startingAbsY) {
    this.startingPosition = {
      x: startingAbsX,
      y: startingAbsY
    };
    this.currentPosition = {
      x: -1,
      y: -1
    };
    this.destinationPosition = {
      x: Math.round(startingAbsX / 64),
      y: Math.round(startingAbsY / 64)
    };
  }
}
