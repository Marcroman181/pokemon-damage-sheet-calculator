import { Component, EventEmitter, Input, OnChanges, Output } from '@angular/core';
import { PokemonSet } from 'src/app/model/pokemon-set/pokemonSet';

@Component({
  selector: 'opponent-pokemon',
  templateUrl: './opponent-pokemon.component.html',
  styleUrls: ['./opponent-pokemon.component.scss']
})
export class OpponentPokemonComponent {

  @Input() oponnentPokemon: PokemonSet;
  @Input() pokemon: PokemonSet;
  @Input() offensiveCalcs: boolean = false;

  @Output() editPokemon: EventEmitter<number> = new EventEmitter<number>();
  @Output() onToggleTera: EventEmitter<number> = new EventEmitter<number>();
  @Output() deletePokemon: EventEmitter<number> = new EventEmitter<number>();

  edit(): void {
    this.editPokemon.emit(this.oponnentPokemon.id);
  }
  
  delete(): void {
    this.deletePokemon.emit(this.oponnentPokemon.id);
  }
  
  toggleTera(): void {
    this.onToggleTera.emit(this.oponnentPokemon.id);
  }
  
}
