import { Component, OnInit } from '@angular/core';
import {DataBaseService} from "../services/data-base.service";
import {SidebarService} from "../services/sidebar.service";

@Component({
  selector: 'app-requests',
  templateUrl: './requests.component.html',
  styleUrls: ['./requests.component.css']
})
export class RequestsComponent implements OnInit {

  constructor(private dataBaseService:DataBaseService) { }
  requests=[];
  ngOnInit() {
    this.dataBaseService.getRequestByUserId().subscribe(
      (requests)=>{
        this.requests=requests;

      }
    )
  }

  toggleSittingDiv(index:number):void{
  }




}
