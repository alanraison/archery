import { Angles, Positioner, PositionerFunc } from "./positioner"

describe('basic PositionerFunc', () => {
  const addToAngle: PositionerFunc = (_time: number) => 1;
  it('should increase the angles', () => {
    expect(addToAngle(0)).toEqual(1);
  });
});
describe('empty Positioner', () => {
  const positioner = new Positioner();
  it('should not alter the angles', () => {
    expect(positioner.getAngles(0)).toEqual({ angleY: 0, angleZ: 0 });
  });
});
describe('single Positioner', () => {
  const positioner = new Positioner();
  positioner.addYPositionerFunc((_time: number) => 2);
  it('should apply the positioner function', () => {
    expect(positioner.getAngles(0)).toEqual({ angleY: 2, angleZ: 0 });
  });
});
describe('compound Positioner in one axis', () => {
  const positioner = new Positioner();
  positioner.addZPositionerFunc(_time => 2);
  positioner.addZPositionerFunc(_time => -1);
  it('should apply all positioner functions', () => {
    expect(positioner.getAngles(0)).toEqual({ angleY: 0, angleZ: 1 });
  });
});
describe('compound Positioner in both axes', () => {
  const positioner = new Positioner();
  positioner.addYPositionerFunc(_time => 1);
  positioner.addZPositionerFunc(_time => 2);
  positioner.addYPositionerFunc(_time => 1);
  positioner.addZPositionerFunc(_time => -1);
  it('should apply all positioner functions', () => {
    expect(positioner.getAngles(0)).toEqual({ angleY: 2, angleZ: 1 });
  })
})