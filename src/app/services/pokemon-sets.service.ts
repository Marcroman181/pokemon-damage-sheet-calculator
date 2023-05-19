import { Injectable } from '@angular/core';
import sets from "../../assets/sets.json";
import {map, of, Subject, takeUntil} from "rxjs";
import { PokemonSet } from '../model/pokemon-set/pokemonSet';

@Injectable({
  providedIn: 'root'
})
export class PokemonSetsService {

  pokemonSets: Map<string, PokemonSet> = new Map<string, PokemonSet>();

  private readonly unsubscribe: Subject<void> = new Subject();

  constructor() {
    this.obtainAllPokemonSets();
  }

  getPokemonSet(setName: string): PokemonSet {
    
    return this.pokemonSets.get(setName);
  }

  getAllPokemonSets(): Map<string, PokemonSet> {
    return this.pokemonSets;
  }

  private obtainAllPokemonSets(): void {

    of(sets)
      .pipe(
        takeUntil(this.unsubscribe),
        map((allSets: any) => Object.values(JSON.parse(JSON.stringify(allSets))))
        )
      .subscribe((allSets: Array<PokemonSet>) => allSets.forEach((set: PokemonSet) => this.pokemonSets.set(set.setName, set)));
    }

}
