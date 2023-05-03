import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Observable, map, startWith } from 'rxjs';
import { Move } from 'src/app/model/move/move';
import { PokemonMovesService } from 'src/app/services/pokemon-moves.service';

@Component({
  selector: 'pokemon-move',
  templateUrl: './pokemon-move.component.html',
  styleUrls: ['./pokemon-move.component.scss']
})
export class PokemonMoveComponent implements OnInit {

  @Input() move: Move;

  @Output() changeMove: EventEmitter<Move> = new EventEmitter<Move>();
  
  selectedMove: Move;
  form: FormGroup;
  moves: Map<string, Move> = new Map<string, Move>();
  filteredOptions: Observable<Array<string>>;

  constructor(private readonly pokemonMovesService: PokemonMovesService,
    private readonly fb: FormBuilder) {
  }

  ngOnInit(): void {
    this.moves = this.pokemonMovesService.getAllPokemonMoves();

    this.selectedMove = this.move || this.moves.get("(No Move)");

    this.form = this.fb.group({
      name: this.selectedMove.name
      //bp: defaultMove.bp,
      //type: defaultMove.type,
      //category: defaultMove.category,
    });

    this.filteredOptions = this.form.get("name").valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value || '')),
    );
  }

  private convertToMove(moveName: string): Move {

    return this.moves.get(moveName);
  }

  private _filter(value: string): Array<string> {
    const filterValue = value.toLowerCase();

    return Array.from(this.moves.keys())
      .filter(option => option.toLowerCase().includes(filterValue));
  }

  selectMove($event: any): void {

    this.selectedMove = this.convertToMove($event.option.value);

    this.changeMove.emit(this.selectedMove);
    console.log("Pokemon Move Selected => " + $event.option.value);
  }

  clearSearch(): void {
    this.form.setValue({name: ''});
  }

}
