import { Injectable } from '@angular/core';
import types from "../../assets/types.json"

@Injectable({
  providedIn: 'root'
})
export class PokemonTypesService {

  pokemonTypes: Array<string>;

  constructor() {
    this.resolvePokemonTypes();
  }

  private resolvePokemonTypes(): void {

    this.pokemonTypes = JSON.parse(JSON.stringify(types));
  }

  getAllPokemonTypes(): Array<string> {

    return this.pokemonTypes;
  }

}
