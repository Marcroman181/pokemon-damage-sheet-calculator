import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Multiplier } from 'src/app/model/multiplier/multiplier';

@Component({
  selector: 'multiplier-modal',
  templateUrl: './multiplier-modal.component.html',
  styleUrls: ['./multiplier-modal.component.scss']
})
export class MultiplierModalComponent implements OnInit {

  @Input() initialMultipliers: Array<Multiplier>;

  @Output() onChangeMultipliers: EventEmitter<Array<Multiplier>> = new EventEmitter<Array<Multiplier>>();

  @Output() onClose: EventEmitter<void> = new EventEmitter<void>();

  multipliers: Array<Multiplier> = [];

  ngOnInit(): void {
    if(this.initialMultipliers && this.initialMultipliers.length) {
      this.multipliers = this.initialMultipliers
        .map((multiplier: Multiplier) => this.copyMultiplier(multiplier));
    }
    
  }

  copyMultiplier(multiplier: Multiplier): Multiplier {

    return {
      ...multiplier
    } as Multiplier;
  }

  addMultiplier(): void {
    this.multipliers.push({value: 1, description: ''});
  }

  saveMultipliers(): void {

    this.onChangeMultipliers.emit(this.multipliers);
  }

  close(): void {
    this.onClose.emit();
  }

}
