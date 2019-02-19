import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import * as jQuery from 'jquery';

@Component({
  selector: 'app-add-request',
  templateUrl: './add-request.component.html',
  styleUrls: ['./add-request.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class AddRequestComponent implements OnInit {

  requestArray=[1,2,3,4,5,6,7,8,9,10,11,12,13];
  isUrgent = false;
  isHalfShift = false;
  halfShiftChecked = false;
  urgentChecked = false;

  //checkbox - function
  isTestChecked = false;
  isLabChecked = true;



  toggleTest(): void {
    this.isTestChecked = !this.isTestChecked;
    this.isLabChecked = this.isTestChecked ? false : this.isLabChecked;
  }
  toggleLab(): void {
    this.isLabChecked = !this.isLabChecked;
    this.isTestChecked = this.isLabChecked ? false : this.isTestChecked;
  }



  constructor() { }


  ngOnInit() {

  }



}









