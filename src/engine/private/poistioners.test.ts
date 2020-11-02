import { EaseIn, EaseInEaseOutCubic, EaseOutCubic, ExponentialDecay } from "./positioners";

describe('ExponentialDecay positioner', () => {
  const e = ExponentialDecay(100, 5000, 2);
  it('should be the full angle at the start', () => {
    const e0 = e(100);
    expect(e0).toEqual(2);
  });
  it('should be half the angle at the half-life', () => {
    const eHalf = e(5100);
    expect(eHalf).toEqual(1);
  });
  it('should be quarter of the angle at 2 half lives', () => {
    const eTwoHalf = e(10100);
    expect(eTwoHalf).toEqual(0.5);
  })
});
describe('EaseIn positioner', () => {
  const easeIn = EaseIn(0, 200, 2);
  it('should start at zero', () => {
    expect(easeIn(0)).toEqual(0);
  });
  it('should be the full angle at the length', () => {
    expect(easeIn(200)).toEqual(2);
  });
  it('should be the full angle after twice the length', () => {
    expect(easeIn(400)).toEqual(2);
  });
});
describe('EaseOutCubic positioner', () => {
  const easeOutCubic = EaseOutCubic(0, 100, 2);
  it('should start at full angle', () => {
    expect(easeOutCubic(0)).toEqual(2);
  });
  it('should reach zero at the full duration', () => {
    expect(easeOutCubic(100)).toEqual(0);
  });
});
describe('EaseInEaseOutCubic positioner', () => {
  const easeInEaseOutCubic = EaseInEaseOutCubic(0, 1, 4, 2);
  it('should start at zero', () => {
    expect(easeInEaseOutCubic(0)).toEqual(0);
  });
  it('should be the full angle at tMax', () => {
    expect(easeInEaseOutCubic(1)).toEqual(2);
  });
  it('should return to zero at the full duration', () => {
    expect(easeInEaseOutCubic(4)).toEqual(0);
  });
});