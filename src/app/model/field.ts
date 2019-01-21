export class Field {
  constructor(public x: number, public  y: number) {
  }

  add(field: Field) {
    return new Field(this.x + field.x, this.y + field.y);
  }

  isAddable(field: Field) {
    return this.isInRange(this.x + field.x) && this.isInRange(this.y += field.y);
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
