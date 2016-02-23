function RenderSystem(width, height, backgroundColor) {
  var renderer = PIXI.autoDetectRenderer(width, height, {backgroundColor : backgroundColor});
  document.body.appendChild(renderer.view);

  this.stage = new PIXI.Container();
  this.objects = {};

  var self = this;

  animate();
  function animate() {
    requestAnimationFrame(animate);
    renderer.render(self.stage);
  }
}

RenderSystem.prototype.removeEntitiesByIds = function (ids) {
  ids.forEach(function (id) {
    this.stage.removeChild(this.objects[id]);
    delete this.objects[id];
  }, this);
}

RenderSystem.prototype.addEntity = function (entity) {
  var appearance = entity.getComponent(Appearance);
  var object = appearance.object;

  this.objects[entity.id] = object;

  this.stage.addChild(object);
}

RenderSystem.prototype.updateEntity = function (entity) {
  var transform = entity.getComponent(Transform);
  var object = this.objects[entity.id];

  object.position.x = transform.position.x;
  object.position.y = transform.position.y;
  object.rotation = transform.angle * Math.PI / 180;
}

/**
 * @TODO:
 * Read it!
 * Array.prototype.filter | more or less
 * Array.prototype.some | eh
 * Array.prototype.map | what
 * Array.prototype.reduce | what
 * Array.prototype.forEach + context (2nd argument) | yeah
 * Function.prototype.bind | what
 * Object.keys | eh
 */
RenderSystem.prototype.update = function (entities) {
  var renderEntities = entities.filter(function (el) {
    return el.hasComponent(Appearance);
  });
  var oldIds = Object.keys(this.objects).map(function (id) {
    return parseInt(id);
  });
  var removeIds = oldIds.filter(function (id) {
    return !renderEntities.some(function (el) {
      return el.id === id;
    });
  });
  var addEntities = renderEntities.filter(function (el) {
    return oldIds.indexOf(el.id) === -1;
  });

  //addEntities.forEach(this.addEntity, this);
  addEntities.forEach(this.addEntity, this);

  this.removeEntitiesByIds(removeIds);

  renderEntities.forEach(this.updateEntity, this);
}
