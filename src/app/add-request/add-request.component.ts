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

  //form1 data
  isUrgent = false;
  Product_Name:string;
  Project_Name:string;
  Test_Name:string;
  Test_type:string;
  shift:number=0;
  isHalfShift = false;

  //form2 data
  Test_Objectives:string;
  Additional_Comment:string;
  media_name:string;
  media_type:string;
  media_Quantity:number=0;

  //checkbox - function
  isTestChecked = false;
  isLabChecked = true;



  toggleTest(): void {
    this.isTestChecked = !this.isTestChecked;
    this.isLabChecked = this.isTestChecked ? false : this.isLabChecked;
    this.Test_type= this.isTestChecked?"Test" : "Lab";

  }
  toggleLab(): void {
    this.isLabChecked = !this.isLabChecked;
    this.isTestChecked = this.isLabChecked ? false : this.isTestChecked;
    this.Test_type= this.isTestChecked?"Test" : "Lab";
  }

  HalfShiftChange():void{
    if(this.isHalfShift){
      document.getElementById("shift").value="0.5";
      document.getElementById("shift").disabled=true;
    }else{
      document.getElementById("shift").disabled=false;
    }
  }

  requestMediaPopupShow():void{
    $(".requestMedia .add .popup").show(300);
  }

  requestMediaPopupHide():void{
    $(".requestMedia .add .popup").hide(300);
  }






  constructor() { }


  ngOnInit() {

  }



}









