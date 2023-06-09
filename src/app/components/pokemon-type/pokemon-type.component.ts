import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import { PokemonTypesService } from 'src/app/services/pokemon-types.service';

@Component({
  selector: 'pokemon-type',
  templateUrl: './pokemon-type.component.html',
  styleUrls: ['./pokemon-type.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PokemonTypeComponent implements OnInit, OnChanges {

  @Input() type: string;

  @Output() changeType: EventEmitter<string> = new EventEmitter<string>();

  private readonly unsubscribe: Subject<void> = new Subject();

  form: FormGroup;
  types: Array<string> = [];

  constructor(private readonly pokemonTypesService: PokemonTypesService,
    private readonly fb: FormBuilder) {
  }

  ngOnInit(): void {
    this.types = this.pokemonTypesService.getAllPokemonTypes();
    this.form = this.fb.group({
      type: this.type && this.type !== '' ? this.type : 'None'
    });

    this.subscribeTypes();
  }

  ngOnChanges(): void {
    if (this.form) {
      this.form.setValue({ type: this.type && this.type !== '' ? this.type : 'None' }, {emitEvent: false});
    }
  }

  private subscribeTypes(): void {

    this.form.valueChanges
      .pipe(takeUntil(this.unsubscribe))
      .subscribe(dataForm => this.changeType.emit(dataForm.type));
  }

}
