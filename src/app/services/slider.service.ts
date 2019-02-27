import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SliderService {
  pressesArray: [];
  chosenPressesArray=[];
  isPressSelected=[];

  constructor( ) { }
}
