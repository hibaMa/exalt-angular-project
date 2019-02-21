import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import * as jQuery from 'jquery';
import {DataBaseService} from '../services/data-base.service';

@Component({
  selector: 'app-add-request',
  templateUrl: './add-request.component.html',
  styleUrls: ['./add-request.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class AddRequestComponent implements OnInit {

  pressesArray=[1,2,3,4,5,6,7,8,9,10,11];

  //form1 data
  isUrgent = false;
  Product_Name:string;
  Project_Name:string;
  Test_Name:string;
  Test_type:string;
  shift=0;
  isHalfShift = false;

  //form2 data
  Test_Objectives:string;
  Additional_Comment:string;
  media_name:string;
  media_type:string;
  media_Quantity=0;
  requestMedia=[];
  requestMediaEditPopup=[];


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
      this.shift=0.5;
    }
  }

  requestMediaPopupShow():void{
    $(".requestMedia .add .popup").show(300);
  }

  requestMediaPopupHide():void{
    $(".requestMedia .add .popup").hide(300);
  }

  requestMediaEditPopupHide(index:number):void{
    this.requestMediaEditPopup[index]=false;

  }

  ReplaceComponentPopupShow():void{
    $(".ReplaceComponent .add .popup").show(300);
  }

  ReplaceComponentPopupHide():void{
    $(".ReplaceComponent .add .popup").hide(300);
  }


  addRequestMedia():void{
    var currenRequest={media_name:"",media_type:"",media_Quantity:0};
    if(this.media_name.trim()!="" && this.media_type!="" ){
      currenRequest.media_name=this.media_name;
      currenRequest.media_type=this.media_type;
      currenRequest.media_Quantity=this.media_Quantity;
      this.requestMedia.push(currenRequest);
      this.requestMediaEditPopup.push(false);
      this.requestMediaPopupHide();
      this.media_name="";
      this.media_type="";
      this.media_Quantity=0;
    }

  }
  editRequestMedia(index:number):void{
    this.requestMedia[index].media_name=this.media_name;
    this.requestMedia[index].media_type=this.media_type;
    this.requestMedia[index].media_Quantity=this.media_Quantity;
    this.requestMediaEditPopupHide(index);
    this.media_name="";
    this.media_type="";
    this.media_Quantity=0;
  }

  displayEditPopup(index:number):void{
    for(var i=0;i<this.requestMediaEditPopup.length;i++){
      this.requestMediaEditPopup[i]=false;
    }
    this.requestMediaEditPopup[index]=true;
  }



  addReplaceComponentMedia():void{

  }

  deleteMediaByIndex(index:number):void{
    this.requestMedia.splice(index, 1);
    this.requestMediaEditPopup.splice(index, 1);

  }






  constructor(private dataBaseService:DataBaseService) { }


  ngOnInit() {
    // this.dataBaseService.getAvailablePresses().subscribe(
    //   (presses)=>{
    //     this.pressesArray=presses;
    //   }
    // );
  }



}









