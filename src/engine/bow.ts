import { Arrow } from './arrow';
import { Positioner, PositionerFunc } from './positioner';
import { Quiver } from './quiver';

export class Bow {
  private static height: 1.0;
  private currentForce: number = 0;
  private lastEventTime: number = 0;
  private arrow?: Arrow;
  private positioners: Positioner = new Positioner();

  /**
   * A Bow, to fire arrows.
   * @param name The bow's name
   * @param maxForce the maximum force that this bow can fire
   * @param tension how hard it is to pull the string back
   */
  constructor(
    readonly name: string,
    readonly maxForce: number,
    readonly tension: number,
  ) {
  }

  load(quiver: Quiver) {
    this.currentForce = 0;
    this.arrow = quiver.pick();
    this.lastEventTime = 0;
  }

  /**
   * Increase the tension in the bow.
   * 
   * Should take into account the decay since the last pull.
   */
  pullString(time: number) {
    this.currentForce = Math.min(this.currentTension(time) + (this.maxForce * this.tension), this.maxForce);
    this.lastEventTime = time;
  }

  currentTension(time: number) {
    if (this.lastEventTime) {
      const diff = (time - this.lastEventTime) / 1000;
      return (this.currentForce * (this.tension ** diff));
    }
    return this.currentForce;
  }

  addYPositioner(p: PositionerFunc) {
    this.positioners.addYPositionerFunc(p);
  }

  addZPositioner(p: PositionerFunc) {
    this.positioners.addZPositionerFunc(p);
  }

  fire(time: number): Arrow | undefined {
    const currentTension = this.currentTension(time);
    this.currentForce = 0;
    this.lastEventTime = 0;
    if (this.arrow) {
      this.arrow.fire(time, currentTension, Bow.height, this.positioners.getAngles(time));
    }
    return this.arrow;
  }
}