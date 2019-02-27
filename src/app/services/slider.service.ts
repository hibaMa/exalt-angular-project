import { Injectable } from '@angular/core';
import {DataBaseService} from './data-base.service';

@Injectable({
  providedIn: 'root'
})
export class SliderService {
  pressesArray: [];
  chosenPressesArray=[];
  isPressSelected=[];

  constructor(private dataBaseService:DataBaseService) { }
}
