import { ChangeDetectorRef, Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { PokemonSet } from 'src/app/model/pokemon-set/pokemonSet';
import { PokemonTeamService } from 'src/app/services/pokemon-team.service';

@Component({
  selector: 'team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.scss']
})
export class TeamComponent implements OnInit {

  @Output() activePokemon: EventEmitter<PokemonSet> = new EventEmitter<PokemonSet>();

  active: number = 0;
  pokemons: Array<PokemonSet> = [];

  showExportTeamModal:boolean = false;
  showImportTeamModal:boolean = false;

  constructor( private readonly ref: ChangeDetectorRef,
    private readonly teamService: PokemonTeamService,
    private readonly toast: ToastrService) { }

  ngOnInit(): void {
    let team: Array<PokemonSet> = this.teamService.getTeam();
    if (team && team.length) {
      this.pokemons = team;
      this.activePokemon.emit(this.pokemons[this.active]);
    } else {
      this.pokemons.push(undefined);
    }
  }

  onActiveTab(index: number): void {
    this.active = index;
    this.activePokemon.emit(this.pokemons[index]);
  }

  addPokemon(): void {
    this.active = this.pokemons.length;
    this.pokemons.push(undefined);
  }

  modifyPokemon(pokemonModified: PokemonSet) {
    this.pokemons[this.active] = pokemonModified;
    this.activePokemon.emit(pokemonModified);
    this.ref.detectChanges();
  }

  deletePokemon(index: number): void {
    let newPokemons: Array<PokemonSet> = [];
    for (let i = 0; i < this.pokemons.length; i++) {
      if (i !== index) {
        newPokemons.push(this.pokemons[i]);
      }
    }
    if (this.active >= index) {
      this.active--;
    }
    this.pokemons = newPokemons;
  }

  saveTeam(): void {
    this.teamService.saveTeam(this.pokemons);
    this.toast.success('Team saved');
  }

  importTeam(importedTeam: Array<PokemonSet>): void {
    console.log(importedTeam);
    const newTeam: Array<PokemonSet> = new Array<PokemonSet>();
    for(let i = 0; i < importedTeam.length && i < 6; i++) {
      newTeam.push(importedTeam[i]);
    }
    this.pokemons = newTeam;
    this.showImportTeamModal = false;
    this.toast.success('Team imported');
  }

  setImportModal(showImportTeamModal: boolean): void {
    this.showImportTeamModal = showImportTeamModal;
  }

  setExportModal(showExportTeamModal: boolean): void {
    this.showExportTeamModal = showExportTeamModal;
  }

  exportTeam(fileName: string): void {
    this.teamService.exportTeam(this.pokemons, fileName);
    this.showExportTeamModal = false;
  }

}
