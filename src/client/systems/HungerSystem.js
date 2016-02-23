'use strict';

import Control from '../components/Control';
import Hunger from '../components/Hunger';
import Health from '../components/Health';

export default class HungerSystem {
  updateEntity(entity) {
    const health = entity.getComponent(Health);
    const hunger = entity.getComponent(Hunger);
    const now = Date.now();

    if (hunger.lastDecreaseTime === 0) {
      hunger.lastDecreaseTime = now;
      health.currentHealth -= hunger.hpLossPerSec;
    } else if (now - hunger.lastDecreaseTime >= 1000) {
      hunger.lastDecreaseTime += 1000;
      health.currentHealth -= hunger.hpLossPerSec;
    }

    if (health.currentHealth <= 0) {
      entity.removeComponent(hunger);
      entity.removeComponent(entity.getComponent(Control));
    }
  }

  update(entities) {
    const hungerEntities = entities.filter((entity) => {
      return entity.hasComponent(Hunger);
    });

    hungerEntities.forEach(this.updateEntity, this);
  }
}
