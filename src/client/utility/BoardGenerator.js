export default class BoardGenerator {
  constructor(maxX, maxY) {
    this.tiles = [];

    for (let i = 0; i < maxY; i++) {
      const xArray = [];

      for (let j = 0; j < maxX; j++) {
        xArray.push(1);
      }

      this.tiles.push(xArray);
    }
  }
}
