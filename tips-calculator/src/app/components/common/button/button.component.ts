import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [],
  templateUrl: './button.component.html',
  styleUrl: './button.component.sass'
})
export class ButtonComponent {
  @Input() label: string = '';
  @Input() color: string = '';
  @Output() selectTip = new EventEmitter<number>();


  onTipSelected(event: Event) {
    // const target = event.target as HTMLInputElement
    // this.selectTip.emit(value)
  }
}
