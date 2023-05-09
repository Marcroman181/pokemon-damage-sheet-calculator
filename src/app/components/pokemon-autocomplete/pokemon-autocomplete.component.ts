import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable, startWith, map } from 'rxjs';

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
  pokemon: string; 
  
  @ViewChild('pokemonInput') formInput: ElementRef;

  ngOnInit() {

    if (this.initializedPokemon) {
      this.myControl.setValue('');
      this.pokemon = this.initializedPokemon;
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

  selectPokemon(option: string): void {
    this.pokemon = option;
    this.selectedPokemon.emit(option);
    console.log("Pokemon Autocomplete Selected => " + option);
  }

  initializeSearch(): void {
    this.myControl.setValue('');
    this.isKeyboardActive();
  }

  isKeyboardActive() {
     this.formInput.nativeElement.focus();
  }

}

