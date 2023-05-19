import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
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
  @Input() pokemonSets: Map<string, Array<string>>;

  @Output() selectedPokemon: EventEmitter<string> = new EventEmitter<string>();
  @Output() selectedPokemonSet: EventEmitter<string> = new EventEmitter<string>();


  myControl = new FormControl('');
  filteredOptions: Observable<Array<string>>;
  pokemon: string;
  pokemonSet: string;

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
    this.pokemonSet = undefined;
    this.selectedPokemon.emit(option);
    console.log("Pokemon Autocomplete Selected => " + option);
  }

  selectPokemonSet(option: string, setOption: string): void {
    this.pokemon = option;
    this.pokemonSet = setOption;
    this.selectedPokemonSet.emit(setOption);
    console.log("Pokemon Set Autocomplete Selected => " + setOption);
  }

  initializeSearch(): void {
    this.myControl.setValue('');
    this.isKeyboardActive();
  }

  isKeyboardActive() {
    this.formInput.nativeElement.focus();
  }

  getSetsByPokemon(pokemonName:string): Array<string> {
    return this.pokemonSets.get(pokemonName) || [];
  }

  formatPokemonSet(setName: string): string {

    return setName.startsWith(this.pokemon + ' ')
      ? setName.slice(this.pokemon.length + 1)
      : setName;
  }
}

