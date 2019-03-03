import {Component, OnInit, ViewEncapsulation, ChangeDetectionStrategy} from '@angular/core';
import * as jQuery from 'jquery';
import {DataBaseService} from '../services/data-base.service';
import {FileUploadService} from '../upload-file/file-upload.service';
import { DatePipe } from '@angular/common';
import {SliderService} from '../services/slider.service';

@Component({
  selector: 'app-add-request',
  templateUrl: './add-request.component.html',
  styleUrls: ['./add-request.component.css'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.Default, //to support ngFor does not update when array is updated
  providers: [DatePipe]

})
export class AddRequestComponent implements OnInit {
  //from DB
  productsArray = [];
  projectsArray = [];
  mediaArray = [];
  selectedMediaTypes = [];
  componentArray = [];

  //form1 data
  isUrgent = false;
  Product_NameID: string;
  Project_NameID: string;
  Test_Name: string;
  Test_type: string;
  shift = 0;
  isHalfShift = false;

  //form2 data
  Test_Objectives: string;
  Additional_Comment: string;

  media_nameID: string;
  media_typeID: string;
  media_Quantity = 0;
  editMedia_name: string;
  editMedia_type: string;
  editMedia_Quantity = 0;

  requestMedia = [];
  requestMediaEditPopup = [];

  Component_name: string;
  Component_Num: number;
  editComponent_name: string;
  editComponent_Num: number;
  replaceComponent = [];
  compEditPopupViability = [];

  filesToUpload = [];
  submitRequesData={};
  //calss data
  selectedMediaID: string;


  //checkbox - function
  isTestChecked = false;
  isLabChecked = true;


  toggleTest(): void {
    this.isTestChecked = !this.isTestChecked;
    this.isLabChecked = this.isTestChecked ? false : this.isLabChecked;
    this.Test_type = this.isTestChecked ? 'Test' : 'Lab';

  }

  toggleLab(): void {
    this.isLabChecked = !this.isLabChecked;
    this.isTestChecked = this.isLabChecked ? false : this.isTestChecked;
    this.Test_type = this.isTestChecked ? 'Test' : 'Lab';
  }

  HalfShiftChange(): void {
    if (this.isHalfShift) {
      this.shift = 0.5;
    }
  }

  requestMediaPopupShow(): void {
    $('.requestMedia .add .popup').show(300);
    this.replaceComponentPopupHide();
  }

  requestMediaPopupHide(): void {
    $('.requestMedia .add .popup').hide(300);
    this.media_nameID = '';
    this.media_typeID = '';
    this.media_Quantity = 0;
  }

  requestMediaEditPopupHide(index: number): void {
    this.requestMediaEditPopup[index] = false;
    this.editMedia_name = '';
    this.editMedia_type = '';
    this.editMedia_Quantity = 0;

  }

  replaceComponentPopupShow(): void {
    $('.ReplaceComponent .add .popup').show(300);
    this.requestMediaPopupHide();
  }

  replaceComponentPopupHide(): void {
    $('.ReplaceComponent .add .popup').hide(300);
    this.Component_name = '';
    this.Component_Num = 0;
  }

  replaceComponentEditPopupHide(index: number): void {
    this.compEditPopupViability[index] = false;
    this.editComponent_name = '';
    this.editComponent_Num = 0;
  }

  displayRequestEditPopup(index: number): void {
    for (var i = 0; i < this.requestMediaEditPopup.length; i++) {
      this.requestMediaEditPopup[i] = false;
    }
    this.requestMediaEditPopup[index] = true;
    this.editMedia_Quantity = this.requestMedia[index].media_Quantity;
    this.editMedia_name = this.requestMedia[index].media_name;
  }

  displayCompEditPopup(index: number): void {
    for (var i = 0; i < this.compEditPopupViability.length; i++) {
      this.compEditPopupViability[i] = false;
    }
    // this.compEditPopupViability.map((compObj)=>{
    //   compObj=false;
    // });
    this.compEditPopupViability[index] = true;
    this.editComponent_Num = this.replaceComponent[index].compo_num;
  }

  addRequestMedia(): void {
    var currenRequest = {media_name: '', media_type: '', media_Quantity: 0, id: 0, mediaID: 0};
    if (this.media_nameID != '' && this.media_typeID != '' && this.media_Quantity != 0) {
      currenRequest.id = Number(this.media_nameID);
      currenRequest.mediaID = Number(this.media_typeID);
      currenRequest.media_name = this.getSelectedMediaByID(Number(this.media_nameID)).name;
      currenRequest.media_type = this.getSelectedMediaTypeByID(Number(this.media_typeID)).name;
      currenRequest.media_Quantity = this.media_Quantity;
      this.requestMedia.push(currenRequest);
      this.requestMediaEditPopup.push(false);
      this.requestMediaPopupHide();
      console.log("in"+this.media_nameID +"-"+  this.media_typeID + "-"+  this.media_Quantity );

      this.media_nameID = '';
      this.media_typeID = '';
      this.media_Quantity = 0;
    }

    console.log(this.media_nameID +"-"+  this.media_typeID + "-"+  this.media_Quantity );

  }


  editRequestMedia(index: number): void {
    if (Number(this.editMedia_name)) {
      this.requestMedia[index].id = Number(this.editMedia_name);
      this.requestMedia[index].media_name = this.getSelectedMediaByID(Number(this.editMedia_name)).name;
    }
    if (Number(this.editMedia_type)) {
      this.requestMedia[index].mediaID = Number(this.editMedia_type);
      this.requestMedia[index].media_type = this.getSelectedMediaTypeByID(Number(this.editMedia_type)).name;
    }

    if (this.editMedia_Quantity != 0) {
      this.requestMedia[index].media_Quantity = this.editMedia_Quantity;
    }

    this.requestMediaEditPopupHide(index);
    this.editMedia_name = '';
    this.editMedia_type = '';
    this.editMedia_Quantity = 0;
  }

  addReplaceComponentMedia(): void {
    var currenComp = {compo_name: '', compo_num: 0, id: 0};
    if (Number(this.Component_name)) {
      currenComp.id = Number(this.Component_name);
      currenComp.compo_name = this.getSelectedComponentByID(Number(this.Component_name)).name;
      currenComp.compo_num = this.Component_Num;
      this.replaceComponent.push(currenComp);
      this.compEditPopupViability.push(false);
      this.replaceComponentPopupHide();
      this.Component_name = '';
      this.Component_Num = 0;
    }

  }

  editComponent(index: number): void {
    if (Number(this.editComponent_name)) {
      this.replaceComponent[index].id = Number(this.editComponent_name);
      this.replaceComponent[index].compo_name = this.getSelectedComponentByID(Number(this.editComponent_name)).name;

    }
    if (this.editComponent_Num != 0) {
      this.replaceComponent[index].compo_num = this.editComponent_Num;
    }
    this.replaceComponentEditPopupHide(index);
    this.editComponent_name = '';
    this.editComponent_Num = 0;

  }

  deleteMediaByIndex(index: number): void {
    this.requestMedia.splice(index, 1);
    this.requestMediaEditPopup.splice(index, 1);

  }

  deletecompByIndex(index: number): void {
    this.replaceComponent.splice(index, 1);
    this.compEditPopupViability.splice(index, 1);

  }

  modifySelectedMediaTypes(selectedElem): void {
    this.selectedMediaID = selectedElem.value;
    var media = this.getSelectedMediaByID(Number(this.selectedMediaID));
    this.selectedMediaTypes = media.types;

  }

  getSelectedMediaByID(mediaID: number): any {
    for (let media of this.mediaArray) {
      if (media.id == mediaID) {
        return media;
      }
    }
    return null;
  }

  getSelectedComponentByID(componentID: number): any {
    for (let component of this.componentArray) {
      if (component.id == componentID) {
        return component;
      }
    }
    return null;
  }

  getSelectedMediaTypeByID(mediaTypeID: number): any {
    for (let mediaType of this.selectedMediaTypes) {
      if (mediaType.id == mediaTypeID) {
        return mediaType;
      }
    }
    return null;
  }

  getProjectByID(projectID: number): any {
    for (let project of this.projectsArray) {
      if (project.id == projectID) {
        return project;
      }
    }
    return null;
  }


  getProductByID(productID: number): any {
    for (let product of this.productsArray) {
      if (product.id == productID) {
        return product;
      }
    }
    return null;
  }

  addFileBtn(): void {
    this.filesToUpload.push(true);
  }

  constructor(private sliderService: SliderService ,private datePipe: DatePipe,private dataBaseService: DataBaseService, private fileUploadService: FileUploadService) {
  }


  ngOnInit() {
    this.filesToUpload.push(true);
    this.dataBaseService.getProducts().subscribe(
      (products) => {
        this.productsArray = products;
      }
    );

    this.dataBaseService.getProjects().subscribe(
      (projects) => {
        this.projectsArray = projects;
      }
    );

    this.dataBaseService.getMedia().subscribe(
      (media) => {
        this.mediaArray = media;
      }
    );

    this.dataBaseService.getComponents().subscribe(
      (components) => {
        this.componentArray = components;

        if (this.componentArray.length == 0) {
          this.componentArray.push({name: 'comp test name', id: 33}, {name: 'comp test name22', id: 3});
        }

      }
    );
  }

  closeAddRequest(): void {
    $('.addRequest').slideUp(100,function() {
      $('app-add-request').css("display","none");
    });

  }


  submitFiles(requestID: number): void {
    // var filesToUpload = [];
    // var filesTypes = [];
    // const children = document.getElementsByClassName('fileInputToUpload');
    // Array.from(children).forEach((child, index) => {
    //   if ('files' in child && child != null) {
    //     if (child.files.length == 0) {
    //       console.log('Select one or more files.');
    //     } else {
    //       filesToUpload.push(child.files[0]);
    //       filesTypes.push(this.getFileType(child.files[0].name.split('.').pop().toLowerCase()));
    //     }
    //   }
    // });
    // console.log(filesTypes);
    // this.fileUploadService.uploadFiles(requestID, filesToUpload,filesTypes);
  }
  
  submitRequest(): void {
    this.closeAddRequest();
    this.initSubmitData();
    this.dataBaseService.createRequest(this.submitRequesData).subscribe(
      (reqest)=>{
        console.log(reqest);
      },
      (error)=>{
        console.log(error);
      }

    );
    // var requestID = 3;
    // this.submitFiles(requestID);
  }

  initSubmitData():void{
    var selectedProject=this.getProjectByID(Number(this.Project_NameID));
    var selectedProduct=this.getProductByID(Number(this.Product_NameID));
    var submitMedia={mediaId: 0, name: "string", quantity: 0, type: "string"};
    var submitMediaArray=[];
    var submitComponentArray=[];
    var submitComponent= {compId: 0, name: "string", quantity: 0};


    this.requestMedia.map((media)=>{
      submitMedia.mediaId=media.media_nameID;
      submitMedia.name=this.getSelectedMediaByID(media.media_nameID);
      submitMedia.quantity=media.media_Quantity;
      submitMedia.type=this.getSelectedMediaTypeByID(media.media_type);
      submitMediaArray.push(submitMedia);

    });
    this.replaceComponent.map((comp)=>{
      submitComponent.quantity=comp.compo_num;
      submitComponent.name=comp.compo_name;
      submitComponent.compId=comp.compId;
      submitComponentArray.push(submitComponent);

    });
    this.submitRequesData={
      weekNumber: 0,
      priority: 1,
      isConsecutive: true,
      hub: {
        id: 1,
        name: "Hub 1"
      },
      description: "",
      media:submitMediaArray,
      shiftsLength:this.shift,
      type:this.Test_type,
      isArgent:this.isUrgent,
      comment:this.Additional_Comment,
      name:this.Test_Name,
      project:{},
      product: {},
      testObjecteves:this.Test_Objectives,
      components:submitComponentArray,
      presses:this.sliderService.chosenPressesArray
    };

  }



  getFileType(str: string): string {
    var fileType;
    if (str == 'pdf') {
      fileType = 'application/pdf';

    } else if (str == 'png') {
      fileType = 'image/png ';

    } else if (str == 'gif') {
      fileType = 'image/gif';

    } else if (str == 'jpeg') {
      fileType = 'image/jpeg';

    } else if (str == 'jpg') {
      fileType = 'image/jpeg';

    } else if (str == 'zip') {
      fileType = 'application/zip';

    } else if (str == 'rar') {
      fileType = 'application/zip';

    } else if (str == 'doc') {
      fileType = 'application/msword';

    } else if (str == 'dot') {
      fileType = 'application/msword';

    } else if (str == 'docx') {
      fileType = 'application/vnd.openxmlformats-officedocument.wordprocessingml.document';

    } else if (str == 'dotx') {
      fileType = 'application/vnd.openxmlformats-officedocument.wordprocessingml.template';

    } else if (str == 'docm') {
      fileType = 'application/vnd.ms-word.document.macroEnabled.12';

    } else if (str == 'dotm') {
      fileType = 'application/vnd.ms-word.template.macroEnabled.12';

    } else if (str == 'xls') {
      fileType = 'application/vnd.ms-excel';

    } else if (str == 'xlt') {
      fileType = 'application/vnd.ms-excel';

    } else if (str == 'xla') {
      fileType = 'application/vnd.ms-excel';

    } else if (str == 'xlsx') {
      fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';

    } else if (str == 'xltx') {
      fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.template';

    } else if (str == 'xlsm') {
      fileType = 'application/vnd.ms-excel.sheet.macroEnabled.12';

    } else if (str == 'xltm') {
      fileType = 'application/vnd.ms-excel.template.macroEnabled.12';

    } else if (str == 'xlam') {
      fileType = 'application/vnd.ms-excel.addin.macroEnabled.12';

    } else if (str == 'xlsb') {
      fileType = 'application/vnd.ms-excel.sheet.binary.macroEnabled.12';

    } else if (str == 'ppt') {
      fileType = 'application/vnd.ms-powerpoint';

    } else if (str == 'pot') {
      fileType = 'application/vnd.ms-powerpoint';

    } else if (str == 'pps') {
      fileType = 'application/vnd.ms-powerpoint';

    } else if (str == 'ppa') {
      fileType = 'application/vnd.ms-powerpoint';

    } else if (str == 'pptx') {
      fileType = 'application/vnd.openxmlformats-officedocument.presentationml.presentation';

    } else if (str == 'potx') {
      fileType = 'application/vnd.openxmlformats-officedocument.presentationml.template';

    } else if (str == 'ppsx') {
      fileType = 'application/vnd.openxmlformats-officedocument.presentationml.slideshow';

    } else if (str == 'ppam') {
      fileType = 'application/vnd.ms-powerpoint.addin.macroEnabled.12';

    } else if (str == 'pptm') {
      fileType = 'application/vnd.ms-powerpoint.presentation.macroEnabled.12';

    } else if (str == 'potm') {
      fileType = 'application/vnd.ms-powerpoint.template.macroEnabled.12';

    } else if (str == 'ppsm') {
      fileType = 'application/vnd.ms-powerpoint.slideshow.macroEnabled.12';

    } else if (str == 'txt') {
      fileType = 'text/plain';

    } else {
      fileType = str;
    }
    return fileType;
  }

}









