import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../../environments/environment';
import { Router } from '@angular/router';

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

  constructor(private http: HttpClient, private router:Router) { }

  ngOnInit() {
    this.http.get<{myTotalIncome,myTotalPerHourAvrg}>(environment.apiUrl+'/stats/myStats/'+localStorage.getItem('userName'))
    .subscribe(myStats => {
      console.log(myStats)
      this.myTotalIncome = myStats.myTotalIncome;
      this.myTotalPerHourAvrg = myStats.myTotalPerHourAvrg;
    })

    this.http.get<{totalTips,perHourAvrg}>(environment.apiUrl + '/stats/waitrsBookStats')
    .subscribe(tips => {
      console.log(tips)
      this.totalTips = tips.totalTips;
      this.perHourAvrg = tips.perHourAvrg;
      
    })
  }

  onSubmit(form){
    console.log(form)
    const whosTips = form.whosTips;
    const month = form.month;
    const year = form.year;
    this.router.navigate(['waitrs-book-log/'+whosTips+'/'+year + '-' + month]);
    }


}
