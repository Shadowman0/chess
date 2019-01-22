import {Field} from './field';

export enum ActionType {
  MOVEMENT,
  CAPTURE,
  BOTH,
}

export enum RangeType {
  ONCE = 1,
  TWICE = 2,
  INFINIT = 7,
}

const bishopDirections = [
  Field.top().add(Field.left()),
  Field.top().add(Field.right()),
  Field.down().add(Field.left()),
  Field.down().add(Field.right())];
const rookDirections = [
  Field.top(), Field.left(),
  Field.down(), Field.right()];
const knightDirections = [
  [-1, 2],
  [-1, -2],
  [1, -2],
  [1, 2],
  [-2, 1],
  [-2, -1],
  [2, -1],
  [2, 1]].map(x => Field.fromArray(x));

export class PieceAction {
  constructor(public actionType: ActionType, public range: RangeType, public directions: Field[]) {
  }

  static aPawnStartingMoveActions(direction: Field) {
    return new PieceAction(ActionType.MOVEMENT, RangeType.TWICE, [direction]);
  }

  static aPawnCaptureActions(direction: Field) {
    return new PieceAction(ActionType.CAPTURE, RangeType.ONCE, [direction.add(Field.top()), direction.add(Field.down())]);
  }

  static aKingActions() {
    return new PieceAction(ActionType.BOTH, RangeType.ONCE, [...bishopDirections, ...rookDirections]);
  }

  static aQueenActions() {
    return new PieceAction(ActionType.BOTH, RangeType.INFINIT, [...bishopDirections, ...rookDirections]);
  }

  static aRookActions() {
    return new PieceAction(ActionType.BOTH, RangeType.INFINIT, rookDirections);
  }

  static aBishopActions() {
    return new PieceAction(ActionType.BOTH, RangeType.INFINIT, bishopDirections);
  }

  static aKnightsActions() {
    return new PieceAction(ActionType.BOTH, RangeType.ONCE, knightDirections);
  }

  inDirectionsReachableFields(origin: Field): Field[][] {
    return this.directions.map(
      dir => {
        return Array.from({length: this.range})
          .map((v, k) => {
            return origin.add(dir.times(k + 1));
          })
          .filter(field => field.isOnBoard());
      });
  }


}

