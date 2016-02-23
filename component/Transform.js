function Transform(x, y, angle) {
    this.position = {
        x: x,
        y: y  
    };
    this.angle = angle;
    this.getRadAngle = function() {
        return this.angle * Math.PI / 180;
    }
}