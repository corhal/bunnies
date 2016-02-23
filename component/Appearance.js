function Appearance(sprite, xAncor, yAncor) {
    this.sprite = sprite;
    this.texture = PIXI.Texture.fromImage(this.sprite);
    
    this.object = new PIXI.Sprite(this.texture);    
    this.object.anchor.x = xAncor;
    this.object.anchor.y = yAncor;
    
    this.width = this.object.width;
    this.height = this.object.height;
}