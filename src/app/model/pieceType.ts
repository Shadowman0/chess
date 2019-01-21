import {Player} from './player';
import {Field} from './field';
import {Board} from './board';

type CanReachFunction = (originField: Field, targetField: Field) => boolean;


export class PieceType {

  constructor(public name: string, public image: string, private reachFunction?: CanReachFunction) {
  }


  static aKing(player: Player) {
    return new PieceType('king', 'pieces/king_' + this.pieceNameSuffix(player) + '.svg', this.kingReachFunction()
    );
  }

  static aQueen(player: Player) {
    return new PieceType('queen', 'pieces/queen_' + this.pieceNameSuffix(player) + '.svg', this.queenReachFunction());
  }

  static aRook(player: Player) {
    return new PieceType('rook', 'pieces/rook_' + this.pieceNameSuffix(player) + '.svg', this.rookReachFunction());
  }

  static aBishop(player: Player) {
    return new PieceType('bishop', 'pieces/bishop_' + this.pieceNameSuffix(player) + '.svg', this.bishopReachFunction());
  }

  static aKnight(player: Player) {
    return new PieceType('bishop', 'pieces/knight_' + this.pieceNameSuffix(player) + '.svg', this.knightReachFunction());
  }

  static aPawn(player: Player) {
    return new PieceType('pawn', 'pieces/pawn_' + this.pieceNameSuffix(player) + '.svg', this.pawnReachFunction());
  }

  private static pieceNameSuffix(player: Player) {
    if (player.color === -1) {
      return 'white';
    }
    return 'black';
  }

  private static kingReachFunction() {
    return (originField, targetField) => {
      return (Math.abs(originField.x - targetField.x) + Math.abs(originField.y - targetField.y) <= 1) ||
        ((Math.abs(originField.x - targetField.x) === 1 && Math.abs(originField.y - targetField.y) === 1));
    };
  }

  private static queenReachFunction() {
    return (originField, targetField) => {
      return Math.abs(originField.x - targetField.x) === 0
        || Math.abs(originField.y - targetField.y) === 0
        || Math.abs(originField.x - targetField.x) === Math.abs(originField.y - targetField.y);
    };
  }

  private static rookReachFunction() {
    return (originField, targetField) => {
      return Math.abs(originField.x - targetField.x) === 0
        || Math.abs(originField.y - targetField.y) === 0
        ;
    };
  }

  private static bishopReachFunction() {
    return (originField, targetField) => {
      return Math.abs(originField.x - targetField.x) === Math.abs(originField.y - targetField.y);
    };
  }

  private static knightReachFunction() {
    return (originField, targetField) => {
      return (Math.abs(originField.x - targetField.x) === 1 &&
        Math.abs(originField.y - targetField.y) === 2) ||
        (Math.abs(originField.x - targetField.x) === 2 &&
          Math.abs(originField.y - targetField.y) === 1);
    };
  }

  // todo
  private static pawnReachFunction() {
    return (originField, targetField) => {
      return Math.abs(originField.y - targetField.y) === 0;
    };
  }

  getReachableFields(board: Board): Field[] {
    const fields = new Array<Field>();

    return fields;
  }

  canReach(originField: Field, targetField: Field) {
    return this.reachFunction(originField, targetField);
  }
}
