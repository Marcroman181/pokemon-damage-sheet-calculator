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
  doubles: boolean =  false;
  terrain: boolean = false;
  weather: boolean = false;
  reflect: boolean = false;
  helpingHand: boolean = false;  

  ngOnInit(): void {
    if(this.initialMultipliers && this.initialMultipliers.length) {
      this.multipliers = this.initialMultipliers
        .filter((multiplier: Multiplier) => !multiplier.modificatorType)
        .map((multiplier: Multiplier) => this.copyMultiplier(multiplier));
      
      this.doubles = this.initialMultipliers
        .some((multiplier: Multiplier) => multiplier.modificatorType === 1 && multiplier.description === 'Doubles' && multiplier.value === 0.75);
      
      this.helpingHand = this.initialMultipliers
        .some((multiplier: Multiplier) => multiplier.modificatorType === 0 && multiplier.description === 'HH' && multiplier.value === 1.5);
      
      this.terrain = this.initialMultipliers
        .some((multiplier: Multiplier) => multiplier.modificatorType === 1 && multiplier.description === 'Weather' && multiplier.value === 1.3);
      
      this.weather = this.initialMultipliers
        .some((multiplier: Multiplier) => multiplier.modificatorType === 1 && multiplier.description === 'Terrain' && multiplier.value === 1.5);
      
      this.reflect = this.initialMultipliers
        .some((multiplier: Multiplier) => multiplier.modificatorType === 1 && multiplier.description === 'Reflect' && multiplier.value === 0.75);
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

  removeMultiplier(index: number): void {
    let newMultipliers: Array<Multiplier> = [];
    for (let i = 0; i < this.multipliers.length; i++) {
      if (i !== index) {
        newMultipliers.push(this.multipliers[i]);
      }
    }
    this.multipliers = newMultipliers;
  }

  saveMultipliers(): void {

    if(this.doubles) {
      this.multipliers.push(this.createMultiplier(0.75, 'Doubles', 1));
    }

    if(this.terrain) {
      this.multipliers.push(this.createMultiplier(1.3, 'Terrain', 1));
    }

    if(this.weather) {
      this.multipliers.push(this.createMultiplier(1.5, 'Weather', 1));
    }

    if(this.helpingHand) {
      this.multipliers.push(this.createMultiplier(1.5, 'HH', 2));
    }

    if(this.reflect) {
      this.multipliers.push(this.createMultiplier(0.75, 'Screen', 1));
    }

    this.onChangeMultipliers.emit(this.multipliers);
  }

  close(): void {
    this.onClose.emit();
  }

  setDoubles(doubles: boolean): void {
    this.doubles = doubles;
  }

  toggleField(): void {
    this.terrain = !this.terrain;
  }

  toggleWeather(): void {
    this.weather = !this.weather;
  }

  toggleReflect(): void {
    this.reflect = !this.reflect;
  }

  toggleHH(): void {
    this.helpingHand = !this.helpingHand;
  }

  private createMultiplier(value: number, description: string, type: number): Multiplier {
    
    return {
      value: value, 
      description: description,
      modificatorType: type
    } as Multiplier
  }

}
