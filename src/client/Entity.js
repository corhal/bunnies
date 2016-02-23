function Entity() {
  this.id = Entity.id++;
  this.components = {};
}

Entity.id = 1;

Entity.prototype.getComponent = function getComponent(constr) {
  return this.components[constr.name];
};

Entity.prototype.addComponent = function addComponent(component) {
  this.components[component.constructor.name] = component;

  return this;
};

Entity.prototype.hasComponent = function hasComponent(constr) {
  return !!this.components[constr.name];
};

Entity.prototype.removeComponent = function removeComponent(component) {
  delete this.components[component.constructor.name];

  return this;
};
