function TilePrefab(x, y, walkable) {
    var tile = new Entity();
    
    var coinToss = Math.random();
    if (coinToss > -1) {
        walkable = true;
    }
    else {
        walkable = false
    }
    
    var appearance;
    
    if (walkable) {
        appearance = new Appearance('_assets/tileWalkable.png', 0.5, 0.5)
    }
    else {
        appearance = new Appearance('_assets/tileUnwalkable.png', 0.5, 0.5)
    }
    
    tile
        .addComponent(appearance)        
        .addComponent(new Transform(
            x * 64 + appearance.width / 2, // dont ask
            y * 64 + appearance.height / 2,
            0
        ))
        .addComponent(new Tile(x, y, walkable));
    return tile;
} 