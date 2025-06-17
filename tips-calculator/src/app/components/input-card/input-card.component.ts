import { Component, computed, EventEmitter, Output, signal } from '@angular/core';
import { ButtonComponent } from "../common/button/button.component";
import { Button } from '../../models/button';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-input-card',
  standalone: true,
  imports: [ FormsModule],
  templateUrl: './input-card.component.html',
  styleUrl: './input-card.component.sass'
})
export class InputCardComponent {

//   tipsButton: Button[] = [
//     {
//     label: '5%',
//     color: '#00474B',
//     value: 5,
//     tipMethod: function(value){ return value}
//   },
//   {
//     label: '10%',
//     color: '#00474B',
//     value: 10,
//     tipMethod: function(value){ return value}
//   },
//   {
//     label: '15%',
//     color: '#00474B',
//     value: 15,
//     tipMethod: function(value){ return value}
//   }
//   ,
//   {
//     label: '25%',
//     color: '#00474B',
//     value: 25,
//     tipMethod: function(value){ return value}
//   },
//   {
//     label: '50%',
//     color: '#00474B',
//     value: 50,
//     tipMethod: function(value){ return value}
//   }
// ] 

 inputValue = signal<number>(0)
 numberOfPeople = signal<number>(1)
 @Output() tipAmount = new EventEmitter<number>()

 constructor() {
 }

 amountPerPerson = computed(() => this.inputValue()/this.numberOfPeople())
 
 handleTipAmount() {
  this.tipAmount.emit(this.amountPerPerson())
 }


}
