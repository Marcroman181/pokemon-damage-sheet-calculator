import { Injectable } from '@angular/core';
import { PokemonSet } from '../model/pokemon-set/pokemonSet';

@Injectable({
  providedIn: 'root'
})
export class SheetService {

  private readonly USER_SHEET_KEY: string = 'user-sheet';

  getSheet(): Array<PokemonSet> {
    let sheetFromUser: any = localStorage.getItem(this.USER_SHEET_KEY) || '[]';
    
    return JSON.parse(sheetFromUser);
  }

  saveSheet(sheet: Array<PokemonSet>): void {

    localStorage.setItem(this.USER_SHEET_KEY, JSON.stringify(sheet));
  }

}
