function HungerSystem() {
    
}

HungerSystem.prototype.updateEntity = function (entity) {
    var health = entity.getComponent(Health);
    var hunger = entity.getComponent(Hunger);
    var now = Date.now();
    
    //console.log(health.currentHealth);
    
    if (hunger.lastDecreaseTime === 0) {
        hunger.lastDecreaseTime = now;
        health.currentHealth -= hunger.hpLossPerSec;
    } else if (now - hunger.lastDecreaseTime >= 1000) {
        hunger.lastDecreaseTime += 1000;
        health.currentHealth -= hunger.hpLossPerSec;
    }
    
    if (health.currentHealth <= 0) {
        //console.log("Died");
        entity.removeComponent(hunger);
        entity.removeComponent(entity.getComponent(Control));
    }
}

HungerSystem.prototype.update = function (entities) {
    var hungerEntities = entities.filter(function (entity) {
        return entity.hasComponent(Hunger);
    });
    
    hungerEntities.forEach(this.updateEntity, this);
}