import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { IndexComponent } from './pages/index/index.component';
import { PokemonCardComponent } from './components/pokemon-card/pokemon-card.component';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { CdkColumnDef } from '@angular/cdk/table';
import { ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { PokemonAutocompleteComponent } from './components/pokemon-autocomplete/pokemon-autocomplete.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PokemonStatsComponent } from './components/pokemon-stats/pokemon-stats.component';
import { PokemonTypeComponent } from './components/pokemon-type/pokemon-type.component';
import { PokemonLevelComponent } from './components/pokemon-level/pokemon-level.component';
import { PokemonMoveComponent } from './components/pokemon-move/pokemon-move.component';
import { PokemonNatureComponent } from './components/pokemon-nature/pokemon-nature.component';

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
    PokemonNatureComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatCardModule,
    MatInputModule,
    MatTableModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
    BrowserAnimationsModule
  ],
  providers: [CdkColumnDef],
  bootstrap: [AppComponent]
})
export class AppModule { }
