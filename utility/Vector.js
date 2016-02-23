function Vector(x1, y1, x2, y2) {
    this.x = x2 - x1;
    this.y = y2 - y1;
    this.radAngle = Math.atan(this.y/this.x);
    this.angle = this.radAngle /(Math.PI / 180);
}