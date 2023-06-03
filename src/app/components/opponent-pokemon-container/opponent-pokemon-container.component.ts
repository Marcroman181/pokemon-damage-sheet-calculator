import { Component, Input, OnInit } from '@angular/core';
import { PokemonSet } from 'src/app/model/pokemon-set/pokemonSet';
import { IdGeneratorService } from 'src/app/services/id-generator.service';
import { SheetService } from 'src/app/services/sheet.service';

@Component({
  selector: 'opponent-pokemon-container',
  templateUrl: './opponent-pokemon-container.component.html',
  styleUrls: ['./opponent-pokemon-container.component.scss']
})
export class OpponentPokemonContainerComponent implements OnInit {

  @Input() userPokemon: PokemonSet;
  @Input() offensiveCalcs: boolean = false;

  pokemons: Map<number, PokemonSet> = new Map<number, PokemonSet>();

  showModal: boolean = false;
  showExportModal: boolean = false;
  showImportModal: boolean = false;
  pokemonToEdit: PokemonSet;

  constructor(private readonly idGeneratorService: IdGeneratorService,
    private readonly sheetService: SheetService) {
  }

  ngOnInit(): void {
    this.initializeSheet();
  }

  closeModal(): void {
    this.showModal = false;
  }

  addPokemon(): void {
    this.pokemonToEdit = undefined;
    this.showModal = true;
  }

  editPokemon(pokemonId: number): void {
    this.pokemonToEdit = this.pokemons.get(pokemonId) || undefined;
    this.showModal = true;
  }

  deletePokemon(pokemonId: number): void {
    console.log("POKEMON DELETE");
    console.log(this.pokemons);
    this.pokemons.delete(pokemonId);
    console.log("POKEMON DELETED");
    console.log(this.pokemons);
  }

  savePokemon(pokemon: PokemonSet): void {
    this.showModal = false;
    if(pokemon.id) {
      this.pokemons.set(pokemon.id, pokemon);
      console.log("POKEMON EDITTED");
    } else {
      const ids: Array<number> = Array.from(this.pokemons.keys());
      pokemon.id = this.idGeneratorService.generateId(ids);
      this.pokemons.set(pokemon.id, pokemon);
      console.log("POKEMON SAVED");
    }
    console.log(pokemon);
  }

  initializeSheet(): void {
    this.sheetService.getSheet()
      .forEach((pokemon:PokemonSet) => this.pokemons.set(pokemon.id, pokemon));
  }

  saveSheet(): void {
    this.sheetService.saveSheet(Array.from(this.pokemons.values()));
  }

  importSheet(pokemonSheet: Array<PokemonSet>): void {
    const newSheet: Map<number, PokemonSet> = new Map<number, PokemonSet>();
    pokemonSheet
      .forEach((pokemon:PokemonSet) => newSheet.set(pokemon.id, pokemon));
    this.pokemons = newSheet;
    this.showImportModal = false;
  }

  setExportModal(showExportModal: boolean): void {
    this.showExportModal = showExportModal;
  }

  setImportModal(showImportModal: boolean): void {
    this.showImportModal = showImportModal;
  }

  exportSheet(fileName: string): void {
    this.sheetService.exportSheet(Array.from(this.pokemons.values()), fileName);
    this.showExportModal = false;
  }

}
