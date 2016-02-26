'use strict';

import Entity from '../Entity';
import Appearance from '../components/Appearance';
import Transform from '../components/Transform';
import Movement from '../components/Movement';
import Control from '../components/Control';
import Health from '../components/Health';
import Hunger from '../components/Hunger';
import Pathfinder from '../components/Pathfinder';
import Collider from '../components/Collider';

export default function Bunny() {
  const appearance = new Appearance('assets/bunny.png', { x: 0.5, y: 0.5 });
  const transform = new Transform(
    400, // Math.round(Math.random() * (800 - appearance.width)),
    100, // Math.round(Math.random() * (600  - appearance.height)),
    0
    );
  const bunny = new Entity();

  bunny
    .addComponent(appearance)
    .addComponent(new Movement(3, 0, 0.1))
    .addComponent(transform)
    .addComponent(new Control(37, 38, 39, 40))
    .addComponent(new Health(9999999))
    .addComponent(new Hunger(5))
    .addComponent(new Pathfinder(transform.position.x, transform.position.y)) // но почему?..
    .addComponent(new Collider(appearance.width, appearance.height));

  return bunny;
}
