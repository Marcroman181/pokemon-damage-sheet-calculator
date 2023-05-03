import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import { PokemonNaturesService } from 'src/app/services/pokemon-natures.service';

@Component({
  selector: 'pokemon-nature',
  templateUrl: './pokemon-nature.component.html',
  styleUrls: ['./pokemon-nature.component.scss']
})
export class PokemonNatureComponent implements OnInit {

  @Input() nature: string = '';

  @Output() changeNature: EventEmitter<string> = new EventEmitter<string>();

  private readonly unsubscribe: Subject<void> = new Subject();

  form: FormGroup;
  natures: Map<string, Array<string>> = new Map<string, Array<string>>();

  constructor(private readonly pokemonNaturesService: PokemonNaturesService,
    private readonly fb: FormBuilder) {
  }

  ngOnInit(): void {
    this.natures = this.pokemonNaturesService.getAllPokemonNatures();
    this.form = this.fb.group({
      nature: this.nature
    });

    this.subscribeNatures();
  }

  private subscribeNatures(): void {

    this.form.valueChanges
      .pipe(takeUntil(this.unsubscribe))
      .subscribe(dataForm => this.changeNature.emit(dataForm.nature));
  }

}