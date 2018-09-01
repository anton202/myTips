import { Tip } from './tip.model';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class MyTipsService{
 tipAdded = new Subject<Tip[]>();
 tipDeleted = new Subject<Tip[]>();
 private tips: Tip[] = [];
 
constructor(private http: HttpClient){}

 fetchTips(){
     this.http.get<{tips}>('http://localhost:8000/api/myTips/getMyTips')
        .subscribe(
            response=> {
                response.tips.forEach(tip => {
                    this.tips.unshift(new Tip(tip.date, tip.amount,tip.startTime, tip.endTime, tip.shiftCategory ))
                })
                this.tipAdded.next(this.tips.slice())
            },
            error => console.log(error)
        )
      
 }

  addTip(newTip){
      this.tips.unshift(new Tip(newTip.date, newTip.yearMonth, newTip.amount, newTip.startTime, newTip.endTime, newTip.shiftCategory))
      this.http.post('http://localhost:8000/api/myTips/addTip',newTip)
      .subscribe(
          response => console.log(response),
          error => console.log(error)
        )
      this.tipAdded.next(this.tips.slice());
  }

  editTip(editedTip,index){
    this.tips.splice(index,1,new Tip(editedTip.date, editedTip.tip, editedTip.startTime, editedTip.endTime, editedTip.shift))
    this.tipAdded.next(this.tips.slice());
  }

  deleteTip(id){
     this.tips.splice(id,1);
      this.tipDeleted.next(this.tips.slice());
  }
}