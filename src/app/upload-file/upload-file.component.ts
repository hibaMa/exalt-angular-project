import { Component, OnInit } from '@angular/core';
import {FileUploadService} from '../services/file-upload.service';

@Component({
  selector: 'app-upload-file',
  templateUrl: './upload-file.component.html',
  styleUrls: ['./upload-file.component.css']
})
export class UploadFileComponent implements OnInit {

  fileToUpload=[];



  uploadFile() {
    // this.fileUploadService.postFile(this.fileToUpload, 1).subscribe(
    //   (data) => {
    //   console.log("uploaded");
    // }, (error) => {
    //   console.log(error);
    // });
  }
  constructor(private fileUploadService: FileUploadService) { }

  ngOnInit() {
  }

}
