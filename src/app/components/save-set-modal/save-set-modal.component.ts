import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

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
