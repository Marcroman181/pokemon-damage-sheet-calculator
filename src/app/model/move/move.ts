
export class Move {
    name: string;
    bp: number;
    type: string;
    category: MoveCategory;
}

enum MoveCategory {
    Physical,
    Special,
}
