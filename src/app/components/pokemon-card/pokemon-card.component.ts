import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { takeUntil } from 'rxjs';
import { Subject } from 'rxjs/internal/Subject';
import { PokemonStat } from 'src/app/model/pokemon-stat/pokemon-stat';
import { PokemonStats } from 'src/app/model/pokemon-stats/pokemon-stats';
import { PokemonSet } from 'src/app/model/pokemon-set/pokemonSet';
import { PokedexService } from 'src/app/services/pokedex.service';
import { PokemonDex } from 'src/app/model/pokemon-dex/pokemonDex';

@Component({
  selector: 'pokemon-card',
  templateUrl: './pokemon-card.component.html',
  styleUrls: ['./pokemon-card.component.scss']
})
export class PokemonCardComponent implements OnInit {

  @Output() pokemonModified: EventEmitter<PokemonSet> = new EventEmitter<PokemonSet>();

  private readonly unsubscribe: Subject<void> = new Subject();
  form: FormGroup;

  displayedColumns = ["stat", "base", "ivs", "evs", "total"];
  dataSource: MatTableDataSource<any> = new MatTableDataSource();
  pokedex: Map<string, PokemonDex> = new Map<string, PokemonDex>();
  pokedexSuggestions: Array<string> = [];

  pokemon: PokemonSet;

  constructor(private readonly fb: FormBuilder,
    private readonly pokedexService: PokedexService) {
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

    this.pokedex = this.pokedexService.getAllPokemon();
    this.pokedexSuggestions = Array.from(this.pokedex.keys());
    console.log(this.pokedex);
    this.initializeFormWithDex(this.pokedex.values().next().value);
    this.subscribePokemon();
  }

  setForm(pokemon: PokemonSet): void {
    console.log("POKEMON CARD -> INITILIAZE");

    this.form.setValue({
      level: pokemon.level,
      hpBase: pokemon.stats.hp.base,
      hpIVs: pokemon.stats.hp.ivs,
      hpEVs: pokemon.stats.hp.evs,
      atkBase: pokemon.stats.atk.base,
      atkIVs: pokemon.stats.atk.ivs,
      atkEVs: pokemon.stats.atk.evs,
      defBase: pokemon.stats.def.base,
      defIVs: pokemon.stats.def.ivs,
      defEVs: pokemon.stats.def.evs,
      spaBase: pokemon.stats.spa.base,
      spaIVs: pokemon.stats.spa.ivs,
      spaEVs: pokemon.stats.spa.evs,
      spdBase: pokemon.stats.spd.base,
      spdIVs: pokemon.stats.spd.ivs,
      spdEVs: pokemon.stats.spd.evs,
      speBase: pokemon.stats.spe.base,
      speIVs: pokemon.stats.spe.ivs,
      speEVs: pokemon.stats.spe.evs,
    });
    this.pokemon = this.convertToPokemon(this.form.value);
    this.updatePokemon();

  }

  initializeFormWithDex(pokemon: PokemonDex): void {
    console.log("POKEMON CARD -> INITILIAZE WITH DEX");

    this.form = this.fb.group({
      level: 50,
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

    this.pokemon = this.convertToPokemon(this.form.value);
    this.updatePokemon();
    this.pokemon.name = pokemon.name;
  }

  setFormWithDex(pokemon: PokemonDex): void {
    console.log("POKEMON CARD -> INITILIAZE WITH DEX");

    this.form.setValue({
      level: 50, //pokemon.level,
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

    this.pokemon = this.convertToPokemon(this.form.value);
    this.updatePokemon();
    this.pokemon.name = pokemon.name;
  }

  private subscribePokemon(): void {

    this.form.valueChanges
      .pipe(takeUntil(this.unsubscribe))
      .subscribe(dataForm => {
        console.log("POKEMON CARD -> MODIFIED");
        this.pokemon = this.convertToPokemon(dataForm);
        this.updatePokemon();
        this.pokemonModified.emit(this.pokemon);
      })
  }

  private updatePokemon(): void {
    console.log("Pokemon Card -> update");

    this.dataSource.data[0].total = this.pokemon.stats.hp.total;
    this.dataSource.data[1].total = this.pokemon.stats.atk.total;
    this.dataSource.data[2].total = this.pokemon.stats.def.total;
    this.dataSource.data[3].total = this.pokemon.stats.spa.total;
    this.dataSource.data[4].total = this.pokemon.stats.spd.total;
    this.dataSource.data[5].total = this.pokemon.stats.spe.total;
  }

  private convertToPokemon(dataForm: any): PokemonSet {

    return {
      name: this.pokemon ? this.pokemon.name : '',
      level: dataForm.level,
      stats: {
        hp: this.convertToStat(dataForm, 'hp'),
        atk: this.convertToStat(dataForm, 'atk'),
        def: this.convertToStat(dataForm, 'def'),
        spa: this.convertToStat(dataForm, 'spa'),
        spd: this.convertToStat(dataForm, 'spd'),
        spe: this.convertToStat(dataForm, 'spe')
      } as PokemonStats,
      nature: this.pokemon ? this.pokemon.nature : '',
      type: this.pokemon ? this.pokemon.type : '',
      type2: this.pokemon ? this.pokemon.type2 : '',
      currentHp: 100,
      move1: this.pokemon ? this.pokemon.move1 : '',
      move2: this.pokemon ? this.pokemon.move2 : '',
      move3: this.pokemon ? this.pokemon.move3 : '',
      move4: this.pokemon ? this.pokemon.move4 : ''
    } as PokemonSet;
  }

  private convertToStat(dataForm: any, statId: string): PokemonStat {

    const base = dataForm[statId + 'Base'];
    const ivs = dataForm[statId + 'IVs'];
    const evs = dataForm[statId + 'EVs'];


    return {
      base: base,
      ivs: ivs,
      evs: evs,
      total: this.calcStat(statId, dataForm.level, base, ivs, evs)
    } as PokemonStat;
  }

  private calcStat(id: string, level: number, base: number, ivs: number, evs: number): number {

    if (id === 'hp') {
      return this.calcStatHP(level, base, ivs, evs);
    }

    const nature: number = 1;

    return Math.floor(
      (Math.floor(
        (base * 2 + ivs + Math.floor(evs / 4)) * level / 100)
        + 5)
      * nature);
  }

  private calcStatHP(level: number, base: number, ivs: number, evs: number): number {

    return Math.floor((base * 2 + ivs + Math.floor(evs / 4)) * level / 100) + level + 10;
  }

  selectPokemon(pokemon: string): void {

    this.setFormWithDex(this.pokedex.get(pokemon));
  }

}
