'use strict';

/**
 * Компонент наделяет сущность здоровьем (сущность может потерять/восстановить здоровье).
 * Сущность не может получить здоровье, больше максимального кол-ва.
 * Когда здоровье сущности = 0, сущность считается сломаной/мертвой.
 *
 * @class Health
 */
export default class Health {
  /**
   * @param {number} maxHealth максимальное здоровье
   * @param {number} [health=maxHealth] текущее значение здоровья
   * @constructor
   */
  constructor(maxHealth, health) {
    /**
     * @memberof Health
     * @instance
     * @property {number} maxHealth максимальное кол-во здоровья
     */
    this.maxHealth = maxHealth;

    /**
     * @memberof Health
     * @instance
     * @private
     * @property {number} value текущий показатель здоровья
     */
    this.value = health || maxHealth;
  }

  /**
   * @memberof Health
   * @instance
   * @private
   * @property {number} currentHealth текущий показатель здоровья
   */
  get currentHealth() {
    return this.health;
  }

  set currentHealth(value) {
    this.health = Math.min(this.maxHealth, value);
  }
}
