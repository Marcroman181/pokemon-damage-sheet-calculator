import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { PokemonSet } from 'src/app/model/pokemon-set/pokemonSet';

@Component({
  selector: 'save-set-modal',
  templateUrl: './save-set-modal.component.html',
  styleUrls: ['./save-set-modal.component.scss']
})
export class SaveSetModalComponent {

  @Output() onSaveSet: EventEmitter<string> = new EventEmitter<string>();
  @Output() onClose: EventEmitter<void> = new EventEmitter<void>();
  
  myControl = new FormControl('',[Validators.required]);

  save(): void {
    this.onSaveSet.emit(this.myControl.getRawValue());
  }

  close(): void {
    this.onClose.emit();
  }
}
