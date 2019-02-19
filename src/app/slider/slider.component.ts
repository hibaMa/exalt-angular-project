import { Component, OnInit,Input } from '@angular/core';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.css']
})
export class SliderComponent implements OnInit {
  @Input() items: [];
  slide={count:0,marginLeft:0,marginRight:0,width:0,slideToSHow:3,left:0,widthIncMargin:0,index:0};
  initSlider():void {
    this.slide.marginLeft = 10;
    this.slide.marginRight = 10;
    this.slide.width = 170;
    this.slide.count = this.items.length;
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
