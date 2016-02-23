'use strict';

/**
 * Компонент который надаеляет сущность голодом — hp сущности
 * уменьшается на указанную величину каждую секунду.
 *
 * @class
 */
export default class Hunger {
  /**
   * @param {hpLossPerSec}
   * @constructor
   */
  constructor(hpLossPerSec) {
    /**
     * @memberof Hunger
     * @instance
     * @property {number} hpLossPerSec сколько hp теряется куждую секунду
     */
    this.hpLossPerSec = hpLossPerSec;

    /**
     * @memberof Hunger
     * @instance
     * @property {number} lastDecreaseTime вермя последнего уменьшения hp
     */
    this.lastDecreaseTime = 0;
  }
}
