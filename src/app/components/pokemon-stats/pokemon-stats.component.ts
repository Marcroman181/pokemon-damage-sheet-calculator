import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import { PokemonStat } from 'src/app/model/pokemon-stat/pokemon-stat';
import { PokemonStats } from 'src/app/model/pokemon-stats/pokemon-stats';
import { PokemonStatsService } from 'src/app/services/pokemon-stats.service';

@Component({
  selector: 'pokemon-stats',
  templateUrl: './pokemon-stats.component.html',
  styleUrls: ['./pokemon-stats.component.scss']
})
export class PokemonStatsComponent implements OnInit, OnChanges {


  @Input() pokemonStats: PokemonStats;
  @Input() pokemonName: string;
  @Input() level: number;
  @Input() nature: string;

  @Output() changeStats: EventEmitter<PokemonStats> = new EventEmitter<PokemonStats>();

  private readonly unsubscribe: Subject<void> = new Subject();
  form: FormGroup;

  constructor(private readonly pokemonStatsService: PokemonStatsService,
    private readonly fb: FormBuilder) {
  }

  ngOnInit(): void {
    this.initializeFormWithStats();
    this.subscribePokemon();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.form) {
      if (changes["pokemonName"]) {
        this.setForm();
        console.log("POKEMON STATS --> CHANGES");
      }
      if (this.form && (changes["nature"] || changes["level"])) {
        this.updateStats(this.form.value);
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
      defBase: this.pokemonStats.def.base,
      defIVs: this.pokemonStats.def.ivs,
      defEVs: this.pokemonStats.def.evs,
      spaBase: this.pokemonStats.spa.base,
      spaIVs: this.pokemonStats.spa.ivs,
      spaEVs: this.pokemonStats.spa.evs,
      spdBase: this.pokemonStats.spd.base,
      spdIVs: this.pokemonStats.spd.ivs,
      spdEVs: this.pokemonStats.spd.evs,
      speBase: this.pokemonStats.spe.base,
      speIVs: this.pokemonStats.spe.ivs,
      speEVs: this.pokemonStats.spe.evs
    });

    this.updateStats(this.form.value);
  }

  setForm(): void {

    this.form.setValue({
      hpBase: this.pokemonStats.hp.base,
      hpIVs: this.pokemonStats.hp.ivs,
      hpEVs: this.pokemonStats.hp.evs,
      atkBase: this.pokemonStats.atk.base,
      atkIVs: this.pokemonStats.atk.ivs,
      atkEVs: this.pokemonStats.atk.evs,
      defBase: this.pokemonStats.def.base,
      defIVs: this.pokemonStats.def.ivs,
      defEVs: this.pokemonStats.def.evs,
      spaBase: this.pokemonStats.spa.base,
      spaIVs: this.pokemonStats.spa.ivs,
      spaEVs: this.pokemonStats.spa.evs,
      spdBase: this.pokemonStats.spd.base,
      spdIVs: this.pokemonStats.spd.ivs,
      spdEVs: this.pokemonStats.spd.evs,
      speBase: this.pokemonStats.spe.base,
      speIVs: this.pokemonStats.spe.ivs,
      speEVs: this.pokemonStats.spe.evs
    });
  }

  private subscribePokemon(): void {

    this.form.valueChanges
      .pipe(takeUntil(this.unsubscribe))
      .subscribe(dataForm => this.updateStats(dataForm))
  }

  private updateStats(dataForm: any): void {
    console.log("Pokemon Stats -> update");

    const stats: PokemonStats = this.resolvePokemonStats(dataForm);

    this.changeStats.emit(stats);
  }

  private convertToStat(dataForm: any, statId: string): PokemonStat {

    const base = dataForm[statId + 'Base'];
    const ivs = dataForm[statId + 'IVs'];
    const evs = dataForm[statId + 'EVs'];

    return {
      base: base,
      ivs: ivs,
      evs: evs,
      total: this.pokemonStatsService.calcStat(statId, this.level, this.nature, base, ivs, evs)
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
}
