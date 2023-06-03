import { ChangeDetectionStrategy, Component, Input, OnChanges } from '@angular/core';
import { DamageInfo } from 'src/app/model/damage-info/damage-info';
import { Damage } from 'src/app/model/damage/damage';
import { Move, MoveCategory } from 'src/app/model/move/move';
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

  damageInfo: DamageInfo;
  min: number = 0;
  max: number = 100;
  infoText: string = '';
  color: string = '';

  constructor(private readonly damageCalcService: DamageCalcService) {
  }

  ngOnChanges(): void {
    this.damageInfo = this.damageCalcService.calcDamage(this.pokemon, this.oponnentPokemon, this.move);
    this.min = this.damageInfo.damages[0].percentatge;
    this.max = this.damageInfo.damages[this.damageInfo.damages.length - 1].percentatge;
    this.infoText = '';
    if(this.damageInfo.attackerBoost != 0) {
      this.infoText += this.damageInfo.attackerBoost > 0 
      ? '+' 
      : '';
      this.infoText += this.damageInfo.attackerBoost.toString();
      this.infoText += this.move.category === MoveCategory.Physical 
      ? ' Atk '
      : ' SpAtk ';
    }
    this.damageInfo.damages
      .forEach((damage: Damage) => this.infoText += damage.hp + ' / ');

    this.resolveColor();
  }

  private resolveColor(): void {

    if(this.max < 25) {
      this.color = 'bg-light-blue';
    } else if(this.max < 50) {
      this.color = 'bg-green';
    } else if(this.max < 75) {
      this.color = 'bg-yellow';
    } else if(this.max < 100) {
      this.color = 'bg-orange';
    } else {
      this.color = 'bg-red';
    }
  
  }

}
