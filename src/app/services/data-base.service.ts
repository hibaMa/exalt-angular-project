import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Observable} from "rxjs";
import {User} from "../User";

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class DataBaseService {

  private URL="https://hptestinghub.com/testhub/auth";
  constructor(private http: HttpClient) { }

  getLogInToken(userInfo:User):Observable<any>{
    return this.http.post<any>(this.URL, userInfo, httpOptions);

  }


}
