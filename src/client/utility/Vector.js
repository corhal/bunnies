export default class Vector {
  constructor(x1, y1, x2, y2) {
    this.x = x2 - x1;
    this.y = y2 - y1;
  }

  get radAngle() {
    return Math.aran(this.y / this.x);
  }

  get angle() {
    return this.radAngle / (Math.PI / 180);
  }
}
