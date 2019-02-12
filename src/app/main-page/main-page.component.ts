import { Component, OnInit } from '@angular/core';
import {SidebarService} from "../services/sidebar.service";


@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent implements OnInit {

  constructor(private sidebarService:SidebarService) { }

  ngOnInit() {}

}
