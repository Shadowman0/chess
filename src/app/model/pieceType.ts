import {Player} from './player';
import {Field} from './field';
import {Board} from './board';

type CanReachFunction = (originField: Field, targetField: Field) => boolean;


export class PieceType {

  constructor(public name: string, public image: string) {
  }


  static aKing(player: Player) {
    return new PieceType('king', 'pieces/king_' + this.pieceNameSuffix(player) + '.svg');
  }

  static aQueen(player: Player) {
    return new PieceType('queen', 'pieces/queen_' + this.pieceNameSuffix(player) + '.svg');
  }

  static aRook(player: Player) {
    return new PieceType('rook', 'pieces/rook_' + this.pieceNameSuffix(player) + '.svg');
  }

  static aBishop(player: Player) {
    return new PieceType('bishop', 'pieces/bishop_' + this.pieceNameSuffix(player) + '.svg');
  }

  static aKnight(player: Player) {
    return new PieceType('bishop', 'pieces/knight_' + this.pieceNameSuffix(player) + '.svg');
  }

  static aPawn(player: Player) {
    return new PieceType('pawn', 'pieces/pawn_' + this.pieceNameSuffix(player) + '.svg');
  }

  private static pieceNameSuffix(player: Player) {
    if (player.color === -1) {
      return 'white';
    }
    return 'black';
  }
}
