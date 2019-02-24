import {Component, OnInit, ViewEncapsulation,ChangeDetectionStrategy } from '@angular/core';
import * as jQuery from 'jquery';
import {DataBaseService} from '../services/data-base.service';

@Component({
  selector: 'app-add-request',
  templateUrl: './add-request.component.html',
  styleUrls: ['./add-request.component.css'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.Default //to support ngFor does not update when array is updated

})
export class AddRequestComponent implements OnInit {

  productsArray=[];
  projectsArray=[];
  mediaArray=[];
  selectedMediaTypes=[];

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
  editMedia_name:string;
  editMedia_type:string;
  editMedia_Quantity=0;

  requestMedia=[];
  requestMediaEditPopup=[];

  Component_name:string;
  Component_Num:number;
  editComponent_name:string;
  editComponent_Num:number;
  replaceComponent=[];
  compEditPopupViability=[];


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
    this.media_name="";
    this.media_type="";
    this.media_Quantity=0;
  }

  requestMediaEditPopupHide(index:number):void{
    this.requestMediaEditPopup[index]=false;
    this.editMedia_name="";
    this.editMedia_type="";
    this.editMedia_Quantity=0;

  }

  replaceComponentPopupShow():void{
    $(".ReplaceComponent .add .popup").show(300);
  }

  replaceComponentPopupHide():void{
    $(".ReplaceComponent .add .popup").hide(300);
    this.Component_name="";
    this.Component_Num=0;
  }

  replaceComponentEditPopupHide(index:number):void{
    this.compEditPopupViability[index]=false;
    this.editComponent_name="";
    this.editComponent_Num=0;
  }

  displayRequestEditPopup(index:number):void{
    for(var i=0;i<this.requestMediaEditPopup.length;i++){
      this.requestMediaEditPopup[i]=false;
    }
    this.requestMediaEditPopup[index]=true;
  }

  displayCompEditPopup(index:number):void{
    for(var i=0;i<this.compEditPopupViability.length;i++){
      this.compEditPopupViability[i]=false;
    }
    this.compEditPopupViability[index]=true;
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
    this.requestMedia[index].media_name=this.editMedia_name;
    this.requestMedia[index].media_type=this.editMedia_type;
    this.requestMedia[index].media_Quantity=this.editMedia_Quantity;
    this.requestMediaEditPopupHide(index);
    this.editMedia_name="";
    this.editMedia_type="";
    this.editMedia_Quantity=0;
  }

  addReplaceComponentMedia():void{
    var currenComp={compo_name:"",compo_num:0};
    if(this.Component_name.trim()!="" ){
      currenComp.compo_name=this.Component_name;
      currenComp.compo_num=this.Component_Num;
      this.replaceComponent.push(currenComp);
      this.compEditPopupViability.push(false);
      this.replaceComponentPopupHide()
      this.Component_name="";
      this.Component_Num=0;
    }

  }

  editComponent(index:number):void{
    this.replaceComponent[index].compo_name=this.editComponent_name;
    this.replaceComponent[index].compo_num=this.editComponent_Num;
    this.replaceComponentEditPopupHide(index);
    this.editComponent_name="";
    this.editComponent_Num=0;

  }

  deleteMediaByIndex(index:number):void{
    this.requestMedia.splice(index, 1);
    this.requestMediaEditPopup.splice(index, 1);

  }
  deletecompByIndex(index:number):void{
    this.replaceComponent.splice(index, 1);
    this.compEditPopupViability.splice(index, 1);

  }

  modifySelectedMediaTypes(index:number):void{
    this.selectedMediaTypes = this.mediaArray[index].types;

  }

  constructor(private dataBaseService:DataBaseService) { }


  ngOnInit() {
    this.dataBaseService.getProducts().subscribe(
      (products)=>{
        this.productsArray=products;
      }
    );

    this.dataBaseService.getProducts().subscribe(
      (projects)=>{
        this.projectsArray=projects;
      }
    );

    this.dataBaseService.getMedia().subscribe(
      (media)=>{
        this.mediaArray=media;
      }
    );
  }



}









