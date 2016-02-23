'use strict';

import Entity from '../Entity';
import Appearance from '../components/Appearance';
import Transform from '../components/Transform';
import Tile from '../components/Tile';

export default function TilePrefab(x, y) {
  const coinToss = Math.random();
  const walkable = coinToss > -1;
  const sprite = (walkable) ? 'assets/tileWalkable.png' : 'assets/tileUnwalkable.png';
  const appearance = new Appearance(sprite, { x: 0.5, y: 0.5 });
  const tile = new Entity();

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
