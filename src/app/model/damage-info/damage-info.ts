import { Damage } from "../damage/damage";
import { Multiplier } from "../multiplier/multiplier";

export class DamageInfo {
    damages: Array<Damage>;
    attackerBoost: number;
    defenderBoost: number;
    multipliers: Array<Multiplier>;
}