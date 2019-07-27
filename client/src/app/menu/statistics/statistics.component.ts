import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material';

import { environment } from '../../../environments/environment';
import { ErrorMessageComponenet } from '../../material/errorMessage/errorMessage.component'
import { months, years } from './date';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.css']
})
export class StatisticsComponent implements OnInit {
  public myTotalIncome: number;
  public myTotalPerHourAvrg: number;
  public perHourAvrg: number;
  public displayedColumns: string[] = ['תאריך', 'יום', 'סה"כ לשעה', 'סה"כ טיפים'];
  public dataSource: Array<object>;
  public months: Array<object> = months;
  public years: Array<number> = years;

  constructor(private http: HttpClient, private router: Router, public dialog: MatDialog) { }

  ngOnInit() {
    this.getUserStats();
    this.getTotalPerHourAvrg();
    this.getUserTips()
  }

  onSubmit(form) {
    const whosTips = form.whosTips;
    const month = form.month;
    const year = form.year | 2019;
    this.router.navigate(['waitrs-book-log/' + whosTips + '/' + year + '-' + month]);
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
    this.http.get<{ totalTips, perHourAvrg }>(environment.apiUrl + '/stats/waitrsBookStats')
      .subscribe(tips => {
        this.perHourAvrg = tips.perHourAvrg;
      },
        error => {
          this.handleError();
        })
  }

  private getUserTips(): void{
    this.http.get<[{}]>(environment.apiUrl + '/stats/thisMonthTips/'  + localStorage.getItem('userName'))
      .subscribe(tips =>{
        this.dataSource = tips;
        console.log(tips)
      })
  }


  private handleError(): void {
    this.dialog.open(ErrorMessageComponenet, {
      width: '300px'
    })
  }
}
