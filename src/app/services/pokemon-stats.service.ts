import { Injectable } from '@angular/core';
import { PokemonSet } from '../model/pokemon-set/pokemonSet';
import { PokemonDex } from '../model/pokemon-dex/pokemonDex';
import { PokemonStat } from '../model/pokemon-stat/pokemon-stat';
import { PokemonStats } from '../model/pokemon-stats/pokemon-stats';
import { PokemonNaturesService } from './pokemon-natures.service';

@Injectable({
  providedIn: 'root'
})
export class PokemonStatsService {


  constructor(private readonly pokemonNaturesService: PokemonNaturesService) {
  }

  convertPokemonDexToPokemonSet(pokemon: PokemonDex): PokemonSet {
    
    return {
      name: pokemon.name,
      level: 50,
      stats: this.resolvePokemonStats(pokemon),
      nature: '',
      type: pokemon.type,
      type2: pokemon.type2,
      currentHp: 100
    } as PokemonSet;
  }

  public calcStat(id: string, level: number, nature: string, base: number, ivs: number, evs: number): number {

    if (id === 'hp') {
      return this.calcStatHP(level, base, ivs, evs);
    }

    const natureMultiplier: number = this.pokemonNaturesService.getNatureMultiplier(nature, id);

    return Math.floor(
      (Math.floor(
        (base * 2 + ivs + Math.floor(evs / 4)) * level / 100)
        + 5)
      * natureMultiplier);
  }

  private calcStatHP(level: number, base: number, ivs: number, evs: number): number {

    return Math.floor((base * 2 + ivs + Math.floor(evs / 4)) * level / 100) + level + 10;
  }

  private resolvePokemonStats(pokemonDex: PokemonDex): PokemonStats {
    return {
      hp: this.convertToStat(pokemonDex, 'hp'),
      atk: this.convertToStat(pokemonDex, 'atk'),
      def: this.convertToStat(pokemonDex, 'def'),
      spa: this.convertToStat(pokemonDex, 'spa'),
      spd: this.convertToStat(pokemonDex, 'spd'),
      spe: this.convertToStat(pokemonDex, 'spe')
    } as PokemonStats
  }

  private convertToStat(pokemonDex: PokemonDex, statId: string): PokemonStat {

    const base = pokemonDex.bs.get(statId);
    const ivs = 31;
    const evs = 0;

    return {
      base: base,
      ivs: ivs,
      evs: evs,
      total: this.calcStat(statId, 50, '', base, ivs, evs)
    } as PokemonStat;
  }

}
