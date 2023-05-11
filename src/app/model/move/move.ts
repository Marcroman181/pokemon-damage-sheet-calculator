
export class Move {
    name: string;
    bp: number;
    type: string;
    category: MoveCategory;
}

export enum MoveCategory {
    Physical = 'Physical',
    Special = 'Special'
}
