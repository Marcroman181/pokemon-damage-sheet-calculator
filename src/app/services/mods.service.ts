import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ModsService {

  ruinMods: Array<string> = [];

  setRuinMods(ruins: Array<string>): void {
    this.ruinMods = ruins;
  }

  getRuinMods(): Array<string> {
    return this.ruinMods;
  }
}
