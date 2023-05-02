import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { PokemonSet } from 'src/app/model/pokemon-set/pokemonSet';
import { PokedexService } from 'src/app/services/pokedex.service';
import { PokemonDex } from 'src/app/model/pokemon-dex/pokemonDex';
import { PokemonStatsService } from 'src/app/services/pokemon-stats.service';
import { PokemonStats } from 'src/app/model/pokemon-stats/pokemon-stats';

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

  changeStats(pokemonStats: PokemonStats): void {
    this.pokemon.stats = pokemonStats;
    this.pokemonModified.emit(this.pokemon);
  }

}
