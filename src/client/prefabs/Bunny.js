function Bunny() {
    var bunny = new Entity();
    
    var appearance = new Appearance('_assets/bunny.png', 0.5, 0.5)
    var transform = new Transform(
            400, //Math.round(Math.random() * (800 - appearance.width)),
            100, //Math.round(Math.random() * (600  - appearance.height)),
            0)
    console.log("Bunny: " + transform.position.x + ":" + transform.position.y);
    bunny
        .addComponent(appearance)
        .addComponent(new Movement(3, 0.1))
        .addComponent(transform)
        .addComponent(new Control(37, 38, 39, 40))
        .addComponent(new Health(9999999))
        .addComponent(new Hunger(5))
        .addComponent(new Pathfinder(transform.position.x, transform.position.y)) // но почему?..
        .addComponent(new Collider(appearance.width, appearance.height));
    
    return bunny;
} 

