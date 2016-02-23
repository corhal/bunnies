function Entity() {
   this.id = Entity.id++;
   this.components = {};
}

Entity.id = 1;

Entity.prototype.getComponent = function (constr) {
    return this.components[constr.name];
}

Entity.prototype.addComponent = function (component) {
    this.components[component.constructor.name] = component;
    
    return this;
}

Entity.prototype.hasComponent = function (constr) {
    return !!this.components[constr.name];
}

Entity.prototype.removeComponent = function (component) {
    delete this.components[component.constructor.name];
    
    return this;
}