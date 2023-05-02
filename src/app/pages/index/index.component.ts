import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import { PokemonSet } from 'src/app/model/pokemon-set/pokemonSet';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class IndexComponent {

  pokemon: PokemonSet = {
    name: 'Bulbasaur',
    level: 50,
    stats: {
      hp: {
        base: 60,
        ivs: 31,
        evs: 0,
        total: 100
      },
      atk: {
        base: 70,
        ivs: 31,
        evs: 0,
        total: 120
      },
      def: {
        base: 40,
        ivs: 31,
        evs: 0,
        total: 200
      },
      spa: {
        base: 100,
        ivs: 31,
        evs: 0,
        total: 105
      },
      spd: {
        base: 80,
        ivs: 31,
        evs: 0,
        total: 90
      },
      spe: {
        base: 10,
        ivs: 31,
        evs: 0,
        total: 60
      }
    },
    nature: "Modest",
    type: "Grass",
    type2: "Poison",
    currentHp: 60
  }

  public modifyPokemon(pokemonModified: PokemonSet): void {
    this.pokemon = pokemonModified;
    this.ref.detectChanges();
  }

  constructor(private ref: ChangeDetectorRef) {}

}
