'use strict';

import Transform from '../components/Transform';
import Movement from '../components/Movement';
import Vector from '../utility/Vector';

export default class MovementSystem {

  update(entities) {
    const movableEntities = entities.filter((entity) => {
      return entity.hasComponent(Movement) && entity.getComponent(Movement).shouldMove;
    });

    movableEntities.forEach(this.updateEntity, this);
  }

  updateEntity(entity) {
    const movement = entity.getComponent(Movement);
    const transform = entity.getComponent(Transform);

    let dx = 0;
    let dy = 0;

    dx = movement.dx;
    dy = -movement.dy;

    /*const checkBoundaries = transform.position.x + dx > this.xMin && transform.position.x + dx < this.xMax
      && transform.position.y + dy > this.yMin && transform.position.y + dy < this.yMax;*/

    //if (checkBoundaries) {
      transform.position.x += dx;
      transform.position.y += dy;
  }

  moveToPointDirection(x, y, entity) {
    const movement = entity.getComponent(Movement);
    const transform = entity.getComponent(Transform);

    movement.dx = transform.position.x - x;
    movement.dy = transform.position.y - y;
  }
}

