'use strict';

import Entity from '../Entity';
import Appearance from '../components/Appearance';
import Transform from '../components/Transform';
import Edible from '../components/Edible';
import Collider from '../components/Collider';

export default function Carrot() {
  const appearance = new Appearance('assets/carrot.png', { x: 0.5, y: 0.5 });
  const carrot = new Entity();

  let x = Math.round(Math.random() * (800 - appearance.width));
  let y = Math.round(Math.random() * (600 - appearance.height));

  x = x - x % 64 + 32;
  y = y - y % 64 + 32;

  carrot
    .addComponent(appearance)
    .addComponent(new Transform(x, y, 0))
    .addComponent(new Edible(10 + Math.round(Math.random() * 30)))
    .addComponent(new Collider(appearance.width, appearance.height));

  return carrot;
}
