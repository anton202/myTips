import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment } from '../../../environments/environment';

@Injectable()
export class MyTipsService {
  tipAdded = new Subject();
  editSelectedTip = new Subject<{ index, editedTip }>();
  tipDeleted = new Subject();
  serverError = new Subject<string>();

  constructor(private http: HttpClient) { }

  changeDateFormat(changeDate) {
    const date = changeDate.split('-');
    return date[2] + '/' + date[1];
  }

  addTip(newTip) {
    this.http.post(environment.apiUrl + '/myTips/addTip', newTip)
      .subscribe(
        tip => { console.log(tip); this.tipAdded.next(tip);}, 
        error => this.serverError.next(error.error.message)
      )
    //change daate format to dd/mm from yyyy-dd-mm
    //newTip.date = this.changeDateFormat(newTip.date)
    
  }

  editTip(editedTip, index) {
    this.http.put(environment.apiUrl + '/myTips/editTip', { editedTip })
      .subscribe(response => {
        //editedTip.date = this.changeDateFormat(editedTip.date)
        this.editSelectedTip.next({ editedTip, index });
      },
        error => this.serverError.next(error.error.message)
      )

  }

  //   deleteTip(id,serverTipId){
  //       this.http.delete(environment.apiUrl+'/myTips/deleteTip/'+serverTipId)
  //       .subscribe(response => {
  //           this.tips.splice(id,1);
  //           this.tipDeleted.next(this.tips.slice());
  //       },
  //     error => this.serverError.next(error.error.message)
  // )

  //   }
}