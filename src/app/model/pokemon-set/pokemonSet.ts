import { Move } from "../move/move";
import { PokemonStats } from "../pokemon-stats/pokemon-stats";

export class PokemonSet {
    id?: number;
    setName?: string
    name: string;
    level: number;
    stats: PokemonStats;
    nature: string; //TODO enum
    type: string; //TODO enum?
    type2?: string; // TODO enum?
    currentHp: number;
    move1?: Move;
    move2?: Move;
    move3?: Move;
    move4?: Move;
}
