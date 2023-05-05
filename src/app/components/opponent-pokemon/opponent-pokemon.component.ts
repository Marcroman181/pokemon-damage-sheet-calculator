import { Component, EventEmitter, Input, Output } from '@angular/core';
import { PokemonSet } from 'src/app/model/pokemon-set/pokemonSet';

@Component({
  selector: 'opponent-pokemon',
  templateUrl: './opponent-pokemon.component.html',
  styleUrls: ['./opponent-pokemon.component.scss']
})
export class OpponentPokemonComponent {

  @Input() pokemon: PokemonSet;

  @Output() editPokemon: EventEmitter<number> = new EventEmitter<number>();
  @Output() deletePokemon: EventEmitter<number> = new EventEmitter<number>();

  edit(): void {
    this.editPokemon.emit(this.pokemon.id);
  }
  
  delete(): void {
    this.deletePokemon.emit(this.pokemon.id);
  }
  
}
