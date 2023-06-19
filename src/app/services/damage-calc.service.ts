import { Injectable } from '@angular/core';
import { PokemonSet } from '../model/pokemon-set/pokemonSet';
import { Move, MoveCategory } from '../model/move/move';
import { Damage } from '../model/damage/damage';
import { PokemonStats } from '../model/pokemon-stats/pokemon-stats';
import { TypeEfectivenessService } from './type-efectiveness.service';
import { DamageInfo } from '../model/damage-info/damage-info';

@Injectable({
  providedIn: 'root'
})
export class DamageCalcService {

  constructor(private readonly typeEfectivenessService: TypeEfectivenessService) {
  }

  readonly STAB_MULTIPLIER: number = 1.5;
  readonly TERA_STAB_MULTIPLIER: number = 2;

  calcDamage(attacker: PokemonSet, defender: PokemonSet, move: Move): DamageInfo {

    if(move.category === MoveCategory.Status || move.bp === 0) {
      //Status move 0 damage
      return {
        damages: [{ hp: 0, percentatge:  0} as Damage],
        attackerBoost: 0,
        defenderBoost: 0,
        multipliers: [],
        crit: false
      } as DamageInfo;
    }

    let damages: Array<Damage> = [];

    const moveCategory: MoveCategory = this.resolveCategoryType(move, attacker);
    const moveType: string = this.resolveMoveType(move, attacker);

    let attack: number = moveCategory === MoveCategory.Special
      ? this.calcStatAfterBoost(attacker.stats.spa.total, attacker.stats.spa.boost)
      : this.calcStatAfterBoost(attacker.stats.atk.total, attacker.stats.atk.boost);

    //Move Multipliers
    if (move.multipliers && move.multipliers.length) {
      let finalMultiplier = 1;
      for (let i = 0; i < move.multipliers.length; i++) {
        if (move.multipliers[i].value !== 1 && (!move.multipliers[i].modificatorType || move.multipliers[i].modificatorType >= 1)) {
          finalMultiplier = finalMultiplier * move.multipliers[i].value;
        }
      }
      attack = Math.floor(attack * finalMultiplier);
    }

    const defense: number = moveCategory === MoveCategory.Special
      ? this.calcStatAfterBoost(defender.stats.spd.total, defender.stats.spd.boost)
      : this.calcStatAfterBoost(defender.stats.def.total, defender.stats.def.boost);

    let basePower = this.calcBasePower(attacker.level, move, attack, defense);

    //Crit
    if (move.crit) {
      basePower = Math.floor(basePower * 1.5);
    }

    //move multiplier TYPE 2
    if (move.multipliers && move.multipliers.length) {
      let finalMultiplier = 1;
      for (let i = 0; i < move.multipliers.length; i++) {
        if (move.multipliers[i].modificatorType === 2) {
          finalMultiplier = finalMultiplier * move.multipliers[i].value;
        }
      }
      basePower = Math.floor(basePower * finalMultiplier);
    }


    for (var i = 0; i < 16; i++) {

      let damage: number = Math.floor(basePower * (85 + i) / 100);

      //Resolve STAB
      if (attacker.type === moveType || attacker.type2 === moveType || (attacker.teraType === moveType && attacker.enabledTera)) {
        damage = this.round(damage * this.resolveStab(attacker, moveType));
      }
      //Type Effectiveness
      damage = Math.floor(damage * this.typeEfectivenessService.resolveEfectiveness(moveType, defender));

      //Min Damage Check
      damage = Math.max(1, damage);

      //Max Damage Check
      if (damage > 65535) {
        damage %= 65536;
      }
      damages.push({ hp: damage, percentatge: this.calcPercentatge(damage, defender.stats.hp.total) });
    }

    return {
      damages: damages,
      attackerBoost: (moveCategory === MoveCategory.Special ? attacker.stats.spa.boost : attacker.stats.atk.boost) || 0,
      defenderBoost: (moveCategory === MoveCategory.Special ? attacker.stats.spd.boost : attacker.stats.def.boost) || 0,
      multipliers: move.multipliers || [],
      crit: move.crit
    } as DamageInfo;
  }

  private calcBasePower(attackerLevel: number, move: Move, attack: number, defense: number): number {

    return Math.floor(Math.floor((Math.floor((2 * attackerLevel) / 5 + 2) * move.bp * attack) / defense) / 50 + 2);
  }

  private round(num: number): number {
    return (num % 1 > 0.5) ? Math.ceil(num) : Math.floor(num);
  }

  private calcPercentatge(damage: number, hp: number): number {

    return Number((damage * 100 / hp).toFixed(1));
  }

  private calcStatAfterBoost(stat: number, boost: number) {

    let boostMultiplier: number = 1;

    if (boost) {
      boostMultiplier = boost < 0
        ? Math.pow((2 + (-boost)) / 2, -1)
        : Math.pow((2 + boost) / 2, 1);
    }

    return this.round(stat * boostMultiplier);
  }

  private resolveStab(pokemon: PokemonSet, moveType:string): number {

    return pokemon.enabledTera && pokemon.teraType === moveType && (pokemon.type === moveType || pokemon.type2 === moveType)
      ? this.TERA_STAB_MULTIPLIER
      : this.STAB_MULTIPLIER;
  }

  private resolveMoveType(move: Move, attacker: PokemonSet): string {

    return move.name === 'Tera Blast' && attacker.enabledTera && attacker.teraType
    ? attacker.teraType
    : move.type;
  }

  private resolveCategoryType(move: Move, attacker: PokemonSet): MoveCategory {

    return move.name === 'Tera Blast' && attacker.enabledTera && attacker.teraType
    ? this.calcStatAfterBoost(attacker.stats.atk.total, attacker.stats.atk.boost) > this.calcStatAfterBoost(attacker.stats.spa.total, attacker.stats.spa.boost) ? MoveCategory.Physical : MoveCategory.Special 
    : move.category;
  }
}
