import { Arrow } from "./arrow";
import { Bow } from "./bow";
import { Quiver } from "./quiver";

jest.mock('./arrow');

describe('simple bow', () => {
  let b: Bow;
  const t0 = 100;
  beforeEach(() => {
    b = new Bow('test', 100, 1.0);
  });
  it('should increase the tension when the string is pulled', () => {
    b.pullString(t0);
    expect(b.currentTension(t0)).toEqual(100);
  });
  it('should not decrease the tension over time', () => {
    b.pullString(t0);
    expect(b.currentTension(t0 + 100)).toEqual(100);
  });
  it('should create an arrow when loaded and fired', () => {
    b.load(new Quiver('test', 50));
    b.pullString(t0);
    expect(b.fire(t0 + 100)).toBeInstanceOf(Arrow);
    expect(b.currentTension(t0 + 100)).toEqual(0);
  });
  it('resets the tension when fired with no arrow', () => {
    b.pullString(t0);
    expect(b.fire(t0 + 100)).toBeUndefined();
    expect(b.currentTension(t0 + 100)).toEqual(0);
  })
});
describe('bow with 0.95 tension', () => {
  let b: Bow;
  beforeEach(() => {
    b = new Bow('test', 100, 0.95);
  });
  it('should increase the tension when the string is pulled', () => {
    const time = 100;
    b.pullString(time);
    expect(b.currentTension(time)).toEqual(95);
  });
  it('should decrease the tension over time', () => {
    const time = 100;
    b.pullString(time);
    expect(b.currentTension(time + 100)).toEqual(95 * (0.95 ** 0.1));
  });
  
});