import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-work-plan',
  templateUrl: './work-plan.component.html',
  styleUrls: ['./work-plan.component.css']
})
export class WorkPlanComponent implements OnInit {

  workingDays=[
    {
      "dayIndex": 0,
      "id": 0,
      "isWorkingDay": true,
      "shiftsNumber": 3
    },
    {
      "dayIndex": 1,
      "id": 0,
      "isWorkingDay": true,
      "shiftsNumber": 2
    },
    {
      "dayIndex": 2,
      "id": 0,
      "isWorkingDay": true,
      "shiftsNumber": 3
    },
    {
      "dayIndex": 3,
      "id": 0,
      "isWorkingDay": true,
      "shiftsNumber": 2
    },
    {
      "dayIndex": 4,
      "id": 0,
      "isWorkingDay": true,
      "shiftsNumber": 1
    },
    {
      "dayIndex": 5,
      "id": 0,
      "isWorkingDay": false,
      "shiftsNumber": 0
    },
    {
      "dayIndex": 6,
      "id": 0,
      "isWorkingDay": false,
      "shiftsNumber": 0
    },
    {
      "dayIndex": 0,
      "id": 0,
      "isWorkingDay": true,
      "shiftsNumber": 2
    },
    {
      "dayIndex": 1,
      "id": 0,
      "isWorkingDay": true,
      "shiftsNumber": 2
    },
    {
      "dayIndex": 2,
      "id": 0,
      "isWorkingDay": false,
      "shiftsNumber": 0
    },
    {
      "dayIndex": 3,
      "id": 0,
      "isWorkingDay": true,
      "shiftsNumber": 1
    },
    {
      "dayIndex": 4,
      "id": 0,
      "isWorkingDay": true,
      "shiftsNumber": 1
    },
    {
      "dayIndex": 5,
      "id": 0,
      "isWorkingDay": true,
      "shiftsNumber": 2
    },
    {
      "dayIndex": 6,
      "id": 0,
      "isWorkingDay": false,
      "shiftsNumber": 0
    }
  ];
  workingDaysPerWeek=[];
  constructor() { }

  ngOnInit() {
    var week=[];
    for(let day of this.workingDays){
      if(day.dayIndex==0){
        week=[];
      }
      week.push(day);
      if(day.dayIndex==6){
         this.workingDaysPerWeek.push(week);
      }

    }

  }

}
