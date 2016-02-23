'use strict';

/**
 * Компонент дает сущености возможность быть съеденной.
 * При столкновению с entity, которая содержит компонент
 * Edible entity исчезает, а герой восстанавливает часть
 * здоровья.
 *
 * @class Edible
 */
export default class Edible {
  /**
   * @param {number} hpToRestore кол-во здоровья, которое восстанавливает герой съедая объект
   * @constructor
   */
  constructor(hpToRestore) {
    /**
     * @memberof Edible
     * @instance
     * @property {number} hpToRestore сколько hp восстанавливает данная сущность
     */
    this.hpToRestore = hpToRestore;
  }
}
