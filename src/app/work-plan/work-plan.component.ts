import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-work-plan',
  templateUrl: './work-plan.component.html',
  styleUrls: ['./work-plan.component.css']
})
export class WorkPlanComponent implements OnInit {
  requests = [
    {id: 0, name: 'req0', shiftsLength: 0.5, isConsecutive: false},
    {id: 5, name: 'req0', shiftsLength: 0.5, isConsecutive: true},
    {id: 7, name: 'req0', shiftsLength: 0.5, isConsecutive: true},
    {id: 8, name: 'req0', shiftsLength: 0.5, isConsecutive: true},
    {id: 6, name: 'req0', shiftsLength: 5, isConsecutive: true},
    {id: 1, name: 'req1', shiftsLength: 2, isConsecutive: true},
    {id: 2, name: 'req2', shiftsLength: 3, isConsecutive: true},
    {id: 3, name: 'req3', shiftsLength: 4, isConsecutive: false},
    {id: 4, name: 'req4', shiftsLength: 1, isConsecutive: false}
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
      this.shiftsReq[w][d] = new Array(day.shiftsNumber).fill(null).map(() => ({firstR: null, secondR: null}));
      this.shiftsReqColors[w][d] = new Array(day.shiftsNumber).fill(null).map(() => ({firstR: null, secondR: null}));
      d++;
      if (day.dayIndex == 6) {
        d = 0;
        this.workingDaysPerWeek.push(week);
      }
    }

  }

  // drag & drop

  darggedData;
  consIndexArray = [];

  requestDragged(event: DragEvent, id: number, index: number) {
    // this.requests.slice(index, 1);
    this.darggedData = this.getReqWithID(id);
  }

  dropRequest(event, w, d, s) {
    event.preventDefault();
    //check if drop shift is not full
    if (this.darggedData == null || (this.shiftsReq[w][d][s].firstR != null && this.shiftsReq[w][d][s].secondR != null && this.darggedData.shiftsLength == 0.5) ||
      (this.darggedData.shiftsLength == 0.5 && this.shiftsReq[w][d][s].firstR != null && this.shiftsReq[w][d][s].firstR.shiftsLength != 0.5) ||
      (this.shiftsReq[w][d][s].firstR != null && this.darggedData.shiftsLength != 0.5)) {
      let elem = event.target as HTMLDivElement;
      elem.classList.remove('dragOver');
      alert('shift is full');
      return;
    }

    let randomColor = this.getRandomColor();
    let numShift = this.darggedData.shiftsLength;
    let addedSuccessfully = true;
    if (this.darggedData.shiftsLength == 0.5) {
      if (this.shiftsReq[w][d][s].firstR == null) {
        this.shiftsReq[w][d][s].firstR = this.darggedData;
        this.shiftsReqColors[w][d][s].firstR = randomColor;
        numShift -= 0.5;
      } else if (this.shiftsReq[w][d][s].secondR == null && this.shiftsReq[w][d][s].firstR.shiftsLength == 0.5) {
        this.shiftsReq[w][d][s].secondR = this.darggedData;
        this.shiftsReqColors[w][d][s].secondR = randomColor;
        numShift -= 0.5;
      }else{
        addedSuccessfully = false;
      }
    } else {

      numShift = this.fillIndexs(numShift, randomColor, w, d, s);
      //fill data in the index's from consIndexArray
      if (this.darggedData.isConsecutive == true && numShift == 0) {
        let x= this.areConsecutiveShifts();
        if (this.areConsecutiveShifts()) {
          addedSuccessfully = this.fillRequestShiftIndex(this.darggedData.shiftsLength, randomColor);
        } else {
          addedSuccessfully = false;
          alert('not consecutive shifts');
        }

      } else if (this.darggedData.isConsecutive == false && numShift == 0) {
        addedSuccessfully = this.fillRequestShiftIndex(this.darggedData.shiftsLength, randomColor);

      } else if (numShift != 0) {
        addedSuccessfully=false;
        alert('not enough shifts');
      }

    }

    this.consIndexArray = [];
    if (addedSuccessfully) {
      this.removeReq(this.darggedData);
    }
    this.darggedData = null;
    let elem = event.target as HTMLDivElement;
    elem.classList.remove('dragOver');
  }

  fillIndexs(numShift, randomColor, w, d, s): number {
    for (let wi = w; wi < this.shiftsReq.length && (numShift != 0); wi++) {
      let di = wi == w ? d : 0;
      for (; di < this.shiftsReq[wi].length && (numShift != 0); di++) {
        let si = (wi == w && di == d) ? s : 0;
        for (; si < this.shiftsReq[wi][di].length && (numShift != 0); si++) {
          if (this.shiftsReq[wi][di][si].firstR == null && this.shiftsReq[wi][di][si].secondR == null && this.darggedData.isConsecutive) {
            //add available index's to the consIndexArray array
            let consIndex = {w: wi, d: di, s: si};
            this.consIndexArray.push(consIndex);
            numShift--;
          } else if (this.shiftsReq[wi][di][si].firstR == null && this.shiftsReq[wi][di][si].secondR == null) {
            let consIndex = {w: wi, d: di, s: si};
            this.consIndexArray.push(consIndex);
            numShift--;
          }
        }
      }
    }
    return numShift;
  }

  areConsecutiveShifts(): boolean {
    let canAddConsecutiveReq = true;
    let cw = this.consIndexArray[0].w, cd = this.consIndexArray[0].d, cs = this.consIndexArray[0].s;
    for (let i = 1; i < this.consIndexArray.length && canAddConsecutiveReq; i++) {
      //same week and day
      if (this.consIndexArray[i].w == cw && this.consIndexArray[i].d == cd) {
        if (this.consIndexArray[i].s - this.consIndexArray[i - 1].s != 1) {
          canAddConsecutiveReq = false;
          break;
        }
      }
      //same week
      else if (this.consIndexArray[i].w == cw && this.consIndexArray[i].d - cd == 1 && this.consIndexArray[i].s == 0) {
        let j = cd==this.consIndexArray[0].d?cs:0;
        for (; j < this.shiftsReq[cw][cd].length; j++) {
          if (this.containsShiftIndexObject({w: cw, d: cd, s: j}, this.consIndexArray) == false) {
            canAddConsecutiveReq = false;
            break;
          }
        }
        cd = this.consIndexArray[i].d;
      } else {
        canAddConsecutiveReq = false;
        break;
      }
    }
    return canAddConsecutiveReq;
  }

  fillRequestShiftIndex(numShift, randomColor): boolean {
    this.consIndexArray.map((index) => {
      this.shiftsReq[index.w][index.d][index.s].firstR = this.darggedData;
      this.shiftsReqColors[index.w][index.d][index.s].firstR = randomColor;
      numShift--;
    });
    return numShift == 0 ? true : false;
  }

  onDragOver(event: DragEvent) {
    event.preventDefault();
  }

  onDragenter(event: DragEvent) {
    if (this.darggedData != null) {
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
    let relem = null;
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

  containsShiftIndexObject(obj, list) {
    var i;
    for (i = 0; i < list.length; i++) {
      if (list[i].w === obj.w && list[i].d === obj.d && list[i].s === obj.s) {
        return true;
      }
    }
    return false;
  }
}
