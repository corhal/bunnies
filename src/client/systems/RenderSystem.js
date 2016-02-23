'use strict';

import Appearance from '../components/Appearance';
import Transform from '../components/Transform';

export default class RenderSystem {
  constructor(width, height, backgroundColor) {
    this.renderer = PIXI.autoDetectRenderer(
      width,
      height,
      { backgroundColor: backgroundColor }
    );
    document.body.appendChild(this.renderer.view);

    this.stage = new PIXI.Container();
    this.objects = {};

    this.animate();
  }

  animate() {
    requestAnimationFrame(this.animate.bind(this));
    this.renderer.render(this.stage);
  }

  removeEntitiesByIds(ids) {
    ids.forEach((id) => {
      this.stage.removeChild(this.objects[id]);
      delete this.objects[id];
    });
  }

  addEntity(entity) {
    const appearance = entity.getComponent(Appearance);
    const object = appearance.object;

    this.objects[entity.id] = object;

    this.stage.addChild(object);
  }

  updateEntity(entity) {
    const transform = entity.getComponent(Transform);
    const object = this.objects[entity.id];

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
  update(entities) {
    const renderEntities = entities.filter((el) => {
      return el.hasComponent(Appearance);
    });
    const oldIds = Object.keys(this.objects).map((id) => {
      return parseInt(id, 10);
    });
    const removeIds = oldIds.filter((id) => {
      return !renderEntities.some((el) => {
        return el.id === id;
      });
    });
    const addEntities = renderEntities.filter((el) => {
      return oldIds.indexOf(el.id) === -1;
    });

    addEntities.forEach(this.addEntity, this);

    this.removeEntitiesByIds(removeIds);

    renderEntities.forEach(this.updateEntity, this);
  }
}
