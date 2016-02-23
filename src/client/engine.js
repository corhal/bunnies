const engine = {
  entities: [],
  systems: [],

  addEntity(entity) {
    this.entities.push(entity);
  },

  removeEntity(entity) {
    this.entities = this.entities.filter((el) => {
      return el.id !== entity.id;
    });
  },

  registerSystem(system) {
    this.systems.push(system);
  },

  update() {
    this.systems.forEach((system) => {
      system.update(this.entities);
    });

    requestAnimationFrame(this.update.bind(this));
  },

  init() {
    this.update();
  }
};

export default engine;
