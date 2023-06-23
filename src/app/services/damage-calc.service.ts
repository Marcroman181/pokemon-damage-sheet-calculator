import { Injectable } from '@angular/core';
import { PokemonSet } from '../model/pokemon-set/pokemonSet';
import { Move, MoveCategory } from '../model/move/move';
import { Damage } from '../model/damage/damage';
import { PokemonStats } from '../model/pokemon-stats/pokemon-stats';
import { TypeEfectivenessService } from './type-efectiveness.service';
import { DamageInfo } from '../model/damage-info/damage-info';
import { Multiplier } from '../model/multiplier/multiplier';
import { ModsService } from './mods.service';

@Injectable({
  providedIn: 'root'
})
export class DamageCalcService {

  constructor(private readonly typeEfectivenessService: TypeEfectivenessService,
              private readonly modsService: ModsService) {
  }

  readonly STAB_MULTIPLIER: number = 1.5;
  readonly TERA_STAB_MULTIPLIER: number = 2;

  calcDamage(attacker: PokemonSet, defender: PokemonSet, move: Move): DamageInfo {

    const ruinMods = this.modsService.getRuinMods();
    console.log("CALCULATING");

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
      ? this.calcStatAfterBoost(attacker.stats.spa.total, attacker.stats.spa.boost, ruinMods.includes('Vessel of Ruin (-SAtk)'))
      : this.calcStatAfterBoost(attacker.stats.atk.total, attacker.stats.atk.boost, ruinMods.includes('Tablets of Ruin (-Atk)'));
    
    let finalMultiplierType1: number = 1; 

    //Move MultipliersType 1 (STATS)
    if (move.multipliers && move.multipliers.length) {
      for (let i = 0; i < move.multipliers.length; i++) {
        if (move.multipliers[i].value !== 1 && (!move.multipliers[i].modificatorType || move.multipliers[i].modificatorType === 1)) {
          finalMultiplierType1 = finalMultiplierType1 * move.multipliers[i].value;
        }
      }
    }

    attack = Math.floor(attack * finalMultiplierType1);

    const defense: number = moveCategory === MoveCategory.Special
      ? this.calcStatAfterBoost(defender.stats.spd.total, defender.stats.spd.boost, ruinMods.includes('Beads of Ruin (-SDef)'))
      : this.calcStatAfterBoost(defender.stats.def.total, defender.stats.def.boost, ruinMods.includes('Sword of Ruin (-Def)'));


    let baseDamage = this.calcBaseDamage(attacker.level, move, attack, defense);

    //move multiplier TYPE 2 

    /*if (move.multipliers && move.multipliers.length) {
      for (let i = 0; i < move.multipliers.length; i++) {
        if (move.multipliers[i].modificatorType === 2) {
          baseDamage = Math.floor(baseDamage * move.multipliers[i].value);
        }
      }
    }*/

    //move multiplier TYPE 3 target, weather
    //basePower = this.round(basePower * this.resolveFinalMultiplier(move, 3));
    if (move.multipliers && move.multipliers.length) {
      for (let i = 0; i < move.multipliers.length; i++) {
        if (move.multipliers[i].modificatorType === 3) {
          baseDamage = this.round(baseDamage * move.multipliers[i].value);
        }
      }
    }
    
    //Crit
    if (move.crit) {
      baseDamage = Math.floor(baseDamage * 1.5);
    }


    for (var i = 0; i < 16; i++) {

      let damage: number = Math.floor(baseDamage * (85 + i) / 100);

      //Resolve STAB
      if (attacker.type === moveType || attacker.type2 === moveType || (attacker.teraType === moveType && attacker.enabledTera)) {
        damage = this.round(damage * this.resolveStab(attacker, moveType));
      }
      //Type Effectiveness
      damage = Math.floor(damage * this.typeEfectivenessService.resolveEfectiveness(moveType, defender));

      //Multipliers Type 4
     /* if (move.multipliers && move.multipliers.length) {
        for (let i = 0; i < move.multipliers.length; i++) {
          if (move.multipliers[i].modificatorType === 4) {
            damage = this.round(damage * move.multipliers[i].value);
          }
        }
      }*/
      //Multipliers Type 4
      damage = this.round(damage * this.resolveFinalMultiplier(move, 4));

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

  private calcBaseDamage(attackerLevel: number, move: Move, attack: number, defense: number): number {

    let bp = this.round(move.bp * this.resolveFinalMultiplier(move, 2));

    let basePower = Math.floor((Math.floor((2 * attackerLevel) / 5 + 2) * bp * attack) / defense) / 50;

    return Math.floor(basePower + 2);
  }

  private round(num: number): number {
    return (num % 1 > 0.5) ? Math.ceil(num) : Math.floor(num);
  }

  private calcPercentatge(damage: number, hp: number): number {

    return Number((damage * 100 / hp).toFixed(1));
  }

  private calcStatAfterBoost(stat: number, boost: number, ruin: boolean) {

    let boostMultiplier: number = 1;
    let resultStat: number = stat;
    if (boost) {
      boostMultiplier = boost < 0
        ? Math.pow((2 + (-boost)) / 2, -1)
        : Math.pow((2 + boost) / 2, 1);
      resultStat = this.round(resultStat * boostMultiplier);
    }

    if(ruin) {
      resultStat = this.round(resultStat * 3/4);
    }

    return resultStat;
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
    ? this.calcStatAfterBoost(attacker.stats.atk.total, attacker.stats.atk.boost, false) > this.calcStatAfterBoost(attacker.stats.spa.total, attacker.stats.spa.boost, false) ? MoveCategory.Physical : MoveCategory.Special 
    : move.category;
  }

  private resolveFinalMultiplier(move: Move, type: number): number {

    var M = 1;
    if (move.multipliers && move.multipliers.length) {
      for (let i = 0; i < move.multipliers.length; i++) {
        if (move.multipliers[i].modificatorType === type) {
          
          M = Math.round(M * move.multipliers[i].value * 0x1000) / 0x1000;
        }
      }
    }
    return M;
  }
}