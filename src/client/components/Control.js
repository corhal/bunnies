'use strict';

/**
 * Компонент, который определяет на нажатие каких
 * клавиш реагирует entity.
 *
 * @class Control
 */
export default class Control {
  /**
   * @param {number} left   код клавиши, по которой осуществляется поворот влево
   * @param {number} up     код клавиши, по которой осуществляется движение перед
   * @param {number} right  код клавиши, по которой осуществляется поворот вправо
   * @param {number} down   код клавиши, по которой сейчас ничего не происходит
   * @constructor
   */
  constructor(left, up, right, down) {
    this.left = left;
    this.up = up;
    this.right = right;
    this.down = down;
  }
}
