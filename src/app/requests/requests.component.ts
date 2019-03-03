import { Component, OnInit } from '@angular/core';
import {DataBaseService} from "../services/data-base.service";
import {data} from "../constant";

@Component({
  selector: 'app-requests',
  templateUrl: './requests.component.html',
  styleUrls: ['./requests.component.css']
})
export class RequestsComponent implements OnInit {

  constructor(private dataBaseService:DataBaseService) { }
  requests=[];
  sittingDivs=[];
  noteDivs=[];
  baseURL=data.baseURL;
  ngOnInit() {
    $('app-add-request').css("display","none");
    this.dataBaseService.getRequestByUserId().subscribe(
      (requests)=>{
        this.requests=requests;
        for (let i=0;i<this.requests.length;i++) {
          this.sittingDivs.push(false);
          this.noteDivs.push(false);
        }
      }
    );
  }

  toggleSittingDiv(index:number):void{
    for(var i=0;i<this.sittingDivs.length;i++)
    {
      if(i!=index)this.sittingDivs[i]=false;
      this.noteDivs[i]=false;
    }
    this.sittingDivs[index]=!this.sittingDivs[index];
  }

  toggleNoteDiv(index:number):void{
    for(var i=0;i<this.noteDivs.length;i++)
    {
      if(i!=index)this.noteDivs[i]=false;
      this.sittingDivs[i]=false;
    }
    this.noteDivs[index]=!this.noteDivs[index];
  }

  addRequest():void{
    $('app-add-request').css("display","block");
    $('.addRequest').slideDown(100);

  }



}
