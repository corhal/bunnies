'use strict';

import Entity from '../Entity';
import Appearance from '../components/Appearance';
import Transform from '../components/Transform';
import Edible from '../components/Edible';
import Collider from '../components/Collider';
import Tile from '../components/Tile';
import engine from '../engine';

export default function Carrot() {
  const appearance = new Appearance('assets/carrot.png', { x: 0.5, y: 0.5 });
  const carrot = new Entity();

  const availableTiles = engine.entities.filter((entity) => {
    const tile = entity.getComponent(Tile);
    return !!tile && tile.walkable;
  });
  const targetTilePosition = availableTiles[Math.round((availableTiles.length - 1) * Math.random())].getComponent(Transform).position;

  const x = targetTilePosition.x;
  const y = targetTilePosition.y;

  carrot
    .addComponent(appearance)
    .addComponent(new Transform(x, y, 0))
    .addComponent(new Edible(10 + Math.round(Math.random() * 30)))
    .addComponent(new Collider(appearance.width, appearance.height));

  return carrot;
}
