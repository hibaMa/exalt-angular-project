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
  componentArray=[];

  //form1 data
  isUrgent = false;
  Product_NameID:string;
  Project_NameID:string;
  Test_Name:string;
  Test_type:string;
  shift=0;
  isHalfShift = false;

  //form2 data
  Test_Objectives:string;
  Additional_Comment:string;

  media_nameID:string;
  media_typeID:string;
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

  //calss data
  selectedMediaID:string;


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
    this.replaceComponentPopupHide();
  }

  requestMediaPopupHide():void{
    $(".requestMedia .add .popup").hide(300);
    this.media_nameID="";
    this.media_typeID="";
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
    this.requestMediaPopupHide();
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
    this.editMedia_Quantity=this.requestMedia[index].media_Quantity;
    this.editMedia_name=this.requestMedia[index].media_name;
  }

  displayCompEditPopup(index:number):void{
    for(var i=0;i<this.compEditPopupViability.length;i++){
      this.compEditPopupViability[i]=false;
    }
    this.compEditPopupViability[index]=true;
    this.editComponent_Num=this.replaceComponent[index].compo_num;
  }

  addRequestMedia():void{
    var currenRequest={media_name:"",media_type:"",media_Quantity:0,id:0,mediaID:0};
    if(this.media_nameID.trim()!="" && this.media_typeID!="" ){
      currenRequest.id=Number(this.media_nameID);
      currenRequest.mediaID=Number(this.media_typeID);
      currenRequest.media_name=this.getSelectedMediaByID(Number(this.media_nameID)).name;
      currenRequest.media_type=this.getSelectedMediaTypeByID(Number(this.media_typeID)).name;
      currenRequest.media_Quantity=this.media_Quantity;
      this.requestMedia.push(currenRequest);
      this.requestMediaEditPopup.push(false);
      this.requestMediaPopupHide();
      this.media_nameID="";
      this.media_typeID="";
      this.media_Quantity=0;
    }

  }
  editRequestMedia(index:number):void{
    if(Number(this.editMedia_name)){
      this.requestMedia[index].id=Number(this.editMedia_name);
      this.requestMedia[index].media_name = this.getSelectedMediaByID(Number(this.editMedia_name)).name;
    }
    if(this.editMedia_type.trim() !=""){
      this.requestMedia[index].mediaID=Number(this.editMedia_type);
      this.requestMedia[index].media_type = this.getSelectedMediaTypeByID(Number(this.editMedia_type)).name;
    }

    if(this.editMedia_Quantity != 0){
      this.requestMedia[index].media_Quantity = this.editMedia_Quantity;
    }

    this.requestMediaEditPopupHide(index);
    this.editMedia_name = "";
    this.editMedia_type = "";
    this.editMedia_Quantity = 0;
  }

  addReplaceComponentMedia():void{
    var currenComp={compo_name:"",compo_num:0,id:0};
    if(this.Component_name.trim()!="" ){
      currenComp.id=Number(this.Component_name);
      currenComp.compo_name=this.getSelectedComponentByID(Number(this.Component_name)).name;
      currenComp.compo_num=this.Component_Num;
      this.replaceComponent.push(currenComp);
      this.compEditPopupViability.push(false);
      this.replaceComponentPopupHide();
      this.Component_name="";
      this.Component_Num=0;
    }

  }

  editComponent(index:number):void{
    if(Number(this.editComponent_name)) {
      this.replaceComponent[index].id=Number(this.editComponent_name);
      this.replaceComponent[index].compo_name = this.getSelectedComponentByID(Number(this.editComponent_name)).name;

    }
    if(this.editComponent_Num!=0) {
      this.replaceComponent[index].compo_num = this.editComponent_Num;
    }
      this.replaceComponentEditPopupHide(index);
      this.editComponent_name = "";
      this.editComponent_Num = 0;

  }

  deleteMediaByIndex(index:number):void{
    this.requestMedia.splice(index, 1);
    this.requestMediaEditPopup.splice(index, 1);

  }
  deletecompByIndex(index:number):void{
    this.replaceComponent.splice(index, 1);
    this.compEditPopupViability.splice(index, 1);

  }

  modifySelectedMediaTypes(selectedElem):void{
    this.selectedMediaID=selectedElem.value;
    var media=this.getSelectedMediaByID(Number(this.selectedMediaID));
    this.selectedMediaTypes = media.types;

  }

  getSelectedMediaByID(mediaID:number):any{
    for(let media of this.mediaArray){
      if(media.id==mediaID){
        return media;
      }
    }
    return null;
  }

  getSelectedComponentByID(componentID:number):any{
    for(let component of this.componentArray){
      if(component.id==componentID){
        return component;
      }
    }
    return null;
  }

  getSelectedMediaTypeByID(mediaTypeID:number):any{
    console.log(this.selectedMediaTypes);
    console.log("mediaTypeID "+mediaTypeID);

    for(let mediaType of this.selectedMediaTypes){
      if(mediaType.id==mediaTypeID){
        return mediaType;
      }
    }
    return null;
  }
  getProjectByID(projectID:number):any{
    for(let project of this.projectsArray){
      if(project.id==projectID){
        return project;
      }
    }
    return null;
  }


  getProductByID(productID:number):any{
    for(let product of this.productsArray){
      if(product.id==productID){
        return product;
      }
    }
    return null;
  }

  constructor(private dataBaseService:DataBaseService) { }


  ngOnInit() {
    this.dataBaseService.getProducts().subscribe(
      (products)=>{
        this.productsArray=products;
      }
    );

    this.dataBaseService.getProjects().subscribe(
      (projects)=>{
        this.projectsArray=projects;
      }
    );

    this.dataBaseService.getMedia().subscribe(
      (media)=>{
        this.mediaArray=media;
      }
    );

    this.dataBaseService.getComponents().subscribe(
      (components)=>{
        this.componentArray=components;

        if(this.componentArray.length==0){
          this.componentArray.push({name:"comp test name",id:33},{name:"comp test name22",id:3});
        }

      }
    );
  }



}









