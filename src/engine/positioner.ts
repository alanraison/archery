
export class Angles {
  constructor(
    readonly angleY: number,
    readonly angleZ: number,
  ) {}
}

export type PositionerFunc = (time: number) => number;

export class Positioner {
  private yPositioners: Array<PositionerFunc> = [];
  private zPositioners: Array<PositionerFunc> = [];

  addYPositionerFunc(pf: PositionerFunc) {
    this.yPositioners.push(pf);
  }

  addZPositionerFunc(pf: PositionerFunc) {
    this.zPositioners.push(pf);
  }
  
  getAngles(time: number): Angles {
    return new Angles(
      this.yPositioners.reduce((acc: number, pf: PositionerFunc) => acc + pf(time), 0),
      this.zPositioners.reduce((acc: number, pf: PositionerFunc) => acc + pf(time), 0),
    );
  }
}
