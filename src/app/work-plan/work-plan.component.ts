import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-work-plan',
  templateUrl: './work-plan.component.html',
  styleUrls: ['./work-plan.component.css']
})
export class WorkPlanComponent implements OnInit {
  requests = [
    {id: 0, name: 'req0', shiftsLength: 0.5},
    {id: 5, name: 'req0', shiftsLength: 0.5},
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
      this.shiftsReq[w][d] = new Array(day.shiftsNumber).fill(null).map(()=> ({firstR:null,secondR:null}));
      this.shiftsReqColors[w][d] = new Array(day.shiftsNumber).fill(null).map(()=> ({firstR:null,secondR:null}));
      d++;
      if (day.dayIndex == 6) {
        d = 0;
        this.workingDaysPerWeek.push(week);
      }
    }

  }

  // drag & drop

  darggedData;

  requestDragged(event: DragEvent, id: number, index: number) {
    this.requests.slice(index, 1);
    this.darggedData = this.getReqWithID(id);
  }

  dropRequest(event, w, d, s) {
    event.preventDefault();
    if (this.darggedData == null || this.shiftsReq[w][d][s].firstR != null&&this.shiftsReq[w][d][s].secondR){
      let elem = event.target as HTMLDivElement;
      elem.classList.remove('dragOver');
      return;
    }
    let randomColor = this.getRandomColor();
    let numShift = this.darggedData.shiftsLength;
    if (numShift != 0) {
      for (let wi = w; wi < this.shiftsReq.length && (numShift != 0); wi++) {
        let di = wi==w?d:0;
        for (; di < this.shiftsReq[wi].length && (numShift != 0); di++) {
          let si = (wi==w && di==d)?s:0;
          for (; si < this.shiftsReq[wi][di].length; si++) {
            if(numShift == 0)break;
            if(this.darggedData.shiftsLength==0.5 && this.shiftsReq[wi][di][si].firstR==null){
              this.shiftsReq[wi][di][si].firstR = this.darggedData;
              this.shiftsReqColors[wi][di][si].firstR = randomColor;
              numShift-=0.5;
            }else if(this.darggedData.shiftsLength==0.5 && this.shiftsReq[wi][di][si].secondR==null && this.shiftsReq[wi][di][si].firstR.shiftsLength==0.5){
              this.shiftsReq[wi][di][si].secondR = this.darggedData;
              this.shiftsReqColors[wi][di][si].secondR = randomColor;
              numShift-=0.5;
            }else if(this.shiftsReq[wi][di][si].firstR==null && this.shiftsReq[wi][di][si].secondR==null){
              this.shiftsReq[wi][di][si].firstR = this.darggedData;
              this.shiftsReqColors[wi][di][si].firstR = randomColor;
              numShift--;
            }
          }
        }
      }
    }
    console.log(this.shiftsReq);
    //remove req
    if (numShift == 0){
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
