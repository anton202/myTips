import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material';

import { environment } from '../../../environments/environment';
import { ErrorMessageComponenet } from '../../material/errorMessage/errorMessage.component'
import { months, years } from './date';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.css']
})
export class StatisticsComponent implements OnInit {
  public myTotalIncome: number;
  public myTotalPerHourAvrg: number;
  public perHourAvrg: number;
  public displayedColumns: string[] = ['תאריך', 'שם', 'יום', 'משעה', 'עד שעה', 'סה"כ שעות', 'הפרשה למעסיק', 'סה"כ לשעה', 'סה"כ טיפים'];
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
      month: new FormControl(null),
      year: new FormControl(null)
    })
  }

  public showUserTipsOrAllWaitersTips(){
    if(this.isAllTips){
      this.isAllTips = false;
      this.getUserTipsByYearMonth();
    }else{
      this.isAllTips = true;
      this.getAllWaitersTips();

    }
  }

  private getAllWaitersTips() {
    this.http.get<{tips}>(environment.apiUrl + '/stats/allWaitersTips/' + this.monthYearForm.value.month + '/' + this.monthYearForm.value.year)
      .subscribe(tips => {
        this.isLoadingTips = false;
        this.dataSource = tips.tips;
      },
        error => this.handleError()
      )
  }

  public getUserTipsByYearMonth(): void {
    const month = this.monthYearForm.value.month;
    const year = this.monthYearForm.value.year;
    this.isLoadingTips = true;

    // if show all tips button is clicked then fetch all usesrs tips by month and year.
    if(this.isAllTips){
      return this.getAllWaitersTips();
    }

    setTimeout(()=>{
      this.http.get<{ tips, perHourAvrg, totalTips }>(environment.apiUrl + '/stats/myLog/' + year + '-' + month)
      .subscribe(tips => {
        this.isLoadingTips = false;
        this.myTotalIncome = tips.totalTips;
        this.myTotalPerHourAvrg = tips.perHourAvrg;
        this.dataSource = tips.tips;
      }, error =>{
        this.isLoadingTips = false;
        this.errorLoadingTips = true;
      })
    },3000)
    

      this.getTotalPerHourAvrg(month, year);
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

  private getTotalPerHourAvrg(month?:string, year?:string): void {
    this.http.get<{ totalTips, perHourAvrg }>(environment.apiUrl + '/stats/allWaitersTips/' + month + '/' + year)
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
      },error =>{
        this.isLoadingTips = false;
        this.errorLoadingTips = true;
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
      width: '300px'
    })
  }
}
