import {Component, Input, OnInit} from '@angular/core';
import {Board} from '../../model/board';
import {GameService} from '../../model/game.service';
import {Piece} from '../../model/piece';
import {Field} from '../../model/field';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit {
  board: Board;

  constructor(public gameService: GameService) {

  }

  ngOnInit() {
    this.board = this.gameService.board;
  }

  onClicked(field: Field, piece: Piece) {
    this.gameService.selectOrMove(piece, field);
  }
}
