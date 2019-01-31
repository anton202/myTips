import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material';

import { ErrorMessageComponenet } from '../../../material/errorMessage/errorMessage.component';
import { environment } from './../../../../environments/environment';

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
isHighLighted = false;
tipToDelete;

  constructor(private http: HttpClient, private route: ActivatedRoute,public dialog: MatDialog) { }

  ngOnInit() {
    const yearMonth = this.route.snapshot.params.yearMonth;
     this.state = this.route.snapshot.params.state;
    this.http.get<{tips,totalTips,perHourAvrg}>(environment.apiUrl+'/stats/mylog/'+this.state+'/'+yearMonth)
    .subscribe(log =>{
      this.totalTips = log.totalTips;
      this.perHourAvg = log.perHourAvrg;
      this.tips = log.tips;
    },
    errpr =>{
      this.dialog.open(ErrorMessageComponenet,{
        width: '300px'
      })
    })
  }

  TipToDelete(index){
    if(this.tipToDelete === this.tips[index]){
      this.tipToDelete = null;
      return
    }
    this.tipToDelete = this.tips[index];
    this.tipToDelete.index = index;
  }

  deleteTip(){
   this.http.delete(environment.apiUrl+'/myTips/deleteTip/'+this.tipToDelete._id)
   .subscribe(()=>{
     this.tips.splice(this.tipToDelete.index,1);
     this.tipToDelete = null;
    },
    error =>{
      this.dialog.open(ErrorMessageComponenet,{
        width: '300px'
      })
    } )
  }

}
