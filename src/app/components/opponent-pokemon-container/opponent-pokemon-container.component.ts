import { Component } from '@angular/core';
import { PokemonSet } from 'src/app/model/pokemon-set/pokemonSet';
import { IdGeneratorService } from 'src/app/services/id-generator.service';

@Component({
  selector: 'opponent-pokemon-container',
  templateUrl: './opponent-pokemon-container.component.html',
  styleUrls: ['./opponent-pokemon-container.component.scss']
})
export class OpponentPokemonContainerComponent {


  pokemons: Map<number, PokemonSet> = new Map<number, PokemonSet>();

  showModal: boolean = false;
  pokemonToEdit: PokemonSet;

  constructor(private readonly idGeneratorService: IdGeneratorService) {

  }

  closeModal(): void {
    this.showModal = false;
  }

  addPokemon(): void {
    this.pokemonToEdit = undefined;
    this.showModal = true;
  }

  editPokemon(pokemonId: number): void {
    this.pokemonToEdit = this.pokemons.get(pokemonId) || undefined;
    this.showModal = true;
  }

  deletePokemon(pokemonId: number): void {
    console.log("POKEMON DELETE");
    console.log(this.pokemons);
    this.pokemons.delete(pokemonId);
    console.log("POKEMON DELETED");
    console.log(this.pokemons);
  }

  savePokemon(pokemon: PokemonSet): void {
    this.showModal = false;
    if(pokemon.id) {
      this.pokemons.set(pokemon.id, pokemon);
      console.log("POKEMON EDITTED");
    } else {
      const ids: Array<number> = Array.from(this.pokemons.keys());
      pokemon.id = this.idGeneratorService.generateId(ids);
      this.pokemons.set(pokemon.id, pokemon);
      console.log("POKEMON SAVED");
    }
    console.log(pokemon);
  }

}
