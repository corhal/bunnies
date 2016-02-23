function ControlSystem(xMin, yMin, xMax, yMax) {
  this.state = {};

  this.xMin = xMin;
  this.yMin = yMin;
  this.xMax = xMax;
  this.yMax = yMax;

  window.addEventListener('keydown', function (event) {
    this.state[event.keyCode] = true;
  }.bind(this));

  window.addEventListener('keyup', function (event) {
    this.state[event.keyCode] = false;
  }.bind(this))
}

ControlSystem.prototype.updateEntity = function (entity) {
  var control = entity.getComponent(Control);
  var transform = entity.getComponent(Transform);
  var movement = entity.getComponent(Movement);
  var rotateLeft = this.state[control.left];
  var rotateRight = this.state[control.right];
  var move = this.state[control.up];
  var dx = 0;
  var dy = 0;

  if (rotateLeft) {
    transform.angle -= movement.rotation / (Math.PI / 180);
  }

  if (rotateRight) {
    transform.angle += movement.rotation / (Math.PI / 180);
  }

  if (move) {
    dx = movement.speed * Math.sin(transform.getRadAngle());
    dy = -movement.speed * Math.cos(transform.getRadAngle());

    var checkBoundaries = transform.position.x + dx > this.xMin && transform.position.x + dx < this.xMax
        && transform.position.y + dy > this.yMin && transform.position.y + dy < this.yMax;

    if (checkBoundaries) {
      transform.position.x += dx;
      transform.position.y += dy;
    }
  }
}

ControlSystem.prototype.update = function (entities) {
  var controlEntities = entities.filter(function (entity) {
    return entity.hasComponent(Control);
  });

  controlEntities.forEach(this.updateEntity, this);
}
