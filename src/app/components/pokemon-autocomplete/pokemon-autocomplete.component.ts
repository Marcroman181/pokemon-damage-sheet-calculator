import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable, startWith, map } from 'rxjs';
import { PokemonSet } from 'src/app/model/pokemon-set/pokemonSet';

@Component({
  selector: 'pokemon-autocomplete',
  templateUrl: './pokemon-autocomplete.component.html',
  styleUrls: ['./pokemon-autocomplete.component.scss']
})
export class PokemonAutocompleteComponent implements OnInit {

  @Input() pokedexSuggestions: Array<string> = [];
  @Input() initializedPokemon: string;

  @Output() selectedPokemon: EventEmitter<string> = new EventEmitter<string>();

  myControl = new FormControl('');
  filteredOptions: Observable<Array<string>>;

  ngOnInit() {

    if (this.initializedPokemon) {
      this.myControl.setValue(this.initializedPokemon);
    }
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value || '')),
    );

  }

  private _filter(value: string): Array<string> {
    const filterValue = value.toLowerCase();

    return this.pokedexSuggestions
      .filter(option => option.toLowerCase().includes(filterValue));
  }

  selectPokemon($event: any): void {

    this.selectedPokemon.emit($event.option.value);
    console.log("Pokemon Autocomplete Selected => " + $event.option.value);
  }

  clearSearch(): void {
    this.myControl.setValue('');
  }

}
