import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-work-plan',
  templateUrl: './work-plan.component.html',
  styleUrls: ['./work-plan.component.css']
})
export class WorkPlanComponent implements OnInit {
  requests = [
    {id: 0, name: 'req0', shiftsLength: 5},
    {id: 1, name: 'req1', shiftsLength: 2},
    {id: 2, name: 'req2', shiftsLength: 3},
    {id: 3, name: 'req3', shiftsLength: 4},
    {id: 4, name: 'req4', shiftsLength: 1}
    ];
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
  shiftsReq = [[[]]];
  shiftsReqColors = [[[]]];

  constructor() {
  }

  ngOnInit() {
    let week = [];
    let w = -1, d = 0, s = 0;
    for (const day of this.workingDays) {
      if (day.dayIndex == 0) {
        w++;
        this.shiftsReq[w] = [[]];
        this.shiftsReqColors[w] = [[]];
        week = [];
      }
      week.push(day);
      this.shiftsReq[w][d] = new Array(day.shiftsNumber).fill(null);
      this.shiftsReqColors[w][d] = new Array(day.shiftsNumber).fill(-1);
      d++;
      if (day.dayIndex == 6) {
        d = 0;
        this.workingDaysPerWeek.push(week);
      }
    }

    console.log(this.shiftsReq);

  }

  // drag & drop

  darggedData;

  requestDragged(event: DragEvent, id: number, index: number) {
    this.requests.slice(index, 1);
    this.darggedData = this.getReqWithID(id);
  }

  dropRequest(event, w, d, s) {
    event.preventDefault();
    if (this.darggedData == null || this.shiftsReq[w][d][s] != null){
      let elem = event.target as HTMLDivElement;
      elem.classList.remove('dragOver');
      return;
    }
    let randomColor = this.getRandomColor();
    let numShift = this.darggedData.shiftsLength;
    //add to same day
    for (let i = s; i < this.shiftsReq[w][d].length; i++) {
      if (this.shiftsReq[w][d][i] == null && numShift != 0) {
        this.shiftsReq[w][d][i] = this.darggedData;
        this.shiftsReqColors[w][d][i] = randomColor;
        numShift--;
      }
    }
    //add to next dayes in the week
    if (numShift != 0) {
      for (let di = d + 1; di < this.shiftsReq[w].length; di++) {
        for (let si = 0; si < this.shiftsReq[w][di].length; si++) {
          if (this.shiftsReq[w][di][si] == null && numShift != 0) {
            this.shiftsReq[w][di][si] = this.darggedData;
            this.shiftsReqColors[w][di][si] = randomColor;
            numShift--;
          }
        }
      }
    }

    //add to next week in the week
    if (numShift != 0) {
      for (let wi = w+1; wi < this.shiftsReq.length; wi++) {
        for (let di = 0; di < this.shiftsReq[wi].length; di++) {
          for (let si = 0; si < this.shiftsReq[wi][di].length; si++) {
            if (this.shiftsReq[wi][di][si] == null && numShift != 0) {
              this.shiftsReq[wi][di][si] = this.darggedData;
              this.shiftsReqColors[wi][di][si] = randomColor;
              numShift--;
            }
          }
        }
      }
    }

    console.log(this.shiftsReq);

    //remove req
    if (this.shiftsReq[w][d][s] != null) {
      this.removeReq(this.darggedData);
    }
    this.darggedData = null;
    let elem = event.target as HTMLDivElement;
    elem.classList.remove('dragOver');
  }


  onDragOver(event: DragEvent) {
    event.preventDefault();
  }

  onDragenter(event: DragEvent) {
    if (this.darggedData != null){
      let elem = event.target as HTMLDivElement;
      elem.classList.add('dragOver');
    }

  }

  onDragLeave(event: DragEvent) {
    event.preventDefault();
    let elem = event.target as HTMLDivElement;
    elem.classList.remove('dragOver');
  }

  removeReq(req): void {
    const index = this.requests.indexOf(req, 0);
    this.requests.splice(index, 1);
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
