import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';

import { environment } from '../../../../../environments/environment';

@Component({
  selector: 'app-waitrs-book-log',
  templateUrl: './waitrs-book-log.component.html',
  styleUrls: ['./waitrs-book-log.component.css']
})
export class WaitrsBookLogComponent implements OnInit {
tips = [];
totalTips;
perHourAvg;
state
  constructor(private http: HttpClient, private route: ActivatedRoute) { }

  ngOnInit() {
    const yearMonth = this.route.snapshot.params.yearMonth;
     this.state = this.route.snapshot.params.state;
    this.http.get<{tips,totalTips,perHourAvrg}>(environment.apiUrl+'/stats/mylog/'+this.state+'/'+yearMonth)
    .subscribe(log =>{
      this.totalTips = log.totalTips;
      this.perHourAvg = log.perHourAvrg;
      this.tips = log.tips;
    })
  }

}
