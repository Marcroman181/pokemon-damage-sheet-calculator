import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { PokemonSet } from 'src/app/model/pokemon-set/pokemonSet';

@Component({
  selector: 'edit-pokemon-modal',
  templateUrl: './edit-pokemon-modal.component.html',
  styleUrls: ['./edit-pokemon-modal.component.scss']
})
export class EditPokemonModalComponent implements OnInit {

  @Input() initializePokemon: PokemonSet;

  @Output() addPokemon: EventEmitter<PokemonSet> = new EventEmitter<PokemonSet>();
  @Output() closeModal: EventEmitter<void> = new EventEmitter<void>();

  pokemon: PokemonSet;
  
  ngOnInit(): void {
    this.pokemon = this.initializePokemon;
  }

  modifyPokemon($event: PokemonSet): void {
    this.pokemon = $event;
  }

  add(): void {
    this.addPokemon.emit(this.pokemon);
  }

  close(): void {
    this.closeModal.emit();
  }

}
