import { Injectable } from '@angular/core';
import { PokemonSet } from '../model/pokemon-set/pokemonSet';
import exportFromJSON from 'export-from-json';
import defaultSheet from "../../assets/default-sheet.json";
import { Observable, Subject, map, of, takeUntil } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SheetService {

  private readonly USER_SHEET_KEY: string = 'user-sheet';

  private readonly unsubscribe: Subject<void> = new Subject();

  getSheet(): Array<PokemonSet> {
    let sheetFromUser: any = localStorage.getItem(this.USER_SHEET_KEY) || '[]';

    return JSON.parse(sheetFromUser);
  }

  getDefaultSheet(): Observable<Array<PokemonSet>> {

    return of(defaultSheet)
      .pipe(
        takeUntil(this.unsubscribe),
        map((allDefaultSheet: any) => Object.values(JSON.parse(JSON.stringify(allDefaultSheet))))
      );
  }

  saveSheet(sheet: Array<PokemonSet>): void {

    localStorage.setItem(this.USER_SHEET_KEY, JSON.stringify(sheet));
  }

  exportSheet(data: Array<PokemonSet>, fileName: string = 'sheet-export'): void {

    exportFromJSON({ data, fileName, extension: "json" });
  }



}
