'use strict';

export default class Movement {
  constructor(speed, angleInRad, rotation) {
    this.angleInRad = angleInRad;
    this.dx = speed * Math.sin(angleInRad);
    this.dy = speed * Math.cos(angleInRad);
    this.rotation = rotation;
    this.shouldMove = false;
  }
}
