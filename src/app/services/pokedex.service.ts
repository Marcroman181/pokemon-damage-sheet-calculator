import { Injectable } from '@angular/core';
import { PokemonDex } from '../model/pokemon-dex/pokemonDex';
import pokedex from "../../assets/pokedex.json"

@Injectable({
  providedIn: 'root'
})
export class PokedexService {

  pokedex: Map<string, PokemonDex>;

  constructor() {
    this.resolvePokedex();
  }

  getPokemon(pokemonName: string): PokemonDex {

    return this.pokedex.get(pokemonName);
  }

  getAllPokemon(): Map<string, PokemonDex> {

    return this.pokedex;
  }

  private resolvePokedex(): void {

    this.pokedex = new Map<string, PokemonDex>();

    Object.entries(JSON.parse(JSON.stringify(pokedex)))
      .forEach((pokedexEntry: any) => this.pokedex.set(pokedexEntry[0], this.resolvePokemonDex(pokedexEntry)))
  }

  private resolvePokemonDex(pokedexEntry: any): PokemonDex {

    let baseStats: Map<string, number> = new Map<string, number>();

    baseStats.set("hp", pokedexEntry[1].bs.hp);
    baseStats.set("atk", pokedexEntry[1].bs.at);
    baseStats.set("def", pokedexEntry[1].bs.df);
    baseStats.set("spa", pokedexEntry[1].bs.sa);
    baseStats.set("spd", pokedexEntry[1].bs.sd);
    baseStats.set("spe", pokedexEntry[1].bs.sp);

    return {
      name: pokedexEntry[0],
      type: pokedexEntry[1].type,
      type2: pokedexEntry[1].type2,
      bs: baseStats,
    } as PokemonDex
  }

}
