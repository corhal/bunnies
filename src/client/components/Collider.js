'use strict';

/**
 * Компонент, который содержит физические размеры объекта,
 * которые используются при определегии столкновений.
 * @class Collider
 */
export default class Collider {
  /**
   * @param {number} width  ширина объекта
   * @param {number} height высота объекта
   * @constructor
   */
  constructor(width, height) {
    this.width = width;
    this.height = height;
  }
}
