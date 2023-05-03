import { Injectable } from '@angular/core';
import { Move } from '../model/move/move';
import moves from "../../assets/moves.json"

@Injectable({
  providedIn: 'root'
})
export class PokemonMovesService {

  pokemonMoves: Map<string, Move>;

  constructor() {
    this.resolvePokemonMoves();
  }

  getPokemonMove(pokemonName: string): Move {

    return this.pokemonMoves.get(pokemonName);
  }

  getAllPokemonMoves(): Map<string, Move> {

    return this.pokemonMoves;
  }

  private resolvePokemonMoves(): void {

    this.pokemonMoves = new Map<string, Move>();

    Object.entries(JSON.parse(JSON.stringify(moves)))
      .forEach((moveEntry: any) => this.pokemonMoves.set(moveEntry[0], this.resolvePokemonMove(moveEntry)))
  }

  private resolvePokemonMove(moveEntry: any): Move {

    return {
      name: moveEntry[0],
      bp: moveEntry[1].bp,
      type: moveEntry[1].type,
      category: moveEntry[1].category,
      
    } as Move;
  }
}