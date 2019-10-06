import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material';

import { environment } from '../../../environments/environment';
import { ErrorMessageComponenet } from '../../material/errorMessage/errorMessage.component'
import { months, years } from './date';
import { ConfirmationDialog } from '../../material/confirmationDailog/confirmationDialog.component';


@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.scss']
})
export class StatisticsComponent implements OnInit {
  public myTotalIncome: number;
  public myTotalPerHourAvrg: number;
  public perHourAvrg: number;
  public displayedColumns: string[] = ['תאריך', 'שם', 'משעה', 'עד שעה', 'סה"כ שעות', 'הפרשה למעסיק', 'סה"כ לשעה', 'סה"כ טיפים'];
  public dataSource: Array<object>;
  public months: Array<object> = months;
  public years: Array<number> = years;
  public isTableExpanded: boolean = false;
  public monthYearForm: FormGroup;
  public isAllTips: boolean = false;
  public isLoadingTips: boolean;
  public errorLoadingTips: boolean = false;

  constructor(private http: HttpClient, private router: Router, public dialog: MatDialog) { }

  ngOnInit() {
    this.initializeForm()
    this.getUserStats();
    this.getTotalPerHourAvrg();
    this.getUserThisMonthTips()
  }

  private initializeForm() {
    this.monthYearForm = new FormGroup({
      month: new FormControl(null,Validators.required),
      year: new FormControl(null,Validators.required)
    })
  }

  public showUserTipsOrAllWaitersTips() {
    if (this.isAllTips) {
      this.isAllTips = false;
      this.getUserTipsByYearMonth();
    } else {
      this.isAllTips = true;
      this.getAllWaitersTips();
    }
  }

  private getAllWaitersTips() {
    const date =  new Date();
    const month = this.monthYearForm.value.month || date.getMonth();
    const year = this.monthYearForm.value.year || date.getFullYear();
   
    this.http.get<{ tips }>(environment.apiUrl + '/stats/allWaitersTips/' + year + '-' + month)
      .subscribe(tips => {
        this.isLoadingTips = false;
        this.dataSource = tips.tips;
      },
        error => this.handleError()
      )
  }

  public getUserTipsByYearMonth(): void {
    const date =  new Date();
    const month = this.monthYearForm.value.month || date.getMonth();
    const year = this.monthYearForm.value.year || date.getFullYear();
    this.isLoadingTips = true;
   
    // if show all tips button is clicked then fetch all usesrs tips by month and year.
    if (this.isAllTips) {
     this.getAllWaitersTips();
    }
    
    this.getTotalPerHourAvrg();
    this.http.get<{ tips, perHourAvrg, totalTips }>(environment.apiUrl + '/stats/myLog/' + year + '-' + month)
      .subscribe(tips => {
        this.isLoadingTips = false;
        this.myTotalIncome = tips.totalTips;
        this.myTotalPerHourAvrg = tips.perHourAvrg;
        if(this.isAllTips) return;
        this.dataSource = tips.tips;
      }, error => {
        this.isLoadingTips = false;
        this.errorLoadingTips = true;
      })
  }

  private getUserStats(): void {
    this.http.get<{ myTotalIncome, myTotalPerHourAvrg }>(environment.apiUrl + '/stats/myStats/' + localStorage.getItem('userName'))
      .subscribe(myStats => {
        this.myTotalIncome = myStats.myTotalIncome;
        this.myTotalPerHourAvrg = myStats.myTotalPerHourAvrg;
      },
        error => {
          this.handleError()
        })
  }

  private getTotalPerHourAvrg(): void {
    const date =  new Date();
    const month = this.monthYearForm.value.month || date.getMonth();
    const year = this.monthYearForm.value.year || date.getFullYear();

    this.http.get<{ totalTips, perHourAvrg }>(environment.apiUrl + '/stats/allWaitersTips/' + year + '-' + month)
      .subscribe(tips => {
        this.perHourAvrg = tips.perHourAvrg;
      },
        error => {
          this.handleError();
        })
  }

  private getUserThisMonthTips(): void {
    this.isLoadingTips = true;
    this.http.get<[{}]>(environment.apiUrl + '/stats/thisMonthTips/' + localStorage.getItem('userName'))
      .subscribe(tips => {
        this.isLoadingTips = false
        this.dataSource = tips;
      }, error => {
        this.isLoadingTips = false;
        this.errorLoadingTips = true;
      })
  }

  public deleteTip(data: { _id }): void {
    const dialogRef = this.dialog.open(ConfirmationDialog);
    dialogRef.afterClosed().subscribe(actionConfirmed => {
      if (actionConfirmed) {
        this.http.delete(environment.apiUrl + '/myTips/deleteTip/' + data._id)
          .subscribe(() => {
            // delteing tip on the user side (fetching tips from server is more complicated)
            this.dataSource.forEach((tip: { _id }, index) => {
              if (tip._id === data._id) {
                this.dataSource.splice(index, 1)
                let cloned = this.dataSource.slice();
                this.dataSource = [...cloned];
              }
            })
          },
            error => this.handleError())
      }
    })
  }

  public expandTable() {
    if (!this.isTableExpanded) {
      this.isTableExpanded = true;
    } else {
      this.isTableExpanded = false;
    }
  }

  private handleError(): void {
    this.dialog.open(ErrorMessageComponenet, {
      width: '300px',
      data: 'עליך להתחבר או להרשם כדי לראות את הטיפים שלך'
    })
  }

  
}
