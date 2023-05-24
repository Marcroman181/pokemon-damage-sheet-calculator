import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import { PokemonStat } from 'src/app/model/pokemon-stat/pokemon-stat';
import { PokemonStats } from 'src/app/model/pokemon-stats/pokemon-stats';

@Component({
  selector: 'pokemon-stats',
  templateUrl: './pokemon-stats.component.html',
  styleUrls: ['./pokemon-stats.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PokemonStatsComponent implements OnInit, OnChanges {


  @Input() pokemonStats: PokemonStats;

  @Output() changeStats: EventEmitter<PokemonStats> = new EventEmitter<PokemonStats>();

  private readonly unsubscribe: Subject<void> = new Subject();
  form: FormGroup;
  totalEvs: number = 0;
  remainingEvs: number = 510;
  boosts: Array<number> = [6,5,4,3,2,1,0,-1,-2,-3,-4,-5,-6];

  constructor(private readonly fb: FormBuilder) {
  }

  ngOnInit(): void {
    this.initializeFormWithStats();
    this.subscribePokemon();
    this.updateTotalEvs();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.form) {
      if (changes["pokemonStats"]) {
        this.setForm();
        this.updateTotalEvs();
        console.log("POKEMON STATS --> CHANGES");
      } 
    }
  }

  initializeFormWithStats(): void {

    this.form = this.fb.group({
      hpBase: this.pokemonStats.hp.base,
      hpIVs: this.pokemonStats.hp.ivs,
      hpEVs: this.pokemonStats.hp.evs,
      atkBase: this.pokemonStats.atk.base,
      atkIVs: this.pokemonStats.atk.ivs,
      atkEVs: this.pokemonStats.atk.evs,
      atkBoost: this.pokemonStats.atk.boost || 0,
      defBase: this.pokemonStats.def.base,
      defIVs: this.pokemonStats.def.ivs,
      defEVs: this.pokemonStats.def.evs,
      defBoost: this.pokemonStats.def.boost || 0,
      spaBase: this.pokemonStats.spa.base,
      spaIVs: this.pokemonStats.spa.ivs,
      spaEVs: this.pokemonStats.spa.evs,
      spaBoost: this.pokemonStats.spa.boost || 0,
      spdBase: this.pokemonStats.spd.base,
      spdIVs: this.pokemonStats.spd.ivs,
      spdEVs: this.pokemonStats.spd.evs,
      spdBoost: this.pokemonStats.spd.boost || 0,
      speBase: this.pokemonStats.spe.base,
      speIVs: this.pokemonStats.spe.ivs,
      speEVs: this.pokemonStats.spe.evs,
      speBoost: this.pokemonStats.spe.boost || 0
    });
  }

  setForm(): void {

    this.form.setValue({
      hpBase: this.pokemonStats.hp.base,
      hpIVs: this.pokemonStats.hp.ivs,
      hpEVs: this.pokemonStats.hp.evs,
      atkBase: this.pokemonStats.atk.base,
      atkIVs: this.pokemonStats.atk.ivs,
      atkEVs: this.pokemonStats.atk.evs,
      atkBoost: this.pokemonStats.atk.boost || 0,
      defBase: this.pokemonStats.def.base,
      defIVs: this.pokemonStats.def.ivs,
      defEVs: this.pokemonStats.def.evs,
      defBoost: this.pokemonStats.def.boost || 0,
      spaBase: this.pokemonStats.spa.base,
      spaIVs: this.pokemonStats.spa.ivs,
      spaEVs: this.pokemonStats.spa.evs,
      spaBoost: this.pokemonStats.spa.boost || 0,
      spdBase: this.pokemonStats.spd.base,
      spdIVs: this.pokemonStats.spd.ivs,
      spdEVs: this.pokemonStats.spd.evs,
      spdBoost: this.pokemonStats.spd.boost || 0,
      speBase: this.pokemonStats.spe.base,
      speIVs: this.pokemonStats.spe.ivs,
      speEVs: this.pokemonStats.spe.evs,
      speBoost: this.pokemonStats.spe.boost || 0
    }, 
    {emitEvent: false});
  }

  private subscribePokemon(): void {

    this.form.valueChanges
      .pipe(takeUntil(this.unsubscribe))
      .subscribe(dataForm => this.updateStats(dataForm))
  }

  private updateStats(dataForm: any): void {

    const stats: PokemonStats = this.resolvePokemonStats(dataForm);

    this.changeStats.emit(stats);
  }

  private convertToStat(dataForm: any, statId: string): PokemonStat {

    const base: number = dataForm[statId + 'Base'];
    const ivs: number = dataForm[statId + 'IVs'];
    const evs: number = dataForm[statId + 'EVs'];
    const boost: number = Number(dataForm[statId + 'Boost']) || 0;

    return {
      base: base,
      ivs: ivs,
      evs: evs,
      boost: boost
    } as PokemonStat;
  }

  private resolvePokemonStats(dataForm: any): PokemonStats {
    return {
      hp: this.convertToStat(dataForm, 'hp'),
      atk: this.convertToStat(dataForm, 'atk'),
      def: this.convertToStat(dataForm, 'def'),
      spa: this.convertToStat(dataForm, 'spa'),
      spd: this.convertToStat(dataForm, 'spd'),
      spe: this.convertToStat(dataForm, 'spe')
    } as PokemonStats
  }

  private updateTotalEvs(): void {
    let evs: number = 0;

    evs += this.pokemonStats.hp.evs;
    evs += this.pokemonStats.atk.evs;
    evs += this.pokemonStats.def.evs;
    evs += this.pokemonStats.spa.evs;
    evs += this.pokemonStats.spd.evs;
    evs += this.pokemonStats.spe.evs;

    this.totalEvs = evs;
    this.remainingEvs = 510 - this.totalEvs;
  }
}
