'use strict';

import Control from '../components/Control';
import Movement from '../components/Movement';

export default class ControlSystem {
  constructor() {
    this.state = {};

    window.addEventListener('keydown', (event) => {
      this.state[event.keyCode] = true;
    });

    window.addEventListener('keyup', (event) => {
      this.state[event.keyCode] = false;
    });
  }

  updateEntity(entity) {
    const control = entity.getComponent(Control);
    const movement = entity.getComponent(Movement);
    const rotateLeft = this.state[control.left];
    const rotateRight = this.state[control.right];
    const move = this.state[control.up];

    if (rotateLeft || rotateRight) {
      if (rotateLeft) {
        movement.rotation = -movement.absRotation;
      }
      if (rotateRight) {
        movement.rotation = movement.absRotation;
      }
      movement.shouldRotate = true;
    } else {
      movement.shouldRotate = false;
    }

    if (move) {
      movement.shouldMove = true;
    } else {
      movement.shouldMove = false;
    }
  }

  update(entities) {
    const controlEntities = entities.filter((entity) => {
      return entity.hasComponent(Control);
    });

    controlEntities.forEach(this.updateEntity, this);
  }
}
