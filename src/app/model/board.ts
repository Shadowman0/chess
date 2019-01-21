import {Field} from './field';
import {Piece} from './piece';
import {Player} from './player';
import {PieceType} from './pieceType';

export class Board {
  public fields: Array<Array<Field>>;
  public pieces: Piece[] = new Array();
  public players: Player[] = [new Player(1), new Player(0)];

  constructor() {
    this.fields = new Array<Array<Field>>();
    for (let i = 0; i < 8; i++) {
      this.fields.push(new Array());
      for (let j = 0; j < 8; j++) {
        this.fields[i].push(new Field(i, j));
      }
    }
    this.setupStartPieces();
  }

  setupStartPieces() {
    const playerBlack = this.players[0];
    const playerWhite = this.players[1];
    this.placePawns(1, playerBlack);
    this.placePawns(6, playerWhite);
    this.pieces.push(new Piece(PieceType.aRook(playerBlack), this.fields[0][0], playerBlack));
    this.pieces.push(new Piece(PieceType.aRook(playerBlack), this.fields[0][7], playerBlack));
    this.pieces.push(new Piece(PieceType.aRook(playerWhite), this.fields[7][0], playerWhite));
    this.pieces.push(new Piece(PieceType.aRook(playerWhite), this.fields[7][7], playerWhite));

    this.pieces.push(new Piece(PieceType.aKnight(playerWhite), this.fields[7][1], playerWhite));
    this.pieces.push(new Piece(PieceType.aKnight(playerWhite), this.fields[7][6], playerWhite));
    this.pieces.push(new Piece(PieceType.aKnight(playerBlack), this.fields[0][1], playerBlack));
    this.pieces.push(new Piece(PieceType.aKnight(playerBlack), this.fields[0][6], playerBlack));

    this.pieces.push(new Piece(PieceType.aBishop(playerWhite), this.fields[7][2], playerWhite));
    this.pieces.push(new Piece(PieceType.aBishop(playerWhite), this.fields[7][5], playerWhite));
    this.pieces.push(new Piece(PieceType.aBishop(playerBlack), this.fields[0][2], playerBlack));
    this.pieces.push(new Piece(PieceType.aBishop(playerBlack), this.fields[0][5], playerBlack));

    this.pieces.push(new Piece(PieceType.aQueen(playerWhite), this.fields[7][3], playerWhite));
    this.pieces.push(new Piece(PieceType.aKing(playerWhite), this.fields[7][4], playerWhite));
    this.pieces.push(new Piece(PieceType.aQueen(playerBlack), this.fields[0][3], playerBlack));
    this.pieces.push(new Piece(PieceType.aKing(playerBlack), this.fields[0][4], playerBlack));
  }

  private placePawns(row: number, player) {
    this.fields[row].forEach(field => {
      this.pieces.push(new Piece(PieceType.aPawn(player), field, player));
    });
  }

  public getPieceOfField(searchedField: Field): Piece {
    return this.pieces.find(piece => piece.field.equals(searchedField));
  }

  public removePiece(piece: Piece){
    this.pieces.forEach((item, index) => {
      if(item === piece) this.pieces.splice(index,1);
    });
  }
}
