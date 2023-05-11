import { Injectable } from '@angular/core';
import { PokemonSet } from '../model/pokemon-set/pokemonSet';
import { Move, MoveCategory } from '../model/move/move';
import { Damage } from '../model/damage/damage';
import { PokemonStats } from '../model/pokemon-stats/pokemon-stats';

@Injectable({
  providedIn: 'root'
})
export class DamageCalcService {

  calcDamage(attacker: PokemonSet, defender: PokemonSet, move: Move): Array<Damage> {

    let damages: Array<Damage> = [];

    let basePower = this.calcBasePower(attacker.level, move, attacker.stats, defender.stats);

    for (var i = 0; i < 16; i++) {

      let damage: number = Math.floor(basePower * (85 + i) / 100);

      //Resolve STAB
      if (attacker.type === move.type || attacker.type2 === move.type) {
        damage = this.round(damage * 1.5);
      }
      //Type Effectiveness
      damage = Math.floor(damage * 1);

      //Min Damage Check
      damage = Math.max(1, damage);

      //Max Damage Check
      if (damage > 65535) {
        damage %= 65536;
      }
      damages.push({ hp: damage, percentatge: damage * 100 / defender.stats.hp.total })
    }

    return damages;
  }

  private calcBasePower(attackerLevel: number, move: Move, attackerStats: PokemonStats, defenderStats: PokemonStats): number {

    const attack: number = move.category === MoveCategory.Special ? attackerStats.spa.total : attackerStats.atk.total; 

    const defense: number = move.category === MoveCategory.Special ? defenderStats.spd.total : defenderStats.def.total; 

    return Math.floor(Math.floor((Math.floor((2 * attackerLevel) / 5 + 2) * move.bp * attack) / defense) / 50 + 2);
  }

  private round(num: number): number {
    return (num % 1 > 0.5) ? Math.ceil(num) : Math.floor(num);
  }

}
