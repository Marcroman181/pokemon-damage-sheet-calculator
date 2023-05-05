import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class IdGeneratorService {

  generateId(ids: Array<number>): number {

    if (!ids || !ids.length) {
      return 1;
    }

    let newId: number = ids.length + 1;

    for(; ids.includes(newId); newId++) {
      
    }
    
    return newId;
  }

}
