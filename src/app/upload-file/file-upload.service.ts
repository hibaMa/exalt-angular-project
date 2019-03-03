import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {data} from '../constant';
import {HttpClient, HttpHeaders} from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'multipart/form-data',  'Accept': 'application/json'})
};


@Injectable({
  providedIn: 'root'
})
export class FileUploadService {

  uploadFiles(requestID:number, filesToUpload:[],filesTypes:[]): Observable<any> {
    var formData = new FormData();
    const fileUrl = data.baseURL + '/api/v1/request/file/' + requestID;
    filesToUpload.map((file) =>
      formData.append('file', file)
    );

    filesTypes.map((fileType) =>
      formData.append('type', fileType)
    );

    return this.httpClient.post(fileUrl, formData, httpOptions);
  }

  constructor(private httpClient: HttpClient) {
  }
}
