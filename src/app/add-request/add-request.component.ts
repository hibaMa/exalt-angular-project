import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import * as jQuery from 'jquery';

@Component({
  selector: 'app-add-request',
  templateUrl: './add-request.component.html',
  styleUrls: ['./add-request.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class AddRequestComponent implements OnInit {

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


  //slider-function
  slide={count:0,marginLeft:0,marginRight:0,width:0,slideToSHow:3,left:0,widthIncMargin:0,index:0};
  initSlider():void {
    this.slide.marginLeft = parseInt($('.slider ul li').css('marginLeft'), 10);
    this.slide.marginRight = parseInt($('.slider ul li').css('marginRight'), 10);
    this.slide.width = $('.slider ul li').width();
    this.slide.count = $('.slider ul li').length;
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
  constructor() { }


  ngOnInit() {
    this.initSlider();
  }



}









