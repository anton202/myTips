import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-waitrs-book-statistics',
  templateUrl: './waitrs-book-statistics.component.html',
  styleUrls: ['./waitrs-book-statistics.component.css']
})
export class WaitrsBookStatisticsComponent implements OnInit {
waitrsBook: boolean = false;
state: string;
totalTipThisMonth;
monthlyPerHourAvg

  constructor(private router: Router, private route: ActivatedRoute, private http: HttpClient) { }

  ngOnInit() {
   this.state = this.route.snapshot.params.state;
   
   if(this.state === 'myTips'){
   this.http.get<{totalTipsThisMonth,monthlyPerHourAvg}>(environment.apiUrl+'/stats/myStats/'+localStorage.getItem('userName'))
   .subscribe(stats =>{
    this.totalTipThisMonth = stats.totalTipsThisMonth;
    this.monthlyPerHourAvg = stats.monthlyPerHourAvg;
   })
  }
  else{
    this.http.get<{totalTipsThisMonth,monthlyPerHourAvg}>(environment.apiUrl+'/stats/waitrsBookStats')
    .subscribe(stats =>{
      this.totalTipThisMonth = stats.totalTipsThisMonth;
      this.monthlyPerHourAvg = stats.monthlyPerHourAvg;
    })
  }
  }

  onWaitrsBook(){
    this.waitrsBook = !this.waitrsBook;
  }

  displayForm(){
    if(this.waitrsBook){
      return 'block';
    }
  }

  onSubmit(form: NgForm){
    const month = form.value.month;
    const year = form.value.year;
    this.router.navigate(['waitrs-book-log/'+this.state+'/'+year + '-' + month]);
    }

}
