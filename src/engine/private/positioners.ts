import { PositionerFunc } from "../positioner";

export const ExponentialDecay = (t0: number, halfLife: number, angle: number): PositionerFunc => (time: number): number => {
  const dt = time - t0;
  return angle * 0.5 ** (dt / halfLife);
};

export const EaseIn = (t0: number, duration: number, angle: number): PositionerFunc => (time: number): number => {
  const dt = time - t0;
  const x = dt > duration ? 1 : dt / duration;
  return dt >= duration ? angle : (1 - Math.pow(2, -10 * x)) * angle;
}

export const EaseOutCubic = (t0: number, duration: number, angle: number): PositionerFunc => (time: number): number => {
  const dt = time - t0;
  const x = dt > duration ? 1 : dt / duration;
  return dt >= duration ? 0 : (Math.pow(1 - x, 3)) * angle;
}

/**
 * An Ease-in followed by Cubic Ease Out positioner.
 * 
 * @param t0 time at which the function starts
 * @param tMax time of the maximum value of the function
 * @param duration total duration of the function
 * @param angle angle to reach at tMax
 */
export const EaseInEaseOutCubic = (t0: number, tMax: number, duration: number, angle: number): PositionerFunc => {
  if (tMax > duration) {
    throw new Error('time of maximum must not be greater than the duration');
  }
  const easeIn = EaseIn(t0, tMax, angle);
  const easeOutCubic = EaseOutCubic(tMax, duration - tMax, angle);
  return (time: number): number => {
    const dt = time - t0;
    return (dt < tMax ? easeIn(time) : easeOutCubic(time));
  }
}