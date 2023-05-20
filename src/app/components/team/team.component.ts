import { ChangeDetectorRef, Component, EventEmitter, OnInit, Output } from '@angular/core';
import { PokemonSet } from 'src/app/model/pokemon-set/pokemonSet';

@Component({
  selector: 'team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.scss']
})
export class TeamComponent implements OnInit {

  @Output() activePokemon: EventEmitter<PokemonSet> = new EventEmitter<PokemonSet>();

  active: number = 0;
  pokemons: Array<PokemonSet> = [];

  constructor(private ref: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.pokemons.push(undefined);
  }

  onActiveTab(index: number): void {
    this.active = index;
    this.activePokemon.emit(this.pokemons[index]);
  }

  addPokemon(): void {
    this.active = this.pokemons.length;
    this.pokemons.push(undefined);
  }

  modifyPokemon(pokemonModified: PokemonSet) {
    this.pokemons[this.active] = pokemonModified;
    this.activePokemon.emit(pokemonModified);
    this.ref.detectChanges();
  }

  deletePokemon(index: number): void {
    let newPokemons: Array<PokemonSet> = [];
    for (let i = 0; i < this.pokemons.length; i++) {
      if (i !== index) {
        newPokemons.push(this.pokemons[i]);
      }
    }
    if (this.active >= index) {
      this.active--;
    }
    this.pokemons = newPokemons;
  }

}
