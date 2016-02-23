function PathfindingSystem(boardSystem) {
    this.boardSystem = boardSystem;
    this.destinationTile = this.boardSystem.getTileByAbsCoordinates(4, 7).getComponent(Tile);
    //console.log(boardSystem);
    //console.log(this.boardSystem);
    this.board = boardSystem.getEntities();
    this.matrix = [];
    for (var i = 0; i < this.board.length; i++) {
        var xArray = this.board[i];
        var matrixXarray = [];
        for (var j = 0; j < xArray.length; j++) {
            if(xArray[j].getComponent(Tile).walkable) {
                matrixXarray.push(0);
            }           
            else {
                matrixXarray.push(1);
            }
        }   
        this.matrix.push(matrixXarray);     
    }
    //console.log(this.matrix);
    
    window.addEventListener('mousedown', function (event) { 
        console.log(this.boardSystem.getTileByAbsCoordinates(event.clientX, event.clientY));  
        this.destinationTile = this.boardSystem.getTileByAbsCoordinates(event.clientX, event.clientY).getComponent(Tile);
        console.log(this.destinationTile);             
    }.bind(this));    
}

PathfindingSystem.prototype.update = function (entities) {
    var pathfinderEntities = entities.filter(function (el) {
        return el.hasComponent(Pathfinder);
    });
    
    /*var entitiestoUpdate = pathfinderEntities.filter(function(pathfinderEntity) {
        return pathfinderEntity.destinationPosition != pathfinderEntity.currentPosition;
    });*/
    
    pathfinderEntities.forEach(this.updateEntity, this);
} 

PathfindingSystem.prototype.updateEntity = function (entity) { // почему-то при клике на тайл == startingPosition возвращается currentPosition  
    var pathfinder = entity.getComponent(Pathfinder);
    var transform = entity.getComponent(Transform);
    
    if (pathfinder.currentPosition.x === -1) {
        //console.log("Abs: " + pathfinder.startingPosition.x + ":" + pathfinder.startingPosition.y);
        pathfinder.startingPosition = this.boardSystem.getTileByAbsCoordinates(pathfinder.startingPosition.x, pathfinder.startingPosition.y).getComponent(Tile).position;
        //console.log(pathfinder.startingPosition.x + ":" + pathfinder.startingPosition.y);
        //console.log("old:" + pathfinder.currentPosition.x + ":" + pathfinder.currentPosition.y);
        pathfinder.currentPosition.x = pathfinder.startingPosition.x;
        pathfinder.currentPosition.y = pathfinder.startingPosition.y;
        //console.log("new:" + pathfinder.currentPosition.x + ":" + pathfinder.currentPosition.y);
        var currentTile = this.board[pathfinder.currentPosition.y][pathfinder.currentPosition.x]; // why?
        var tileTransform = currentTile.getComponent(Transform);  
        var tileTile = currentTile.getComponent(Tile); 
        //console.log("CurrentTile: " + tileTile.position.x + ":" + tileTile.position.y);
        //console.log("CurrentTileTransform: " + tileTransform.position.x + ":" + tileTransform.position.y);         
        transform.position.x = tileTransform.position.x;
        transform.position.y = tileTransform.position.y;
    }
    
    pathfinder.destinationPosition = this.destinationTile.position;
    
    pathfinder.destinationPosition.x = this.destinationTile.position.x;
    pathfinder.destinationPosition.y = this.destinationTile.position.y; // For test commit
    
    //console.log(pathfinder.destinationPosition);
    
    if (pathfinder.currentPosition.x != this.destinationTile.position.x || pathfinder.currentPosition.y != this.destinationTile.position.y) {
        var grid = new PF.Grid(this.matrix);  
        var finder = new PF.AStarFinder();    
        var path = finder.findPath(pathfinder.currentPosition.x, pathfinder.currentPosition.y, pathfinder.destinationPosition.x, pathfinder.destinationPosition.y, grid);
        //console.log(path);
    
        if (path.length > 1) {
            console.log(pathfinder.startingPosition.x + ":" + pathfinder.startingPosition.y);
            pathfinder.currentPosition.x = path[1][0];
            pathfinder.currentPosition.y = path[1][1];
            currentTile = this.board[pathfinder.currentPosition.y][pathfinder.currentPosition.x]; // whyyyy?
            tileTransform = currentTile.getComponent(Transform);
            tileTile = currentTile.getComponent(Tile); 
            //console.log("CurrentTile: " + tileTile.position.x + ":" + tileTile.position.y);
            //console.log("CurrentTileTransform: " + tileTransform.position.x + ":" + tileTransform.position.y);
            transform.position.x = tileTransform.position.x;
            transform.position.y = tileTransform.position.y;
        }
    }
}

