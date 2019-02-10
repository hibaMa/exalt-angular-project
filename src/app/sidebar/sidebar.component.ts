import { Component, OnInit } from '@angular/core';
import {SidebarService} from "../services/sidebar.service";

export enum Taps{
  myRequest,workPlan
}

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  myRequestTap=Taps.myRequest;
  workPlanTap=Taps.workPlan;

  selectedTap:boolean[]=[true,false];

  selectTap(id:number):void{
    for(var i=0;i<this.selectedTap.length;i++) {
      this.selectedTap[i] = (i == id ? true : false);
    }
    this.sidebarService.isSidebarHidden=true;

  }
  constructor(private sidebarService:SidebarService) { }
  ngOnInit() {
  }

}
