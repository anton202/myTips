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
myTotalIncome;
myTotalPerHourAvrg;
totalTips;
perHourAvrg;
displayedColumns: string[] = ['תאריך','יום','סה"כ לשעה','סה"כ טיפים'];
dataSource: Array<object> = [
  {date:'13.7.2019',day:'שני',perHour:67,tips:450},
  {date:'13.7.2019',day:'שני',perHour:67,tips:450},
  {date:'13.7.2019',day:'שני',perHour:67,tips:450},
  {date:'13.7.2019',day:'שני',perHour:67,tips:450},
  {date:'13.7.2019',day:'שני',perHour:67,tips:450},
  {date:'13.7.2019',day:'שני',perHour:67,tips:450},
  {date:'13.7.2019',day:'שני',perHour:67,tips:450},
  {date:'13.7.2019',day:'שני',perHour:67,tips:450},
  {date:'13.7.2019',day:'שני',perHour:67,tips:450}
];
months: Array<object> = months;
years: Array<number> = years;


  constructor(private http: HttpClient, private router:Router, public dialog: MatDialog) { }

  ngOnInit() {
    this.http.get<{myTotalIncome,myTotalPerHourAvrg}>(environment.apiUrl+'/stats/myStats/'+localStorage.getItem('userName'))
    .subscribe(myStats => {
      this.myTotalIncome = myStats.myTotalIncome;
      this.myTotalPerHourAvrg = myStats.myTotalPerHourAvrg;
    },
    error =>{
      this.dialog.open(ErrorMessageComponenet,{
        width: '300px'
      })
    })

    this.http.get<{totalTips,perHourAvrg}>(environment.apiUrl + '/stats/waitrsBookStats')
    .subscribe(tips => {
      this.totalTips = tips.totalTips;
      this.perHourAvrg = tips.perHourAvrg;
    },
    error =>{
      this.dialog.open(ErrorMessageComponenet,{
        width: '300px'
      })
    })
  }

  onSubmit(form){
   
    const whosTips = form.whosTips;
    const month = form.month;
    const year = form.year | 2019;
    this.router.navigate(['waitrs-book-log/'+whosTips+'/'+year + '-' + month]);
    }


}
