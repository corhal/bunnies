'use strict';

import engine from '../engine';
import Collider from '../components/Collider';
import Transform from '../components/Transform';
import Hunger from '../components/Hunger';
import Edible from '../components/Edible';
import Health from '../components/Health';

export default class CollisionSystem {
  update(entities) {
    const colliderEntities = entities.filter((el) => {
      return el.hasComponent(Collider);
    });

    const bunny = colliderEntities.filter((entity) => {
      return entity.hasComponent(Hunger);
    })[0];

    const bunnyPosition = bunny.getComponent(Transform).position;
    const bunnyHealth = bunny.getComponent(Health);

    const food = colliderEntities.filter((entity) => {
      return entity.hasComponent(Edible);
    });

    food.forEach(function collisionHandler(entity) {
      const entityPosition = entity.getComponent(Transform).position;
      const entityCollider = entity.getComponent(Collider);
      // var entityAppearance = entity.getComponent(Appearance);
      const edible = entity.getComponent(Edible);
      const xCollision = bunnyPosition.x >= entityPosition.x - entityCollider.width / 2 && bunnyPosition.x <= (entityPosition.x + entityCollider.width / 2);
      const yCollision = bunnyPosition.y >= entityPosition.y - entityCollider.width / 2 && bunnyPosition.y <= (entityPosition.y + entityCollider.height / 2);

      if (xCollision && yCollision) {
        bunnyHealth.currentHealth = Math.min(bunnyHealth.maxHealth, bunnyHealth.currentHealth + edible.hpToRestore);
        engine.removeEntity(entity);
      }
    });
  }
}
