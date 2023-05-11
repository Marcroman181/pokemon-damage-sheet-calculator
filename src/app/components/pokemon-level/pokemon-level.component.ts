import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'pokemon-level',
  templateUrl: './pokemon-level.component.html',
  styleUrls: ['./pokemon-level.component.scss']
})
export class PokemonLevelComponent implements OnInit, OnChanges {

  @Input() initializedLevel: number;

  @Output() level: EventEmitter<number> = new EventEmitter<number>();

  private readonly unsubscribe: Subject<void> = new Subject();
  form: FormGroup;

  constructor(private readonly fb: FormBuilder) {
  }

  ngOnInit(): void {
      this.form = this.fb.group({
        level: this.initializedLevel ? this.initializedLevel : 50 
      });    

      this.subscribeLevel();
  }

  ngOnChanges(): void {
    if (this.form) {
      this.form.setValue({ level: this.initializedLevel ? this.initializedLevel : 50 }, {emitEvent: false});
    }
  }

  private subscribeLevel(): void {

    this.form.valueChanges
      .pipe(takeUntil(this.unsubscribe))
      .subscribe(dataForm => this.level.emit(dataForm.level));
  } 

}
