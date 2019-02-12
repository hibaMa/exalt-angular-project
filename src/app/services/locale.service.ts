import { Injectable } from '@angular/core';
import index from "@angular/cli/lib/cli";

const data={
  "english":{
    "auth_error_msg":"Wrong email or password"
  }
};



@Injectable({
  providedIn: 'root'
})
export class LocaleService {

  getMessage(language:string,msg:string):string{
    return data[language][msg];

  }

  constructor() { }
}
