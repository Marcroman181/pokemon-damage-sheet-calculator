import { Injectable } from '@angular/core';
import { PokemonSet } from '../model/pokemon-set/pokemonSet';
import exportFromJSON from 'export-from-json';

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

  exportSheet(data: Array<PokemonSet>, fileName: string = 'sheet-export'): void {

    exportFromJSON({ data, fileName, extension: "json"});
  }

}
