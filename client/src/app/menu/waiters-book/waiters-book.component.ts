import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { HttpClient } from '@angular/common/http';

import { ConfirmationDialog } from '../../material/confirmationDailog/confirmationDialog.component';
import { ErrorMessageComponenet } from '../../material/errorMessage/errorMessage.component';
import { WaitrsBookService } from './waiters-book.service';
import { Waitr } from './waitrObj';
import { SignInComponent } from '../../auth/sign-in/sign-in.component';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-waiters-book',
  templateUrl: './waiters-book.component.html',
  styleUrls: ['./waiters-book.component.css'],
  providers: [WaitrsBookService]
})
export class WaitersBookComponent implements OnInit {
  public waitrsStack: Array<object> = [];
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
  public isTipsCalculated: boolean = false;
  public recalculatingTips: boolean = false;
  public isUserLogdIn: string;

  constructor(private waitrsBookService: WaitrsBookService, private http: HttpClient, public dialog: MatDialog, private store: Store<{auth:{user}}>) { }

  ngOnInit() {
    this.initializeForms();
    this.store.select('auth')
      .subscribe(user =>{
        this.isUserLogdIn = user.user;
      })
  }

  private getWaitrsNames(): void {
    this.waitrsBookService.getWorkersNames()
      .subscribe(
        workersNames => this.workersNames = workersNames,
        error => this.handelError('משהו השתבש כשניסינו לדלות את השמות של המלצרים מהשרת, נסה שוב.')
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
      this.waitrsStack.push(new Waitr(waitrName, shiftStartTime, shiftEndTime));
      this.isShiftTimeNotSet = false;
      this.isWaitrAdded = true;
      waitrsShistFG.get('waitrsName').reset();
    }

    if (!waitrsShistFG.get('shiftStartTime').valid || !waitrsShistFG.get('shiftEndTime').valid) {
      this.isShiftTimeNotSet = true;
      this.isWaitrAdded = false;
    }

  }

  public confirmDeleteWaitr(waitrData) {
    const dialogRef = this.dialog.open(ConfirmationDialog);
    dialogRef.afterClosed().subscribe(isActionConfirmed => {
      if (isActionConfirmed) {
        this.deleteWaitr(waitrData)
      }
    })
  }

  private deleteWaitr(waitrToDelete): void {
    this.waitrsStack.forEach((waitr: { name }, index) => {
      if (waitr.name === waitrToDelete.name) {
        this.waitrsStack.splice(index, 1);
      }
    })

    //recalculate tips && display spinner and "recalculating tips" text while recalculating.
    this.calculatingTips = true;
    this.isTipsCalculated = false;
    this.recalculatingTips = true
    setTimeout(() => {
      this.calculateTips();
      // rerender tips table
      this.dataSource = [...this.waitrsStack];
      if (this.waitrsStack.length <= 0) {
        this.isTipsCalculated = false;
      } else {
        this.isTipsCalculated = true;
      }
      this.calculatingTips = false;
      this.recalculatingTips = false;
    }, 2000)
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
    this.tipPerHour = this.waitrsBookService.tipPerHour(totalTipMutated, totalTime);

    //set all waitrs total tip.
    this.waitrsBookService.setWaitrsTotalTip(waitrsStackClone);

    //set all waitrs money to employer.
    this.waitrsBookService.setWaitrsMoneyToEmployer(waitrsStackClone)

    //rendering the result to the table.
    this.dataSource = waitrsStackClone;

    // show calculation to user.
    this.isTipsCalculated = true;

    //send calculated tips to the server.
    this.saveCalculatedTips(waitrsStackClone);
  }

  private saveCalculatedTips(waitrsStack): void {
    this.waitrsBookService.sendDataToServer(waitrsStack)
      .subscribe(
        () => { },
        error => this.handelError('משהו השתבש כשניסינו לשמור את הטיפים על השרת, נסה שוב.')
      )
  }

  public isUserLogedIn(): void {
    if (!this.isUserLogdIn) {
     this.dialog.open(SignInComponent);
    }else{
      this.getWaitrsNames();
    }
    }
  
    private handelError(errorMessage: string): void{
      this.dialog.open(ErrorMessageComponenet, {
        width: '300px',
        data: errorMessage
      })
    }
}
