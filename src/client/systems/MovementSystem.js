'use strict';

import Transform from '../components/Transform';
import Movement from '../components/Movement';

/**
 * @TODO: Эта система будет двигать и вращать объекты, которые нужно двигать и вращать
 * @class MovementSystem
 */

export default class MovementSystem {
  constructor(xMin, yMin, xMax, yMax) {
    this.xMin = xMin;
    this.yMin = yMin;
    this.xMax = xMax;
    this.yMax = yMax;
  }

  update(entities) {
    const movableEntities = entities.filter((entity) => {
      return entity.hasComponent(Movement) && (entity.getComponent(Movement).shouldMove || entity.getComponent(Movement).shouldRotate);
    });

    movableEntities.forEach(this.updateEntity, this);
  }

  updateEntity(entity) {
    const movement = entity.getComponent(Movement);
    const transform = entity.getComponent(Transform);

    if (movement.shouldRotate) {
      this.rotate(transform, movement);
    }

    if (movement.shouldMove) {
      this.move(transform, movement);
    }
  }

  rotate(transform, movement) {
    transform.angle += movement.rotation / (Math.PI / 180);
  }

  move(transform, movement) {
    let dx = 0;
    let dy = 0;

    movement.angle = transform.angleInRad;
    dx = movement.speed * Math.sin(transform.angleInRad);
    dy = -movement.speed * Math.cos(transform.angleInRad);

    const checkBoundaries = transform.position.x + dx > this.xMin && transform.position.x + dx < this.xMax
      && transform.position.y + dy > this.yMin && transform.position.y + dy < this.yMax;
    if (checkBoundaries) {
      transform.position.x += dx;
      transform.position.y += dy;
    }
  }

  moveInPointDirection(x, y, entity) { // Пока не работает
    const movement = entity.getComponent(Movement);
    const transform = entity.getComponent(Transform);

    movement.dx = transform.position.x - x;
    movement.dy = transform.position.y - y;
  }
}

