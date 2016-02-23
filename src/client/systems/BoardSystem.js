function BoardSystem(maxX, maxY) {
  this.tiles = [];

  var self = this;

  for (var i = 0; i < maxY; i++) {
    var xArray = [];
    for (var j = 0; j < maxX; j++) {
      var newTile = new TilePrefab(j, i);
      console.log("NewTile: " + newTile.getComponent(Tile).position.x + ":" + newTile.getComponent(Tile).position.y);
      console.log("NewTileTransform: " + newTile.getComponent(Transform).position.x + ":" + newTile.getComponent(Transform).position.y);
      xArray.push(newTile);
    }
    this.tiles.push(xArray);
  }
  //console.log(this.tiles);
}

BoardSystem.prototype.getEntities = function() {
  return this.tiles;
}

BoardSystem.prototype.update = function (entities) {

}

BoardSystem.prototype.getTileByAbsCoordinates = function (x, y) {
  var tilesArray = this.tiles;
  var tileToReturn;
  tilesArray.forEach(function (tileRow) {
    var tileWeNeed = tileRow.filter(function(tile){
      var tileTransformPosition = tile.getComponent(Transform).position;
      var tileAppearance = tile.getComponent(Appearance);
      var hasXcollision = x >= tileTransformPosition.x - tileAppearance.width / 2 && x <= (tileTransformPosition.x + tileAppearance.width / 2);
      var hasYcollision = y >= tileTransformPosition.y - tileAppearance.height / 2 && y <= (tileTransformPosition.y + tileAppearance.height / 2);
      var check = hasXcollision && hasYcollision;

      return check;
    });
    var anotherCheck = tileWeNeed.length > 0;

    console.log(tileWeNeed);

    if (anotherCheck) {
      tileToReturn = tileWeNeed[0];
    }
  });

  console.log(tileToReturn);

  return tileToReturn;
}

