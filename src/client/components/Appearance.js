'use strict';

/**
 * @typedef {Object} Point
 * @property {number} x
 * @property {number} y
 */

/**
 * Описывает внешний вид компонента.
 * @class Appearance
 */
export default class Appearance {
  /**
   * @memberof Appearance
   * @param {string} sprite путь к спрайту или картинке, в которой содержится отображение объкта
   * @param {Point} центр трансформации объекта
   * @constructor
   */
  constructor(sprite, anchor) {
    /**
     * @memberof Appearance
     * @instance
     * @property {string} sprite
     */
    this.sprite = sprite;

    /**
     * @memberof Appearance
     * @instance
     * @private
     * @property {PIXI.Texture} texture
     */
    this.texture = PIXI.Texture.fromImage(this.sprite);

    /**
     * @memberof Appearance
     * @instance
     * @protected
     * @property {PIXI.Sprite} object
     */
    this.object = new PIXI.Sprite(this.texture);
    this.object.anchor.x = anchor.x;
    this.object.anchor.y = anchor.y;

    /**
     * @memberof Appearance
     * @instance
     * @protected
     * @property {number} number
     */
    this.width = this.object.width;

    /**
     * @memberof Appearance
     * @instance
     * @protected
     * @property {number} number
     */
    this.height = this.object.height;
  }
}
