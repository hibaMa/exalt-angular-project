import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Observable} from "rxjs";
import {User} from "../User";
import { data } from "../constant";
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class DataBaseService {

  private AuthURL=data.baseURL+"/auth";
  private RequestURL=data.baseURL+"/api/v1/request";
  private PressesURL=data.baseURL+"/api/v1/presses";
  constructor(private http: HttpClient) { }

  getLogInToken(userInfo:User):Observable<any>{
    return this.http.post<any>(this.AuthURL, userInfo, httpOptions);

  }

  getRequestByUserId():Observable<any>{
    return this.http.get<any>(this.RequestURL, httpOptions);

  }

  getAvailablePresses():Observable<any>{
    return this.http.get<any>(this.PressesURL, httpOptions);
  }



}
