'use strict';

export default class Movement {
  constructor(speed, angleInRad, rotation) {
    this.angleInRad = angleInRad;
    this.speed = speed;
    // this.dx = speed * Math.sin(angleInRad);
    // this.dy = speed * Math.cos(angleInRad);
    this.absRotation = rotation;
    this.rotation = rotation;
    this.shouldMove = false;
    this.shouldRotate = false;
  }
}
