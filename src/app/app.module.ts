import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './navigation/home/home.component';
import { BoardComponent } from './game/board/board.component';
import { FieldComponent } from './game/field/field.component';
import {GameService} from './model/game.service';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    BoardComponent,
    FieldComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [GameService],
  bootstrap: [AppComponent]
})
export class AppModule { }
