function Carrot() {
    var carrot = new Entity();
    
    var appearance = new Appearance('_assets/carrot.png', 0.5, 0.5)

    carrot
        .addComponent(appearance)
        .addComponent(new Transform(
            Math.round(Math.random() * (800 - appearance.width)),
            Math.round(Math.random() * (600  - appearance.height)),
            0
        ))
        .addComponent(new Edible(10 + Math.round(Math.random() * 30)))
        .addComponent(new Collider(appearance.width, appearance.height));
    
    return carrot;
} 