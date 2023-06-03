import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { IndexComponent } from './pages/index/index.component';
import { PokemonCardComponent } from './components/pokemon-card/pokemon-card.component';
import { CdkColumnDef } from '@angular/cdk/table';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PokemonAutocompleteComponent } from './components/pokemon-autocomplete/pokemon-autocomplete.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PokemonStatsComponent } from './components/pokemon-stats/pokemon-stats.component';
import { PokemonTypeComponent } from './components/pokemon-type/pokemon-type.component';
import { PokemonLevelComponent } from './components/pokemon-level/pokemon-level.component';
import { PokemonMoveComponent } from './components/pokemon-move/pokemon-move.component';
import { PokemonNatureComponent } from './components/pokemon-nature/pokemon-nature.component';
import { OpponentPokemonContainerComponent } from './components/opponent-pokemon-container/opponent-pokemon-container.component';
import { OpponentPokemonComponent } from './components/opponent-pokemon/opponent-pokemon.component';
import { EditPokemonModalComponent } from './components/pokemon-modal/edit-pokemon-modal.component';
import { CalcResultComponent } from './components/calc-result/calc-result.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SaveSetModalComponent } from './components/save-set-modal/save-set-modal.component';
import { TeamComponent } from './components/team/team.component';
import { MultiplierModalComponent } from './components/multiplier-modal/multiplier-modal.component';
import { ShowExportModalComponent } from './components/show-export-modal/show-export-modal.component';
import { ImportSheetModalComponent } from './components/import-sheet-modal/import-sheet-modal.component';

@NgModule({
  declarations: [
    AppComponent,
    IndexComponent,
    PokemonCardComponent,
    PokemonAutocompleteComponent,
    PokemonStatsComponent,
    PokemonTypeComponent,
    PokemonLevelComponent,
    PokemonMoveComponent,
    PokemonNatureComponent,
    OpponentPokemonContainerComponent,
    OpponentPokemonComponent,
    EditPokemonModalComponent,
    CalcResultComponent,
    SaveSetModalComponent,
    TeamComponent,
    MultiplierModalComponent,
    ShowExportModalComponent,
    ImportSheetModalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    BrowserAnimationsModule,
    NgbModule
  ],
  providers: [CdkColumnDef],
  bootstrap: [AppComponent]
})
export class AppModule { }
