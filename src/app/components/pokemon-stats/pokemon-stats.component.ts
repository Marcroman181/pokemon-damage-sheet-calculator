import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { Subject, takeUntil } from 'rxjs';
import { PokemonDex } from 'src/app/model/pokemon-dex/pokemonDex';
import { PokemonStat } from 'src/app/model/pokemon-stat/pokemon-stat';
import { PokemonStats } from 'src/app/model/pokemon-stats/pokemon-stats';
import { PokemonStatsService } from 'src/app/services/pokemon-stats.service';

@Component({
  selector: 'pokemon-stats',
  templateUrl: './pokemon-stats.component.html',
  styleUrls: ['./pokemon-stats.component.scss']
})
export class PokemonStatsComponent implements OnInit, OnChanges {


  @Input() pokemon: PokemonDex;
  @Output() stats: EventEmitter<PokemonStats> = new EventEmitter<PokemonStats>();

  private readonly unsubscribe: Subject<void> = new Subject();
  form: FormGroup;

  displayedColumns = ["stat", "base", "ivs", "evs", "total"];
  dataSource: MatTableDataSource<any> = new MatTableDataSource();

  constructor(private readonly pokemonStatsService: PokemonStatsService,
    private readonly fb: FormBuilder) {
  }

  ngOnInit(): void {

    this.dataSource.data = [
      { id: "hp", stat: "HP", total: 100 },
      { id: "atk", stat: "Attack", total: 100 },
      { id: "def", stat: "Defense", total: 100 },
      { id: "spa", stat: "Sp. Atk", total: 100 },
      { id: "spd", stat: "Sp. Def", total: 100 },
      { id: "spe", stat: "Speed", total: 100 }
    ];

    this.initializeFormWithDex(this.pokemon);
    this.subscribePokemon();
  }

  ngOnChanges(): void {
    if(this.form) {
      this.setFormWithDex(this.pokemon);
    }
  }

  initializeFormWithDex(pokemon: PokemonDex): void {
    console.log("POKEMON CARD -> INITILIAZE WITH DEX");

    this.form = this.fb.group({
      hpBase: pokemon.bs.get("hp"),
      hpIVs: 31,
      hpEVs: 0,
      atkBase: pokemon.bs.get("atk"),
      atkIVs: 31,
      atkEVs: 0,
      defBase: pokemon.bs.get("def"),
      defIVs: 31,
      defEVs: 0,
      spaBase: pokemon.bs.get("spa"),
      spaIVs: 31,
      spaEVs: 0,
      spdBase: pokemon.bs.get("spd"),
      spdIVs: 31,
      spdEVs: 0,
      speBase: pokemon.bs.get("spe"),
      speIVs: 31,
      speEVs: 0
    });

    this.updateStats(this.form.value);
  }

  setFormWithDex(pokemon: PokemonDex): void {
    console.log("POKEMON CARD -> INITILIAZE WITH DEX");

    this.form.setValue({
      hpBase: pokemon.bs.get("hp"),
      hpIVs: 31,//pokemon.stats.hp.ivs,
      hpEVs: 0, //pokemon.stats.hp.evs,
      atkBase: pokemon.bs.get("atk"),
      atkIVs: 31, //pokemon.stats.atk.ivs,
      atkEVs: 0, //pokemon.stats.atk.evs,
      defBase: pokemon.bs.get("def"),
      defIVs: 31,//pokemon.stats.def.ivs,
      defEVs: 0, //pokemon.stats.def.evs,
      spaBase: pokemon.bs.get("spa"),
      spaIVs: 31, //pokemon.stats.spa.ivs,
      spaEVs: 0, //pokemon.stats.spa.evs,
      spdBase: pokemon.bs.get("spd"),
      spdIVs: 31, //pokemon.stats.spd.ivs,
      spdEVs: 0, //pokemon.stats.spd.evs,
      speBase: pokemon.bs.get("spe"),
      speIVs: 31, //pokemon.stats.spe.ivs,
      speEVs: 0 //pokemon.stats.spe.evs,
    });

    this.updateStats(this.form.value);
  }

  private subscribePokemon(): void {

    this.form.valueChanges
      .pipe(takeUntil(this.unsubscribe))
      .subscribe(dataForm => this.updateStats(dataForm))
  }

  private updateStats(dataForm: any): void {
    console.log("Pokemon Card -> update");

    const stats: PokemonStats = this.resolvePokemonStats(dataForm);

    this.dataSource.data[0].total = stats.hp.total;
    this.dataSource.data[1].total = stats.atk.total;
    this.dataSource.data[2].total = stats.def.total;
    this.dataSource.data[3].total = stats.spa.total;
    this.dataSource.data[4].total = stats.spd.total;
    this.dataSource.data[5].total = stats.spe.total;

    this.stats.emit(stats);
  }

  private convertToStat(dataForm: any, statId: string): PokemonStat {

    const base = dataForm[statId + 'Base'];
    const ivs = dataForm[statId + 'IVs'];
    const evs = dataForm[statId + 'EVs'];

    return {
      base: base,
      ivs: ivs,
      evs: evs,
      total: this.pokemonStatsService.calcStat(statId, 50, base, ivs, evs)
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
