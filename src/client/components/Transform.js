'use strict';

export default class Transform {
  constructor(x, y, angle) {
    this.position = {
      x: x,
      y: y
    };
    this.angle = angle;
  }

  get angleInRad() {
    return this.angle * Math.PI / 180;
  }
}
