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

  private AuthURL="https://hptestinghub.com/testhub/auth";
  private RequestURL="https://hptestinghub.com/testhub/api/v1/request";
  constructor(private http: HttpClient) { }

  getLogInToken(userInfo:User):Observable<any>{
    return this.http.post<any>(this.AuthURL, userInfo, httpOptions);

  }

  getRequestByUserId():Observable<any>{
    return this.http.get<any>(this.RequestURL, httpOptions);

  }



}
