import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-work-plan',
  templateUrl: './work-plan.component.html',
  styleUrls: ['./work-plan.component.css']
})
export class WorkPlanComponent implements OnInit {
  requests = [{id: 0, name: 'req0',shiftsLength:1}, {id: 1, name: 'req1',shiftsLength:1}, {id: 2, name: 'req2',shiftsLength:2}];
  workingDays = [
    {
      'dayIndex': 0,
      'id': 0,
      'isWorkingDay': true,
      'shiftsNumber': 3
    },
    {
      'dayIndex': 1,
      'id': 0,
      'isWorkingDay': true,
      'shiftsNumber': 2
    },
    {
      'dayIndex': 2,
      'id': 0,
      'isWorkingDay': true,
      'shiftsNumber': 3
    },
    {
      'dayIndex': 3,
      'id': 0,
      'isWorkingDay': true,
      'shiftsNumber': 2
    },
    {
      'dayIndex': 4,
      'id': 0,
      'isWorkingDay': true,
      'shiftsNumber': 1
    },
    {
      'dayIndex': 5,
      'id': 0,
      'isWorkingDay': false,
      'shiftsNumber': 0
    },
    {
      'dayIndex': 6,
      'id': 0,
      'isWorkingDay': false,
      'shiftsNumber': 0
    },
    {
      'dayIndex': 0,
      'id': 0,
      'isWorkingDay': true,
      'shiftsNumber': 2
    },
    {
      'dayIndex': 1,
      'id': 0,
      'isWorkingDay': true,
      'shiftsNumber': 2
    },
    {
      'dayIndex': 2,
      'id': 0,
      'isWorkingDay': false,
      'shiftsNumber': 0
    },
    {
      'dayIndex': 3,
      'id': 0,
      'isWorkingDay': true,
      'shiftsNumber': 1
    },
    {
      'dayIndex': 4,
      'id': 0,
      'isWorkingDay': true,
      'shiftsNumber': 1
    },
    {
      'dayIndex': 5,
      'id': 0,
      'isWorkingDay': true,
      'shiftsNumber': 2
    },
    {
      'dayIndex': 6,
      'id': 0,
      'isWorkingDay': false,
      'shiftsNumber': 0
    }
  ];
  workingDaysPerWeek = [];
  shiftsReqID = [[[]]];
  shiftsReqColors = [[[]]];

  constructor() {
  }

  ngOnInit() {
    let week = [];
    let w = -1, d = 0, s = 0;
    for (const day of this.workingDays) {
      if (day.dayIndex == 0) {
        w++;
        this.shiftsReqID[w] = [[]];
        this.shiftsReqColors[w] = [[]];
        week = [];
      }
      week.push(day);
      this.shiftsReqID[w][d] = new Array(day.shiftsNumber).fill(-1);
      this.shiftsReqColors[w][d] = new Array(day.shiftsNumber).fill(-1);
      d++;
      if (day.dayIndex == 6) {
        d = 0;
        this.workingDaysPerWeek.push(week);
      }
    }

    console.log(this.shiftsReqID);

  }

  // drag & drop

  darggedData;
  darggedDataID;

  requestDragged(event: DragEvent, id: number, index: number) {
    this.requests.slice(index, 1);
    this.darggedDataID = id;
    this.darggedData = this.getReqWithID(id);
  }

  dropRequest(event, w, d, s) {
    event.preventDefault();
    let randomColor = this.getRandomColor();
    // let numShift = this.darggedData.shiftsLength;
    this.shiftsReqID[w][d][s] = this.darggedDataID;
    this.shiftsReqColors[w][d][s] = randomColor;

    if (this.shiftsReqID[w][d][s] != -1) {
      this.removeElementWithId(this.darggedDataID, this.requests);
    }

    event.target.classList.remove('dragOver');

  }

  onDragOver(event: DragEvent) {
    event.preventDefault();
  }

  onDragenter(event: DragEvent) {
    event.target.classList.add('dragOver');
  }

  onDragLeave(event: DragEvent) {
    event.preventDefault();
    event.target.classList.remove('dragOver');
  }

  removeElementWithId(id: number, array: []): void {
    array.map((req) => {
      if (req.id == id) {
        const index = array.indexOf(req, 0);
        array.splice(index, 1);
      }
    });
  }

  getReqWithID(id: number) {
    var relem = null;
    this.requests.map((elem) => {
      if (elem.id == id) {
        relem = elem;
      }
    });
    return relem;
  }

  getRandomColor() {
    var color = Math.floor(0x1000000 * Math.random()).toString(16);
    return '#' + ('000000' + color).slice(-6);
  }
}
