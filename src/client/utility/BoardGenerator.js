function BoardGenerator(maxX, maxY) {
  this.tiles = [];
  for (var i = 0; i < maxY; i++) {
    var xArray = [];
    for (var j = 0; j < maxX; j++) {
      xArray.push(1);
    }
    this.tiles.push(xArray);
  }
}
