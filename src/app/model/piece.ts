import {PieceType} from './pieceType';
import {Field} from './field';
import {Player} from './player';
import {Board} from './board';

export class Piece {
  constructor(public pieceType: PieceType, public field: Field, public player: Player) {
  }

  canReach(targetField: Field, board: Board) {
    return this.pieceType.canReach(this.field, targetField);
  }

  canCapture(field: Field, board: Board) {
    return true;
  }
}
