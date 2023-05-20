import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { PokemonSet } from 'src/app/model/pokemon-set/pokemonSet';
import { MoveCategory } from 'src/app/model/move/move';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class IndexComponent {

  pokemon: PokemonSet;
  offensiveCalcs: boolean = false;

  public modifyPokemon(pokemonModified: PokemonSet): void {
    
    this.pokemon = {...pokemonModified};
    this.ref.detectChanges();
    console.log(this.pokemon);
  }

  public setOffensivecalcs(offensiveCalcs: boolean): void {
    this.offensiveCalcs = offensiveCalcs;
    this.ref.detectChanges();
  }

  constructor(private ref: ChangeDetectorRef) {}

}
