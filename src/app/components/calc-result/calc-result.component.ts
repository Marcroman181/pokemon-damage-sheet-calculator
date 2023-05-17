import { ChangeDetectionStrategy, Component, Input, OnChanges } from '@angular/core';
import { Damage } from 'src/app/model/damage/damage';
import { Move } from 'src/app/model/move/move';
import { PokemonSet } from 'src/app/model/pokemon-set/pokemonSet';
import { DamageCalcService } from 'src/app/services/damage-calc.service';

@Component({
  selector: 'calc-result',
  templateUrl: './calc-result.component.html',
  styleUrls: ['./calc-result.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CalcResultComponent implements OnChanges {

  @Input() oponnentPokemon: PokemonSet;
  @Input() pokemon: PokemonSet;
  @Input() move: Move;
  @Input() offensiveCalcs: boolean = false;

  damages: Array<Damage> = [];
  min: number = 0;
  max: number = 100;
  infoText: string = '';

  constructor(private readonly damageCalcService: DamageCalcService) {
  }

  ngOnChanges(): void {
    this.damages = this.damageCalcService.calcDamage(this.pokemon, this.oponnentPokemon, this.move);
    this.min = this.damages[0].percentatge;
    this.max = this.damages[this.damages.length - 1].percentatge;
    this.damages
      .forEach((damage: Damage) => this.infoText += damage.hp + ' / ');
  }

}
