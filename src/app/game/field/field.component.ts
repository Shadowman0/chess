import {Component, Input, OnInit} from '@angular/core';
import {Field} from '../../model/field';
import {Piece} from '../../model/piece';
import {GameService} from '../../model/game.service';

@Component({
  selector: 'app-field',
  templateUrl: './field.component.html',
  styleUrls: ['./field.component.css']
})
export class FieldComponent implements OnInit {
  @Input() field: Field;
  @Input() isEven: boolean;
  @Input() piece: Piece;

  constructor(public gameService: GameService) {
  }

  ngOnInit() {
  }

}
