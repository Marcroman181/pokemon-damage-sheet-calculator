import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import { PokemonSet } from 'src/app/model/pokemon-set/pokemonSet';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class IndexComponent {

  pokemon: PokemonSet;

  public modifyPokemon(pokemonModified: PokemonSet): void {
    this.pokemon = pokemonModified;
    this.ref.detectChanges();
    console.log(this.pokemon);
  }

  constructor(private ref: ChangeDetectorRef) {}

}
