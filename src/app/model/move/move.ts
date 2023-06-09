import { Multiplier } from "../multiplier/multiplier";

export class Move {
    name: string;
    bp: number;
    type: string;
    category: MoveCategory;
    multipliers?: Array<Multiplier>;
    crit: boolean;
}

export enum MoveCategory {
    Physical = 'Physical',
    Special = 'Special',
    Status = 'Status'
}
