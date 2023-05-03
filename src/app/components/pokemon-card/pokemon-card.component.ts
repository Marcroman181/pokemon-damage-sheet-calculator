import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { PokemonSet } from 'src/app/model/pokemon-set/pokemonSet';
import { PokedexService } from 'src/app/services/pokedex.service';
import { PokemonDex } from 'src/app/model/pokemon-dex/pokemonDex';
import { PokemonStatsService } from 'src/app/services/pokemon-stats.service';
import { PokemonStats } from 'src/app/model/pokemon-stats/pokemon-stats';
import { Move } from 'src/app/model/move/move';

@Component({
  selector: 'pokemon-card',
  templateUrl: './pokemon-card.component.html',
  styleUrls: ['./pokemon-card.component.scss']
})
export class PokemonCardComponent implements OnInit {

  @Output() pokemonModified: EventEmitter<PokemonSet> = new EventEmitter<PokemonSet>();

  pokedex: Map<string, PokemonDex> = new Map<string, PokemonDex>();
  pokedexSuggestions: Array<string> = [];

  pokemon: PokemonSet;
  pokemonDex: PokemonDex;

  constructor(private readonly pokedexService: PokedexService,
    private readonly pokemonStatsService: PokemonStatsService) {
  }

  ngOnInit(): void {
    this.pokedex = this.pokedexService.getAllPokemon();
    this.pokedexSuggestions = Array.from(this.pokedex.keys());
    this.pokemonDex = this.pokedex.values().next().value;
    this.pokemon = this.pokemonStatsService.convertPokemonDexToPokemonSet(this.pokemonDex);
  }

  selectPokemon(pokemon: string): void {

    this.pokemonDex = this.pokedex.get(pokemon);
    this.pokemon = this.pokemonStatsService.convertPokemonDexToPokemonSet(this.pokemonDex);
    this.pokemonModified.emit(this.pokemon);
  }

  selectLevel(level: number): void {
    this.pokemon.level = level;
   // this.pokemonModified.emit(this.pokemon);
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
  //  this.pokemonModified.emit(this.pokemon);
  }

  changeStats(pokemonStats: PokemonStats): void {
    this.pokemon.stats = pokemonStats;
    this.pokemonModified.emit(this.pokemon);
  }

  selectMove(index: number, move: Move): void {
    if(index === 1) {
      this.pokemon.move1 = move;
    }
    if(index === 2) {
      this.pokemon.move2 = move;
    }
    if(index === 3) {
      this.pokemon.move3 = move;
    }
    if(index === 4) {
      this.pokemon.move4 = move;
    }
    this.pokemonModified.emit(this.pokemon);
  }

}
