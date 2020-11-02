import { Coords } from "./coords";
import { Angles } from "./positioner";

export class Arrow {
  constructor(readonly mass: number) {
  }

  /**
   * Fires the arrow
   * @param time the time at which the arrow is fired
   * @param force the force at which the arrow is fired
   * @param height the height of the arrow when fired
   * @param angleY the upwards angle of the arrow when fired
   * @param angleZ the sideways angle of the arrow when fired
   */
  fire(time: number, force: number, height: number, { angleY, angleZ }: Angles) {
    const fireTime = time;
    const tMax = Math.sqrt((height + Math.sin(angleY) * force) / 4.9);
    const xMax = Math.cos(angleY) * force * tMax;
    const zMax = Math.sin(angleZ) * force * tMax;

    return function getPosition(time: number): Coords {
      const dt = (time - fireTime) / 1000;
      return {
        x: dt < tMax ? Math.cos(angleY) * force * dt : xMax,
        y: dt < tMax ? height + Math.sin(angleY) * force - (4.9 * (dt**2)) : 0,
        z: dt < tMax ? Math.sin(angleZ) * force * dt : zMax,
      };
    }
  }
}
