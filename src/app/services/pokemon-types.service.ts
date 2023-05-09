import { Injectable } from '@angular/core';
import types from "../../assets/types.json";
import {map, of, Subject, takeUntil} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class PokemonTypesService {

  pokemonTypes: Array<string> = [];

  private readonly unsubscribe: Subject<void> = new Subject();

  constructor() {
    this.resolvePokemonTypes();
  }

  private resolvePokemonTypes(): void {

    of(types)
      .pipe(
        takeUntil(this.unsubscribe),
        map((allTypess: any) => JSON.parse(JSON.stringify(types)))
        )
      .subscribe((allTypesEntries: any) => this.pokemonTypes = allTypesEntries);
  }

  getAllPokemonTypes(): Array<string> {

    return this.pokemonTypes;
  }

}
