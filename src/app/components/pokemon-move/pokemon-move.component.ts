import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { Observable, map, startWith } from 'rxjs';
import { Move } from 'src/app/model/move/move';
import { Multiplier } from 'src/app/model/multiplier/multiplier';
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
  //form: FormGroup;
  autocompleteControl = new FormControl('');
  moves: Map<string, Move> = new Map<string, Move>();
  filteredOptions: Observable<Array<string>>;
  showMultiplierModal: boolean = false;
  
  @ViewChild('moveInput') formInput: ElementRef;

  constructor(private readonly pokemonMovesService: PokemonMovesService) {
  }

  ngOnInit(): void {
    this.moves = this.pokemonMovesService.getAllPokemonMoves();

    this.selectedMove = {...this.move || this.moves.get("(No Move)")};

   // this.form = this.fb.group({
    //  name: this.selectedMove?.name
      //bp: defaultMove.bp,
      //type: defaultMove.type,
      //category: defaultMove.category,
    //});

    this.filteredOptions = this.autocompleteControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value || '')),
    );
  }

  ngOnChanges(): void {
    this.selectedMove = this.move || this.moves.get("(No Move)");
  }

  private convertToMove(moveName: string): Move {

    return {...this.moves.get(moveName)};
  }

  private _filter(value: string): Array<string> {
    const filterValue = value.toLowerCase();

    return Array.from(this.moves.keys())
      .filter(option => option.toLowerCase().includes(filterValue));
  }

  selectMove(move: string): void {

    this.selectedMove = this.convertToMove(move);

    this.changeMove.emit(this.selectedMove);
  }

  initializeSearch(): void {
    this.autocompleteControl.setValue('');
    this.isKeyboardActive();
  }

  isKeyboardActive() {
     this.formInput.nativeElement.focus();
  }

  addMultipliers(multipliers: Array<Multiplier>): void {

    this.closeModal()
    this.selectedMove.multipliers = multipliers;
    this.changeMove.emit(this.selectedMove);
  }

  toggleCrit(): void {
    this.selectedMove.crit = !this.selectedMove.crit;
    this.changeMove.emit(this.selectedMove);
  }

  showModal(): void {
    this.showMultiplierModal = true;
  }

  closeModal(): void {
    this.showMultiplierModal = false;
  }


}
