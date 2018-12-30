import { Tip } from './tip.model';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment } from '../../../environments/environment';

@Injectable()
export class MyTipsService{
 tipAdded = new Subject<Tip[]>();
 tipDeleted = new Subject<Tip[]>();
 serverError = new Subject<string>();
 private tips: Tip[] = [];
 
constructor(private http: HttpClient){}

//  fetchTips(){
//      this.http.get<{tips}>(environment.apiUrl+'/myTips/getMyTips')
//         .subscribe(
//             response =>{
//                 response.tips.forEach(tip => {
//                     this.tips.unshift(new Tip(
//                         tip._id,
//                         tip.date, 
//                         tip.amount,
//                         tip.startTime, 
//                         tip.endTime, 
//                         tip.shiftCategory,
//                         tip.yearMonth,
//                         tip.name,
//                         tip.totalTime,
//                         tip.perHour,
//                      ))
//                 })
//                 this.tipAdded.next(this.tips.slice())
               
//             },
//             error => this.serverError.next(error.error.message)
//         )
      
//  }

  addTip(newTip){
      this.http.post(environment.apiUrl+'/myTips/addTip',newTip)
      .subscribe(
          response => {},
          error => this.serverError.next(error.error.message)
        )
        //change daate format to dd/mm from yyyy-dd-mm
      const date = newTip.date.split('-');
      newTip.date = date[1] + '/' + date[2];         
      this.tipAdded.next(newTip);
  }

  editTip(editedTip,index){
      this.http.put(environment.apiUrl+'/myTips/editTip',{editedTip})
      .subscribe(response =>{
        this.tips.splice(index,1,new Tip(
             editedTip.id,
             editedTip.date,
             editedTip.amount,
             editedTip.startTime,
             editedTip.endTime,
             editedTip.shiftCategory,
             editedTip.userName,
             editedTip.yearMonth,
             editedTip.totalHours,
             editedTip.perHour
            ))
        this.tipAdded.next(this.tips.slice());
      },
      error => this.serverError.next(error.error.message)
    )
    
  }

  deleteTip(id,serverTipId){
      this.http.delete(environment.apiUrl+'/myTips/deleteTip/'+serverTipId)
      .subscribe(response => {
          this.tips.splice(id,1);
          this.tipDeleted.next(this.tips.slice());
      },
    error => this.serverError.next(error.error.message)
)
    
  }
}