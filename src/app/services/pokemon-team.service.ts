import { Injectable } from '@angular/core';
import { PokemonSet } from '../model/pokemon-set/pokemonSet';

@Injectable({
  providedIn: 'root'
})
export class PokemonTeamService {

  private readonly USER_TEAM_KEY: string = 'user-team';

  getTeam(): Array<PokemonSet> {
    let teamFromUser: any = localStorage.getItem(this.USER_TEAM_KEY) || '[]';
    
    return JSON.parse(teamFromUser);
  }

  saveTeam(team: Array<PokemonSet>): void {

    localStorage.setItem(this.USER_TEAM_KEY, JSON.stringify(team))
  }

}
