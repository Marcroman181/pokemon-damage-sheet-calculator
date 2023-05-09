import { Injectable } from '@angular/core';
import natures from "../../assets/natures.json"
import {map, of, Subject, takeUntil} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class PokemonNaturesService {

  pokemonNatures: Map<string, Array<string>> = new Map<string, Array<string>>();

  private readonly unsubscribe: Subject<void> = new Subject();


  constructor() {
    this.resolvePokemonNatures();
  }  

  private resolvePokemonNatures(): void {

    of(natures)
      .pipe(
        takeUntil(this.unsubscribe),
        map((allNatures: any) => Object.entries(JSON.parse(JSON.stringify(allNatures))))
        )
      .subscribe((allNaturesEntries: any) => allNaturesEntries.forEach((natureEntry: any) => this.pokemonNatures.set(natureEntry[0], natureEntry[1])));
  }

  getAllPokemonNatures(): Map<string, Array<string>> {

    return this.pokemonNatures;
  }

  getNatureMultiplier(nature: string, statId: string): number {

    if(!nature || !this.pokemonNatures.has(nature)) {
      return 1;
    }

    const effects :Array<string> = this.pokemonNatures.get(nature);

    if(effects[0] === statId) {
      return 1.1;
    }

    if(effects[1] === statId) {
      return 0.9;
    }

    return 1;
  }

}
