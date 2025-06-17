import { Component } from '@angular/core';
import { InputCardComponent } from "../input-card/input-card.component";
import { DisplayCardComponent } from "../display-card/display-card.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [InputCardComponent, DisplayCardComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.sass'
})
export class HomeComponent {

}
