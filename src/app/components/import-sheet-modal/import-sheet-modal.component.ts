import { Component, EventEmitter, Output } from '@angular/core';
import { PokemonSet } from 'src/app/model/pokemon-set/pokemonSet';

@Component({
  selector: 'import-sheet-modal',
  templateUrl: './import-sheet-modal.component.html',
  styleUrls: ['./import-sheet-modal.component.scss']
})
export class ImportSheetModalComponent {

  @Output() onImportSheet: EventEmitter<Array<PokemonSet>> = new EventEmitter<Array<PokemonSet>>();
  @Output() onClose: EventEmitter<void> = new EventEmitter<void>();

  file: any;

  importSheet(): void {

    const fileReader = new FileReader();
    fileReader.readAsText(this.file, 'UTF-8');
    fileReader.onload = () => {
      this.onImportSheet.emit(JSON.parse(fileReader.result.toString()));
    }
    fileReader.onerror = (error) => {
      console.log(error);
    }
  }

  changeFile(event: any): void {
    console.log(event);
    this.file = event.target.files[0];
  }

  close(): void {
    this.onClose.emit();
  }

}
