import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import { data } from '../constant';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'multipart/form-data' })
};


@Injectable({
  providedIn: 'root'
})
export class FileUploadService {

  postFile(fileToUpload: File,id:number): Observable<any> {
    const fileUrl = data.baseURL + '/api/v1/request/file/'+id;

    const formData: FormData = new FormData();
    formData.append( fileToUpload.name, fileToUpload);
    return this.httpClient.post(fileUrl, formData, httpOptions);
  }

  constructor(private httpClient: HttpClient) { }
}
