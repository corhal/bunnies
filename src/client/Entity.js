/**
 * @class Entity
 */
export default class Entity {
  /**
   * @memberof Entity
   * @constructor
   */
  constructor() {
    /**
     * @memberof Entity
     * @instance
     * @property {number} id уникальный идентификатор сущности
     */
    this.id = Entity.id++;

    /**
     * @memberof Entity
     * @instance
     * @property {Object} components Map с компонентами
     */
    this.components = {};
  }

  getComponent(constr) {
    return this.components[constr.name];
  }

  addComponent(component) {
    this.components[component.constructor.name] = component;

    return this;
  }

  hasComponent(constr) {
    return !!this.components[constr.name];
  }

  removeComponent(component) {
    delete this.components[component.constructor.name];

    return this;
  }
}

Entity.id = 1;

