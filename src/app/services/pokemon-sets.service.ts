import { Injectable } from '@angular/core';
import sets from "../../assets/sets.json";
import { map, of, Subject, takeUntil } from "rxjs";
import { PokemonSet } from '../model/pokemon-set/pokemonSet';

@Injectable({
  providedIn: 'root'
})
export class PokemonSetsService {

  pokemonSets: Map<string, PokemonSet> = new Map<string, PokemonSet>();
  userSets: Map<string, PokemonSet> = new Map<string, PokemonSet>();

  private readonly USER_SETS_KEY: string = 'pokemon-sets';

  private readonly unsubscribe: Subject<void> = new Subject();

  constructor() {
    this.obtainAllPokemonSets();
  }

  getPokemonSet(setName: string): PokemonSet {

    return this.mergeMaps().get(setName);
  }

  getAllPokemonSets(): Map<string, PokemonSet> {
    return this.mergeMaps();
  }

  private obtainAllPokemonSets(): void {

    of(sets)
      .pipe(
        takeUntil(this.unsubscribe),
        map((allSets: any) => Object.values(JSON.parse(JSON.stringify(allSets))))
      )
      .subscribe((allSets: Array<PokemonSet>) => allSets.forEach((set: PokemonSet) => this.pokemonSets.set(set.setName, set)));
    
    let setsFromUser: any = localStorage.getItem(this.USER_SETS_KEY) || '[]';
    of(setsFromUser)
    .pipe(
      takeUntil(this.unsubscribe),
      map((allSets: string) => Object.values(JSON.parse(allSets)))
    )
    .subscribe((allSets: Array<PokemonSet>) => allSets.forEach((set: PokemonSet) => this.userSets.set(set.setName, set)));
  }

  saveSet(set: PokemonSet): void {
  
    this.userSets.set(set.setName, set);

    localStorage.setItem(this.USER_SETS_KEY, JSON.stringify(Array.from(this.userSets.values())))
  }

  private mergeMaps() {

    return new Map([...Array.from(this.pokemonSets.entries()), ...Array.from(this.userSets.entries())]);
  }

}
