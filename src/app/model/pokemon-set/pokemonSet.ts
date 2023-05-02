import { PokemonStats } from "../pokemon-stats/pokemon-stats";

export class PokemonSet {
    setName?: string
    name: string;
    level: number;
    stats: PokemonStats;
    nature: string; //TODO enum
    type: string; //TODO enum?
    type2?: string; // TODO enum?
    currentHp: number;
    move1?: string;
    move2?: string;
    move3?: string;
    move4?: string;
}
