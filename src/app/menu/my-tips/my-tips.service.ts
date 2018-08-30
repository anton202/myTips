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

 getTips(){
     return this.tips.slice();
 }

  addTip(newTip){
      this.tips.unshift(new Tip(newTip.date, newTip.tip, newTip.startTime, newTip.endTime, newTip.shift))
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