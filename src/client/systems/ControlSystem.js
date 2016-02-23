'use strict';

import Control from '../components/Control';
import Transform from '../components/Transform';
import Movement from '../components/Movement';

export default class ControlSystem {
  constructor(xMin, yMin, xMax, yMax) {
    this.state = {};
    this.xMin = xMin;
    this.yMin = yMin;
    this.xMax = xMax;
    this.yMax = yMax;

    window.addEventListener('keydown', (event) => {
      this.state[event.keyCode] = true;
    });

    window.addEventListener('keyup', (event) => {
      this.state[event.keyCode] = false;
    });
  }

  updateEntity(entity) {
    const control = entity.getComponent(Control);
    const transform = entity.getComponent(Transform);
    const movement = entity.getComponent(Movement);
    const rotateLeft = this.state[control.left];
    const rotateRight = this.state[control.right];
    const move = this.state[control.up];
    let dx = 0;
    let dy = 0;

    if (rotateLeft) {
      transform.angle -= movement.rotation / (Math.PI / 180);
    }

    if (rotateRight) {
      transform.angle += movement.rotation / (Math.PI / 180);
    }

    if (move) {
      dx = movement.speed * Math.sin(transform.angleInRad);
      dy = -movement.speed * Math.cos(transform.angleInRad);

      const checkBoundaries = transform.position.x + dx > this.xMin && transform.position.x + dx < this.xMax
          && transform.position.y + dy > this.yMin && transform.position.y + dy < this.yMax;

      if (checkBoundaries) {
        transform.position.x += dx;
        transform.position.y += dy;
      }
    }
  }

  update(entities) {
    const controlEntities = entities.filter((entity) => {
      return entity.hasComponent(Control);
    });

    controlEntities.forEach(this.updateEntity, this);
  }
}
