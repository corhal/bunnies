var engine = {
    entities: [],
    systems: [],
    
    addEntity: function (entity) {
        this.entities.push(entity);
    },
    
    removeEntity: function (entity) {
        this.entities = this.entities.filter(function (el) {
            return el.id !== entity.id;
        });
    },
    
    registerSystem: function (system) {
        this.systems.push(system);
    },
    
    update: function () {
        this.systems.forEach(function (system) {
            system.update(this.entities);
        }, this);
        
        requestAnimationFrame(this.update.bind(this));
    },
    
    init: function () {
        this.update();
    }
};