import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-work-plan',
  templateUrl: './work-plan.component.html',
  styleUrls: ['./work-plan.component.css']
})
export class WorkPlanComponent implements OnInit {
  requests = [
    {id: 0, name: 'req0', shiftsLength: 0.5, isConsecutive: false},
    {id: 5, name: 'req5', shiftsLength: 0.5, isConsecutive: false},
    {id: 1, name: 'req1', shiftsLength: 2, isConsecutive: true},
    {id: 2, name: 'req2', shiftsLength: 3, isConsecutive: true},
    {id: 3, name: 'req3', shiftsLength: 4, isConsecutive: false},
    {id: 6, name: 'req6', shiftsLength: 0.5, isConsecutive: false},
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
      'isWorkingDay': true,
      'shiftsNumber': 3
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
  private draggedShiftPart: string;

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

  draggedData;
  consIndexArray = [];
  draggedShift;
  draggedShiftIndex = {w: 0, d: 0, s: 0};

  requestDragged(event: DragEvent, id: number, index: number) {
    // this.requests.slice(index, 1);
    this.draggedData = this.getReqWithID(id);
  }

  dropRequest(event, w, d, s) {
    event.preventDefault();
    if (this.draggedData == null && this.draggedShift != null) {
      this.dropShift(event, w, d, s);
      this.draggedData = null;
      return;
    }
    //check if drop shift is not full
    if (this.draggedData == null ||
      (this.draggedData.shiftsLength == 0.5 && this.shiftsReq[w][d][s].firstR != null && this.shiftsReq[w][d][s].secondR != null) ||
      (this.draggedData.shiftsLength == 0.5 && this.shiftsReq[w][d][s].firstR != null && this.shiftsReq[w][d][s].firstR.shiftsLength != 0.5) ||
      (this.draggedData.shiftsLength != 0.5 && !(this.shiftsReq[w][d][s].firstR == null && this.shiftsReq[w][d][s].secondR == null))) {
      let elem = event.target as HTMLDivElement;
      elem.classList.remove('dragOver');
      this.draggedData == null ? alert('null request') : alert('shift is full');
      this.draggedData = null;
      return;
    }

    let randomColor = this.getRandomColor();
    let numShift = this.draggedData.shiftsLength;
    let addedSuccessfully = true;
    if (this.draggedData.shiftsLength == 0.5) {
      if (this.shiftsReq[w][d][s].firstR == null) {
        this.shiftsReq[w][d][s].firstR = this.draggedData;
        this.shiftsReqColors[w][d][s].firstR = randomColor;
        numShift -= 0.5;
      } else if (this.shiftsReq[w][d][s].secondR == null && this.shiftsReq[w][d][s].firstR.shiftsLength == 0.5) {
        this.shiftsReq[w][d][s].secondR = this.draggedData;
        this.shiftsReqColors[w][d][s].secondR = randomColor;
        numShift -= 0.5;
      } else {
        addedSuccessfully = false;
      }
    } else {

      numShift = this.fillIndexs(numShift, w, d, s, this.draggedData);
      //fill data in the index's from consIndexArray
      if (this.draggedData.isConsecutive == true && numShift == 0) {
        if (this.areConsecutiveShifts()) {
          addedSuccessfully = this.fillRequestShiftIndex(this.draggedData.shiftsLength, randomColor, this.draggedData);
        } else {
          addedSuccessfully = false;
          alert('not consecutive shifts');
        }

      } else if (this.draggedData.isConsecutive == false && numShift == 0) {
        addedSuccessfully = this.fillRequestShiftIndex(this.draggedData.shiftsLength, randomColor, this.draggedData);

      } else if (numShift != 0) {
        addedSuccessfully = false;
        alert('not enough shifts');
      }

    }

    this.consIndexArray = [];
    if (addedSuccessfully) {
      this.removeReq(this.draggedData);
    }
    this.draggedData = null;
    let elem = event.target as HTMLDivElement;
    elem.classList.remove('dragOver');
  }

  fillIndexs(numShift, w, d, s, draggedData): number {
    for (let wi = w; wi < this.shiftsReq.length && (numShift != 0); wi++) {
      let di = wi == w ? d : 0;
      for (; di < this.shiftsReq[wi].length && (numShift != 0); di++) {
        let si = (wi == w && di == d) ? s : 0;
        for (; si < this.shiftsReq[wi][di].length && (numShift != 0); si++) {
          if (this.shiftsReq[wi][di][si].firstR == null && this.shiftsReq[wi][di][si].secondR == null && draggedData.isConsecutive) {
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
        let j = cd == this.consIndexArray[0].d ? cs : 0;
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

  fillRequestShiftIndex(numShift, randomColor, draggedData): boolean {
    this.consIndexArray.map((index) => {
      this.shiftsReq[index.w][index.d][index.s].firstR = draggedData;
      this.shiftsReqColors[index.w][index.d][index.s].firstR = randomColor;
      numShift--;
    });
    return numShift == 0 ? true : false;
  }

  onDragOver(event: DragEvent) {
    event.preventDefault();
  }

  onDragenter(event: DragEvent) {
    if (this.draggedData != null) {
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

  shiftDragged($event, w, d, s, shiftPart) {
    this.draggedShift = this.shiftsReq[w][d][s];
    this.draggedShiftIndex = {w: w, d: d, s: s};
    this.draggedShiftPart = shiftPart;
  }

  dropShift(event, newW: number, newD: number, newS: number) {
    let oldRequest;
    let oldColor;

    if (this.draggedShiftPart.localeCompare('firstHalf') == 0) {
      oldRequest = this.shiftsReq[this.draggedShiftIndex.w][this.draggedShiftIndex.d][this.draggedShiftIndex.s].firstR;
      oldColor = this.shiftsReqColors[this.draggedShiftIndex.w][this.draggedShiftIndex.d][this.draggedShiftIndex.s].firstR;

    } else if (this.draggedShiftPart.localeCompare('secondHalf') == 0) {
      oldRequest = this.shiftsReq[this.draggedShiftIndex.w][this.draggedShiftIndex.d][this.draggedShiftIndex.s].secondR;
      oldColor = this.shiftsReqColors[this.draggedShiftIndex.w][this.draggedShiftIndex.d][this.draggedShiftIndex.s].secondR;

    }

    if (oldRequest.shiftsLength == 0.5 && this.shiftsReq[newW][newD][newS].firstR != null && this.shiftsReq[newW][newD][newS].secondR != null ||
      (oldRequest.shiftsLength == 0.5 && this.shiftsReq[newW][newD][newS].firstR != null && this.shiftsReq[newW][newD][newS].firstR.shiftsLength != 0.5) ||
      (oldRequest.shiftsLength != 0.5 && (this.shiftsReq[newW][newD][newS].firstR != null || this.shiftsReq[newW][newD][newS].secondR != null))) {

      alert('this shift is full ');
      this.draggedShiftPart = '';
      this.draggedShiftIndex = {w: null, d: null, s: null};
      this.draggedShift = null;
      return;
    }

    if (oldRequest.isConsecutive == false && oldRequest.shiftsLength != 0.5) {
      this.shiftsReq[newW][newD][newS].firstR = oldRequest;
      this.shiftsReqColors[newW][newD][newS].firstR = oldColor;
      this.shiftsReq[this.draggedShiftIndex.w][this.draggedShiftIndex.d][this.draggedShiftIndex.s].firstR = null;
      this.shiftsReqColors[this.draggedShiftIndex.w][this.draggedShiftIndex.d][this.draggedShiftIndex.s].firstR = null;
    } else if (oldRequest.shiftsLength == 0.5) {

      if (this.shiftsReq[newW][newD][newS].firstR == null) {
        this.shiftsReq[newW][newD][newS].firstR = oldRequest;
        this.shiftsReqColors[newW][newD][newS].firstR = oldColor;
      } else {
        this.shiftsReq[newW][newD][newS].secondR = oldRequest;
        this.shiftsReqColors[newW][newD][newS].secondR = oldColor;
      }

      if (this.draggedShiftPart.localeCompare('firstHalf') == 0) {
        this.shiftsReq[this.draggedShiftIndex.w][this.draggedShiftIndex.d][this.draggedShiftIndex.s].firstR = null;
        this.shiftsReqColors[this.draggedShiftIndex.w][this.draggedShiftIndex.d][this.draggedShiftIndex.s].firstR = null;
      } else {
        this.shiftsReq[this.draggedShiftIndex.w][this.draggedShiftIndex.d][this.draggedShiftIndex.s].secondR = null;
        this.shiftsReqColors[this.draggedShiftIndex.w][this.draggedShiftIndex.d][this.draggedShiftIndex.s].secondR = null;
      }

    } else {
      let numShift = this.fillIndexs(oldRequest.shiftsLength, newW, newD, newS, this.draggedShift);
      if (this.areConsecutiveShifts() && numShift == 0) {

        for (let wi = 0; wi < this.shiftsReq.length; wi++) {
          for (let di = 0; di < this.shiftsReq[wi].length; di++) {
            for (let si = 0; si < this.shiftsReq[wi][di].length; si++) {
               if(this.shiftsReq[wi][di][si].firstR!=null && this.shiftsReq[wi][di][si].firstR.id==oldRequest.id){
                 this.shiftsReq[wi][di][si].firstR=null;
               }
            }
          }
        }

        this.fillRequestShiftIndex(oldRequest.shiftsLength, oldColor, oldRequest);

      } else {
        alert('there is no consecutive shifts');
      }
      this.consIndexArray = [];
    }

    this.draggedShiftPart = '';
    this.draggedShiftIndex = {w: null, d: null, s: null};
    this.draggedShift = null;
  }

  dragShiftEnd() {
    this.draggedShiftPart = '';
    this.draggedShiftIndex = {w: null, d: null, s: null};
    this.draggedShift = null;
  }


  dragRequestEnd() {
    this.draggedData = null;
  }
}











