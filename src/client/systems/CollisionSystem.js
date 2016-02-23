function CollisionSystem() {

}

CollisionSystem.prototype.update = function (entities) {
  var colliderEntities = entities.filter(function (el) {
    return el.hasComponent(Collider);
  });

  var bunny = colliderEntities.filter(function (entity) {
    return entity.hasComponent(Hunger);
  })[0];

  var bunnyPosition = bunny.getComponent(Transform).position;
  var bunnyHealth = bunny.getComponent(Health);

  var food = colliderEntities.filter(function (entity) {
    return entity.hasComponent(Edible);
  });

  food.forEach(function collisionHandler(entity) {
    var entityPosition = entity.getComponent(Transform).position;
    var entityCollider = entity.getComponent(Collider);
    //var entityAppearance = entity.getComponent(Appearance);
    var edible = entity.getComponent(Edible);
    var hasXcollision = bunnyPosition.x >= entityPosition.x - entityCollider.width / 2 && bunnyPosition.x <= (entityPosition.x + entityCollider.width / 2);
    var hasYcollision = bunnyPosition.y >= entityPosition.y - entityCollider.width / 2 && bunnyPosition.y <= (entityPosition.y + entityCollider.height / 2);

    if (hasXcollision && hasYcollision) {
      bunnyHealth.currentHealth = Math.min(bunnyHealth.maxHealth, bunnyHealth.currentHealth + edible.hpToRestore);
      engine.removeEntity(entity);
    }
  });
}
