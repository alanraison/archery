import { Arrow } from "./arrow";
import { Coords } from "./coords";

describe('Arrow', () => {
  const t0 = 100;
  const force = 100;
  const height = 1;
  let a: Arrow;
  beforeEach(() => {
    a = new Arrow(100);
  });
  describe('when fired horizontally', () => {
    const angleY = 0;
    const angleZ = 0;
    let getPosition: (time: number) => Coords;
    beforeEach(() => {
      getPosition = a.fire(t0, force, height, angleY, angleZ);
    });
    it('should move forwards and accelerate downwards', () => {
      const dt = 0.1;
      const pos = getPosition(t0 + dt * 1000);
      expect(pos.x).toBeGreaterThan(0);
      expect(pos.y).toEqual(height - (4.9 * (dt ** 2)));
    });
    it('should travel forwards until it hits the ground', () => {
      const dt = Math.sqrt(2000000/9.8);
      const pos = getPosition(t0 + dt);
      expect(pos.y).toEqual(0);
      expect(getPosition(t0 + dt + 100).x).toEqual(pos.x)
    });
  });
  describe('when fired at an upwards angle', () => {
    let getPosition: (time: number) => Coords;
    const angleY = Math.PI / 6;
    const angleZ = 0;
    beforeEach(() => {
      getPosition = a.fire(t0, force, height, angleY, angleZ);
    });
    it('should travel further when the initial angle is upwards', () => {
      const dt = (Math.sin(angleY) * force) / 9.8; // around the top of the trajectory
      const pos = getPosition(t0 + dt);
      expect(pos.y).toBeGreaterThan(1);
      expect(getPosition(t0 + dt + 100).y).toBeLessThan(pos.y);
    });
  });
  describe('when fired at a sideways angle', () => {
    let getPosition: (time: number) => Coords;
    const angleY = Math.PI / 6;
    const angleZ = Math.PI / 36;
    beforeEach(() => {
      getPosition = a.fire(t0, force, height, angleY, angleZ);
    });
    it('should land to the side', () => {
      const dt = Math.sqrt((height + Math.sin(angleY) * force) / 4.9) * 1000;
      expect(getPosition(t0 + dt).z).toEqual(Math.sin(angleZ) * force * (dt / 1000));
    });
  })
});
