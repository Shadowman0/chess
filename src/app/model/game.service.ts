import {Injectable} from '@angular/core';
import {Board} from './board';
import {Piece} from './piece';
import {Player} from './player';
import {Field} from './field';

@Injectable({
  providedIn: 'root'
})
export class GameService {
  public board: Board;
  activePlayer: Player;
  selectedPiece: Piece;

  constructor() {
    this.board = new Board();
    this.activePlayer = this.board.players[1];
  }

  selectOrMove(piece: Piece, field: Field) {
    if (!this.selectedPiece) {
      if (piece && this.activePlayer === piece.player) {
        this.selectedPiece = piece;
        return;
      }
    } else {
      const target: Piece = this.board.getPieceOfField(field);
      if (this.selectedPiece.canMoveTo(field, this.board) && !target) {
        this.selectedPiece.field = field;
        this.changePlayer();
        return;
      } else {
        if (this.selectedPiece.canCapture(field, this.board) && target && target.player !== this.activePlayer) {
          this.board.removePiece(target);
          this.selectedPiece.field = field;
          this.changePlayer();
        }
      }
    }
  }

  public isPieceSelected() {
    return this.selectedPiece != null;
  }

  public canSelectedPieceMoveTo(field: Field) {
    return this.isPieceSelected() && this.selectedPiece.canMoveTo(field, this.board);
  }

  public canSelectedPieceCapture(field: Field) {
    return this.isPieceSelected() && this.selectedPiece.canCapture(field, this.board) && this.fieldContainsEnemyPiece(field);
  }

  private fieldContainsEnemyPiece(field: Field): boolean {
    const pieceOfField = this.board.getPieceOfField(field);
    return pieceOfField ? pieceOfField.player !== this.activePlayer : false;
  }

  private changePlayer() {
    this.selectedPiece = null;
    this.activePlayer = this.board.players.find(p => p !== this.activePlayer);
  }

  deselectPiece() {
    this.selectedPiece = null;
  }
}
