import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { PokemonSet } from 'src/app/model/pokemon-set/pokemonSet';
import { PokedexService } from 'src/app/services/pokedex.service';
import { PokemonDex } from 'src/app/model/pokemon-dex/pokemonDex';
import { PokemonStatsService } from 'src/app/services/pokemon-stats.service';
import { PokemonStats } from 'src/app/model/pokemon-stats/pokemon-stats';
import { Move } from 'src/app/model/move/move';
import { PokemonSetsService } from 'src/app/services/pokemon-sets.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'pokemon-card',
  templateUrl: './pokemon-card.component.html',
  styleUrls: ['./pokemon-card.component.scss']
})
export class PokemonCardComponent implements OnInit {

  @Input() initializePokemon: PokemonSet;
  @Output() pokemonModified: EventEmitter<PokemonSet> = new EventEmitter<PokemonSet>();

  pokedex: Map<string, PokemonDex> = new Map<string, PokemonDex>();
  pokedexSuggestions: Array<string> = [];

  pokemon: PokemonSet;
  pokemonSets: Map<string, PokemonSet> = new Map<string, PokemonSet>();
  pokemonSetsByPokemonName: Map<string, Array<string>> = new Map<string, Array<string>>();
  showModal: boolean = false;

  constructor(private readonly pokedexService: PokedexService,
    private readonly pokemonStatsService: PokemonStatsService,
    private readonly pokemonSetsService: PokemonSetsService,
    private readonly toast: ToastrService) {
  }

  ngOnInit(): void {
    this.pokedex = this.pokedexService.getAllPokemon();
    this.pokemonSets = this.pokemonSetsService.getAllPokemonSets();
    this.pokedexSuggestions = Array.from(this.pokedex.keys());
    this.pokemonSetsByPokemonName = this.groupUpSetsByPokemon();
    if (this.initializePokemon) {
      this.pokemon = this.initializePokemon;
    } else {
      const pokemonDex: PokemonDex = this.pokedex.values().next().value;
      this.pokemon = this.pokemonStatsService.convertPokemonDexToPokemonSet(pokemonDex);
      this.pokemonModified.emit(this.pokemon);
    }
  }

  selectPokemon(pokemon: string): void {

    const pokemonDex: PokemonDex = this.pokedex.get(pokemon);
    this.pokemon = {...this.pokemon, ...this.pokemonStatsService.convertPokemonDexToPokemonSet(pokemonDex)};
    this.pokemonModified.emit(this.pokemon);
  }

  selectPokemonSet(set: string): void {

    const pokemonSet = this.pokemonSets.get(set);
    this.pokemon = {...this.pokemon, ...this.pokemonStatsService.resolveStatsFromPokemonSet(pokemonSet)};
    this.pokemonModified.emit(this.pokemon);
  }

  selectLevel(level: number): void {
    this.pokemon.level = level;
    this.pokemon.stats = this.pokemonStatsService.resolvePokemonStatsByPokemonStats(this.pokemon.stats, level, this.pokemon.nature);
    this.pokemonModified.emit(this.pokemon);
  }

  selectType(type: string): void {
    this.pokemon.type = type;
    this.pokemonModified.emit(this.pokemon);
  }

  selectType2(type2: string): void {
    this.pokemon.type2 = type2;
    this.pokemonModified.emit(this.pokemon);
  }

  selectNature(nature: string): void {
    this.pokemon.nature = nature;
    this.pokemon.stats = this.pokemonStatsService.resolvePokemonStatsByPokemonStats(this.pokemon.stats, this.pokemon.level, nature);
    this.pokemonModified.emit(this.pokemon);
  }

  changeStats(pokemonStats: PokemonStats): void {
    this.pokemon.stats = this.pokemonStatsService.resolvePokemonStatsByPokemonStats(pokemonStats, this.pokemon.level, this.pokemon.nature);
    this.pokemonModified.emit(this.pokemon);
  }

  selectMove(index: number, move: Move): void {
    if (index === 1) {
      this.pokemon.move1 = move;
    }
    if (index === 2) {
      this.pokemon.move2 = move;
    }
    if (index === 3) {
      this.pokemon.move3 = move;
    }
    if (index === 4) {
      this.pokemon.move4 = move;
    }
    this.pokemonModified.emit(this.pokemon);
  }

  private groupUpSetsByPokemon(): Map<string, Array<string>> {

    let values = new Map<string, Array<string>>();

    Array.from(this.pokemonSets.values())
    .forEach((set: PokemonSet) => values.set(set.name, this.getSetsByPokemon(values, set.setName, set.name)))

    return values;
  }

  private getSetsByPokemon(values: Map<string, Array<string>>, setName: string, pokemonName: string): Array<string> {

    return values.has(pokemonName)
      ? [...values.get(pokemonName), setName]
      : [setName];
  }

  showSaveModal(): void {
    this.showModal = true;
  }

  closeModal(): void {
    this.showModal = false;
  }

  saveSet(setName: string): void {
    this.pokemonSetsService.saveSet({...this.pokemon, setName: this.pokemon.name + ' ' + setName});
    this.showModal = false;
    this.toast.success('Pokemon Set saved');
  }

}
