import { Injectable } from '@angular/core';
import { PokemonSet } from '../model/pokemon-set/pokemonSet';
import typeEfectivenessesFile from "../../assets/type-efectiveness.json";
import { every, map, of, Subject, takeUntil } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class TypeEfectivenessService {

  typeEfectivenesses: Map<string, Map<String, number>> = new Map<string, Map<String, number>>();

  private readonly unsubscribe: Subject<void> = new Subject();

  constructor() {
    this.getAllTypeEfectivenesses();
  }

  resolveEfectiveness(moveType: string, pokemon: PokemonSet): number {

    let effectiveness: number = 1;

    const moveEfectiveness: Map<String, number> = this.typeEfectivenesses.get(moveType);

    if (pokemon.enabledTera && pokemon.teraType && pokemon.teraType !== 'None') {

      //TERA ENABLED
      if (moveEfectiveness && moveEfectiveness.has(pokemon.teraType)) {
        effectiveness = effectiveness * moveEfectiveness.get(pokemon.teraType);
      }

    } else {

      //TERA DISABLED
      if (moveEfectiveness && pokemon.type && moveEfectiveness.has(pokemon.type)) {
        effectiveness = effectiveness * moveEfectiveness.get(pokemon.type);
      }

      if (moveEfectiveness && pokemon.type2 && moveEfectiveness.has(pokemon.type2)) {
        effectiveness = effectiveness * moveEfectiveness.get(pokemon.type2);
      }
    }

    return effectiveness;

  }

  getAllPokemon(): Map<string, Map<String, number>> {

    return this.typeEfectivenesses;
  }

  private getAllTypeEfectivenesses(): void {
    of(typeEfectivenessesFile)
      .pipe(
        takeUntil(this.unsubscribe),
        map((file: any) => Object.entries(JSON.parse(JSON.stringify(file))))
      )
      .subscribe((file: any) => {
        file.forEach((entry: any) =>
          this.typeEfectivenesses.set(entry[0], this.resolveTypeEfectivenessEntry(entry[1])));
      });

  }

  private resolveTypeEfectivenessEntry(entry: any): any {
    let typeEfectivenessesRates = new Map<string, number>();

    Object.entries(entry)
      .forEach(entry => typeEfectivenessesRates.set(entry[0], Number(entry[1])));

    return typeEfectivenessesRates;
  }

}
