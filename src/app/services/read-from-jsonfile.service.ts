import { Injectable } from '@angular/core';
import data from '../../assets/locale.json';

@Injectable({
  providedIn: 'root'
})
export class ReadFromJSONFileService {
   jsonData:any = data;
   constructor() {}

}
