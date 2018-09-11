import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Tip } from '../../../my-tips/tip.model';

@Component({
  selector: 'app-waitrs-book-log',
  templateUrl: './waitrs-book-log.component.html',
  styleUrls: ['./waitrs-book-log.component.css']
})
export class WaitrsBookLogComponent implements OnInit {
tips:Tip[] = [];
totalTips;
perHourAvg;
  constructor(private http: HttpClient, private route: ActivatedRoute) { }

  ngOnInit() {
    const yearMonth = this.route.snapshot.params.yearMonth;
    const state = this.route.snapshot.params.state;
    this.http.get<{tips,totalTipsThisMonth,monthlyPerHourAvg}>('http://localhost:8000/api/stats/mylog/'+state+'/'+yearMonth)
    .subscribe(log =>{
      console.log(log)
      this.totalTips = log.totalTipsThisMonth;
      this.perHourAvg = log.monthlyPerHourAvg;
      log.tips.forEach(tip => {
        this.tips.push(new Tip(
          tip.id,
          tip.date,
          tip.amount,
          tip.startTime,
          tip.endTime,
          tip.shiftCategory,
          tip.yearMonth,
          tip.name,
          tip.totalTime,
          tip.perHour
          ))
      });
    })
  }

}
