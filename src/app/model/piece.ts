import {PieceType} from './pieceType';
import {Field} from './field';
import {Player} from './player';
import {Board} from './board';
import {ActionType, PieceAction} from './pieceAction';

export class Piece {


  constructor(public pieceType: PieceType, private _field: Field, public player: Player, public actions: PieceAction[]) {
  }

  get field(): Field {
    return this._field;
  }

  set field(value: Field) {
    this._field = value;
    this.afterMoveActions();
  }

  canReach(targetField: Field, actions: PieceAction[], board: Board) {
    const directions = this.getReachableFieldsWithOcclusion(actions, board);
    return directions.some(direction => {
      return direction.some(fields => {
          return fields.some(field => {
            return field.equals(targetField);
          });
        }
      );
    });
    // Contextlose Logik
    // return this.pieceType.canReach(this.field, targetField);
  }

  private getReachableFieldsWithOcclusion(actions: PieceAction[], board: Board) {
    const directions: Field[][][] = actions.map(action => action.inDirectionsReachableFields(this._field));
    directions.map(action => action.map(
      fieldsInDirection => {
        const indexOfFirstPiece = fieldsInDirection.findIndex((f: Field) => {
          return board.getPieceOfField(f) != null;
        });
        return fieldsInDirection.splice(indexOfFirstPiece);
      }));
    return directions;
  }

  canMoveTo(field: Field, board: Board) {
    const actions = this.actions.filter(pieceAction => {
      return pieceAction.actionType === ActionType.MOVEMENT || pieceAction.actionType === ActionType.BOTH;
    });
    return this.canReach(field, actions, board);
  }

  canCapture(field: Field, board: Board) {
    const actions = this.actions.filter(pieceAction => {
      return pieceAction.actionType === ActionType.CAPTURE || pieceAction.actionType === ActionType.BOTH;
    });
    return this.canReach(field, actions, board);
  }

  private afterMoveActions() {

  }
}
