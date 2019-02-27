import { Component, OnInit } from '@angular/core';
import {data} from '../constant';
import {DataBaseService} from '../services/data-base.service';
import {SliderService} from '../services/slider.service';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.css']
})
export class SliderComponent implements OnInit {

  baseURL:string=data.baseURL;

  slide={count:0,marginLeft:0,marginRight:0,width:0,slideToSHow:3,left:0,widthIncMargin:0,index:0};
  initSlider():void {
    this.slide.marginLeft = 10;
    this.slide.marginRight = 10;
    this.slide.width = 170;
    this.slide.count =  this.sliderService.pressesArray ?this.sliderService.pressesArray .length:0;
    this.slide.left = parseInt($('.slider ul').css('left'), 10);
    this.slide.widthIncMargin=this.slide.width+this.slide.marginLeft+this.slide.marginRight;

    var sliderUlWidth = this.slide.count * this.slide.widthIncMargin
    $('.slider ul').css({ width: sliderUlWidth });
  }

  sliderLeftArrow():void{
    var sliderLeft=parseInt($('.slider ul').css('left'), 10);
    if(this.slide.index>0){
      $('.slider ul').animate({
        left:sliderLeft+(this.slide.widthIncMargin*this.slide.slideToSHow)
      });
      this.slide.index--;
    }

  }
  sliderRightArrow():void{
    var sliderLeft=parseInt($('.slider ul').css('left'), 10);
    if(this.slide.index<(this.slide.count/this.slide.slideToSHow)-1) {
      $('.slider ul').animate({
        left: sliderLeft - (this.slide.width + this.slide.marginLeft + this.slide.marginRight) * this.slide.slideToSHow
      });
      this.slide.index++;
    }
  }
  constructor(private dataBaseService:DataBaseService,public sliderService: SliderService) { }
  saveSelectedItem(index:number):void{
    this.sliderService.isPressSelected[index]=!this.sliderService.isPressSelected[index];
    if(this.sliderService.isPressSelected[index]){
      this.sliderService.chosenPressesArray.push(this.sliderService.pressesArray [index]);
    }else{
      this.sliderService.chosenPressesArray.splice( this.sliderService.chosenPressesArray.indexOf(this.sliderService.pressesArray [index]), 1);
    }
  }

  ngOnInit() {
    this.dataBaseService.getAvailablePresses().subscribe(
      (presses)=>{
        this.sliderService.pressesArray =presses;
        for(var i = 0; i < this.sliderService.pressesArray.length; i++) {
          this.sliderService.isPressSelected.push(false);
        }
        this.initSlider();
      }
    );

  }

}
