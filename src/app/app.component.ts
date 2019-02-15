import {Component, ViewEncapsulation} from '@angular/core';
import {DataBaseService} from './services/data-base.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent {
  title = 'angular';
  isTestChecked = false;
  isLabChecked = true;

  halfShiftChecked = false;
  urgentChecked = false;

  isUrgent = false;
  isHalfShift = false;
  requests = ['1','2','3','4','5','6'];

  toggleTest(): void {
    this.isTestChecked = !this.isTestChecked;
    this.isLabChecked = this.isTestChecked ? false : this.isLabChecked;
  }
  toggleLab(): void {
    this.isLabChecked = !this.isLabChecked;
    this.isTestChecked = this.isLabChecked ? false : this.isTestChecked;
  }
  constructor(private dataBaseService:DataBaseService) { }


}
