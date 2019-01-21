export class Field {
  constructor(public x: number, public  y: number) {
  }

  static fromArray(a: number[]): Field {
    return new Field(a[0], a[1]);
  }

  static top(): Field {
    return new Field(0, -1);
  }

  static down(): Field {
    return new Field(0, 1);
  }

  static left(): Field {
    return new Field(-1, 0);
  }

  static right(): Field {
    return new Field(1, 0);
  }

  add(field: Field) {
    return new Field(this.x + field.x, this.y + field.y);
  }

  times(scalar: number) {
    return new Field(this.x * scalar, this.y * scalar);
  }

  isAddable(field: Field) {
    return this.isInRange(this.x + field.x) && this.isInRange(this.y += field.y);
  }

  isOnBoard() {
    return this.isInRange(this.x) && this.isInRange(this.y);
  }

  private isInRange(toCheck: number) {
    const low = 0;
    const high = 7;
    return toCheck >= low && toCheck <= high;
  }

  equals(other: Field) {
    return this.x === other.x && this.y === other.y;
  }

}
