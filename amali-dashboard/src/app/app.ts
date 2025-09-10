import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core'

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class App {
  protected title = 'amali-dashboard';
}
