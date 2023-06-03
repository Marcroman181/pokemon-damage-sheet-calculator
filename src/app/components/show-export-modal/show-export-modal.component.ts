import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'show-export-modal',
  templateUrl: './show-export-modal.component.html',
  styleUrls: ['./show-export-modal.component.scss']
})
export class ShowExportModalComponent {

  @Output() onExportSheet: EventEmitter<string> = new EventEmitter<string>();
  @Output() onClose: EventEmitter<void> = new EventEmitter<void>();
  
  fileName:string = 'team-export';

  exportSheet(): void {
    this.onExportSheet.emit(this.fileName);
  }

  close(): void {
    this.onClose.emit();
  }
}
