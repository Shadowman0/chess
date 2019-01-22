import {PieceType} from './pieceType';
import {Field} from './field';
import {Player} from './player';
import {Board} from './board';
import {ActionType, PieceAction, RangeType} from './pieceAction';

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

  private canReach(targetField: Field, actions: PieceAction[], board: Board, captureAction: boolean) {
    const directions = this.getReachableFieldsWithOcclusion(actions, board, captureAction);
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

  private getReachableFieldsWithOcclusion(actions: PieceAction[], board: Board, captureAction: boolean) {
    const directions: Field[][][] = actions.map(action => action.inDirectionsReachableFields(this._field));
    return directions.map(action => action.map(
      fieldsInDirection => {
        const indexOfFirstPiece = fieldsInDirection.findIndex(f => board.getPieceOfField(f) != null);
        return indexOfFirstPiece !== -1 ? fieldsInDirection.slice(0, indexOfFirstPiece + (captureAction ? 1 : 0)) : fieldsInDirection;
      }));
  }

  canMoveTo(field: Field, board: Board) {
    const actions = this.getMoveActions();
    return this.canReach(field, actions, board, false);
  }

  canCapture(field: Field, board: Board) {
    const actions = this.getCaptureActions();
    return this.canReach(field, actions, board, true);
  }

  private getMoveActions() {
    const actions = this.actions.filter(pieceAction => {
      return pieceAction.actionType === ActionType.MOVEMENT || pieceAction.actionType === ActionType.BOTH;
    });
    return actions;
  }

  private getCaptureActions() {
    const actions = this.actions.filter(pieceAction => {
      return pieceAction.actionType === ActionType.CAPTURE || pieceAction.actionType === ActionType.BOTH;
    });
    return actions;
  }

  private afterMoveActions() {
    const pieceAction = this.actions.find(action => action.range === RangeType.TWICE);
    if (!pieceAction) {
      return;
    }
    pieceAction.range = RangeType.ONCE;
  }
}
