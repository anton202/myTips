import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material';

import { ErrorMessageComponenet } from '../../material/errorMessage/errorMessage.component';
import { environment } from '../../../environments/environment';
import { WaitrsBookService } from './waiters-book.service';
import { HttpClient } from '@angular/common/http';
import { Waitr } from './waitrObj';

@Component({
  selector: 'app-waiters-book',
  templateUrl: './waiters-book.component.html',
  styleUrls: ['./waiters-book.component.css'],
  providers: [WaitrsBookService]
})
export class WaitersBookComponent implements OnInit {
  private waitrsStack: Array<object> = [];
  public workersNames: Array<string>;
  public calculateTipsForm: FormGroup;
  public isShiftTimeNotSet: boolean = false;
  public isWaitrAdded: boolean = false;
  public calculatingTips: boolean = false;
  public dataSource: Array<object>;
  public displayedColumns: Array<string> = ['סה"כ מזומן', 'הפרשה למעסיק', 'עד שעה', 'משעה', 'שם']
  public barManTip: number;
  public moneyToEmployer: number;
  public tipPerHour: number

  constructor(private waitrsBookService: WaitrsBookService, private http: HttpClient, public dialog: MatDialog) { }

  ngOnInit() {
    this.initializeForms();
    this.waitrsBookService.getWorkersNames()
      .subscribe(workersNames => {
        this.workersNames = workersNames;
      },
        error => {
          this.dialog.open(ErrorMessageComponenet, {
            width: '300px'
          })
        }
      )

  }

  private initializeForms(): void {
    this.calculateTipsForm = new FormGroup({
      totalTips: new FormControl(null, Validators.required),
      waitrsShift: new FormGroup({
        waitrsName: new FormControl(null, Validators.required),
        shiftStartTime: new FormControl(null, Validators.required),
        shiftEndTime: new FormControl(null, Validators.required)
      })
    })
  }

  public addWaitr(): void {
    const waitrsShistFG = this.calculateTipsForm.get('waitrsShift');
    const waitrName = waitrsShistFG.value.waitrsName;
    const shiftStartTime = waitrsShistFG.value.shiftStartTime;
    const shiftEndTime = waitrsShistFG.value.shiftEndTime;

    if (this.calculateTipsForm.get('waitrsShift').valid) {
      this.waitrsStack.push(new Waitr(waitrName,shiftStartTime,shiftEndTime));
      this.isShiftTimeNotSet = false;
      this.isWaitrAdded = true;
      waitrsShistFG.get('waitrsName').reset();
    }

    if (!waitrsShistFG.get('shiftStartTime').valid || !waitrsShistFG.get('shiftEndTime').valid) {
      this.isShiftTimeNotSet = true;
      this.isWaitrAdded = false;
    }

  }


  public calculateTips(): void {
    const totalTip = this.calculateTipsForm.value.totalTips;
    const waitrsStackClone = this.waitrsStack.slice();
    let totalTipMutated = totalTip;

    // calculating each waitr total time that he worked,
    // and then calculating the total time. 
    this.waitrsBookService.setwaitrsTotalTime(waitrsStackClone);
    const totalTime = this.waitrsBookService.calculateTotalTime(waitrsStackClone);

    // subtructing from total tip - barMan tip and moneyToEmployer.
    totalTipMutated -= this.waitrsBookService.barManTip(+totalTip, 10)
    totalTipMutated -= this.waitrsBookService.moneyToEmployer(totalTime, 6)

    //setting barManTip and moneyToEmployer to show to the user.
    this.barManTip = this.waitrsBookService.barManTip(+totalTip, 10);
    this.moneyToEmployer = Math.floor(this.waitrsBookService.moneyToEmployer(totalTime, 6));

    //set all waitrs per hour tip.
    this.waitrsBookService.setWaitrsPerHourTip(waitrsStackClone, totalTime, totalTipMutated);
    this.tipPerHour = this.waitrsBookService.tipPerHour(totalTipMutated,totalTime);

    //set all waitrs total tip.
    this.waitrsBookService.setWaitrsTotalTip(waitrsStackClone);

    //set all waitrs money to employer.
    this.waitrsBookService.setWaitrsMoneyToEmployer(waitrsStackClone)

    console.log(waitrsStackClone)
    //rendering the result to the table.
    this.dataSource = waitrsStackClone;

  }

}
