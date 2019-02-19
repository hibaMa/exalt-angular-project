import { Component, OnInit } from '@angular/core';
import { SidebarService } from '../services/sidebar.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})

export class HeaderComponent implements OnInit {

  showUserInfo:boolean=false;
  toggleSidebar():void{
    this.sidebarService.isSidebarHidden=! this.sidebarService.isSidebarHidden;
  }


  constructor(private sidebarService:SidebarService) { }


  ngOnInit() {
  }

}
