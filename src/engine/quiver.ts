import { Arrow } from "./arrow";

/**
 * Models a factory for a type of {@see Arrow}
 */
export class Quiver {
  constructor(readonly name: string, readonly mass: number) {

  }

  pick() {
    return new Arrow(this.mass);
  }
}