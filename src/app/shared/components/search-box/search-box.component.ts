import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Subject, Subscription, debounceTime } from 'rxjs';

@Component({
  selector: 'shared-search-box',
  templateUrl: './search-box.component.html'
})
export class SearchBoxComponent implements OnInit, OnDestroy{

  private debouncer: Subject<string> = new Subject<string>(); 
  private debouncerSuscription?: Subscription;

  @Input()
  placeholder: string = '';

  @Input()
  initialValue: string = '';

  @Output()
  onValue = new EventEmitter<string>();

  @Output()
  onDebounce = new EventEmitter<string>();


  //Metodos angular

  ngOnInit(): void {
    this.debouncerSuscription = this.debouncer
    .pipe(
      debounceTime(1000) //Esperará 1 seg por cada valor que este recibiendo, cada letra en el input. Cuando deje de enviar, se ejecutara el subscribe
    )
    .subscribe(value => {
      this.onDebounce.emit(value);
    })
  }

  ngOnDestroy(): void {
    //Cada vez que slgo de la pagina/pestaña en la que estoy, se destruye el componente...
    this.debouncerSuscription?.unsubscribe();
  }


  //Metodos mios
  emitValue( value:string ){
    this.onValue.emit(value); //Llama a el evento que se encuentra en en TS de by-capital-page ( padre )

  }

  onKeyPress( searchTerm: string){
    this.debouncer.next(searchTerm);
  }

}
