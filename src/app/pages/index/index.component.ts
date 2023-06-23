import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import { PokemonSet } from 'src/app/model/pokemon-set/pokemonSet';
import { ModsService } from 'src/app/services/mods.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class IndexComponent {

  pokemon: PokemonSet;
  offensiveCalcs: boolean = false;
  ruinMods: Array<string> = [];

  public modifyPokemon(pokemonModified: PokemonSet): void {

    this.pokemon = { ...pokemonModified };
    this.ref.detectChanges();
    console.log(this.pokemon);
  }

  public setOffensivecalcs(offensiveCalcs: boolean): void {
    this.offensiveCalcs = offensiveCalcs;
    this.ref.detectChanges();
  }

  public setRuinMod(ruin: string): void {
    if (this.ruinMods.includes(ruin)) {
      this.ruinMods = [...this.ruinMods.filter((ruinMod: string) => ruinMod !== ruin)];
    } else {
      this.ruinMods.push(ruin);
    }
    this.modsService.setRuinMods(this.ruinMods);
    this.ref.detectChanges();
  }

  constructor(private ref: ChangeDetectorRef,
              private readonly modsService: ModsService) { }

}
