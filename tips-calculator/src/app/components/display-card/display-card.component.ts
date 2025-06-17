import { Component } from '@angular/core';
import { ButtonComponent } from "../common/button/button.component";

@Component({
  selector: 'app-display-card',
  standalone: true,
  imports: [ButtonComponent],
  templateUrl: './display-card.component.html',
  styleUrl: './display-card.component.sass'
})
export class DisplayCardComponent {

}
