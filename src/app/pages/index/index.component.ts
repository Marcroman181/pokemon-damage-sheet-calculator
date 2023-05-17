import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { PokemonSet } from 'src/app/model/pokemon-set/pokemonSet';
import { MoveCategory } from 'src/app/model/move/move';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class IndexComponent implements OnInit {

  pokemon: PokemonSet;
  offensiveCalcs: boolean = false;

  ngOnInit(): void {
    this.pokemon = {
      setName: 'test',
      name: 'Sprigatito',
      level: 50,
      nature: 'Jolly',
      type: 'Grass',
      currentHp: 100,
      stats: {
        hp: {base: 40, ivs: 31, evs: 4},
        atk: {base: 61, ivs: 31, evs: 244},
        def: {base: 54, ivs: 31, evs: 4},
        spa: {base: 45, ivs: 0, evs: 0},
        spd: {base: 45, ivs: 31, evs: 4},
        spe: {base: 65, ivs: 31, evs: 252}
      },
      move1: {
        name: 'Flower Trick',
        bp: 105,
        type: 'Grass',
        category: MoveCategory.Physical
      },
      move2: {
        name: 'Knock Off',
        bp: 97.5,
        type: 'Dark',
        category: MoveCategory.Physical
      },
      move3: {
        name: 'Energy Ball',
        bp: 90,
        type: 'Grass',
        category: MoveCategory.Special
      },
      move4: {
        name: 'Dark Pulse',
        bp: 80,
        type: 'Dark',
        category: MoveCategory.Special
      }
    };
  }

  public modifyPokemon(pokemonModified: PokemonSet): void {
    
    this.pokemon = {...pokemonModified};
    this.ref.detectChanges();
    console.log(this.pokemon);
  }

  public setOffensivecalcs(offensiveCalcs: boolean): void {
    this.offensiveCalcs = offensiveCalcs;
    this.ref.detectChanges();
  }

  constructor(private ref: ChangeDetectorRef) {}

}
