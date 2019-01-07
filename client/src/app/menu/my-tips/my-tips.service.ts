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
  fetchedTips = new Subject();
  loadGif = new Subject<boolean>();
  //all of the tips for this month
  tips;

  constructor(private http: HttpClient) { }

  getTips() {
    this.loadGif.next(true);
    this.http.get(environment.apiUrl + '/myTips/getMyTips')
      .subscribe(tips => {
       this.loadGif.next(false);
        this.tips = tips;
        // send fetched tips to myTips component class
        this.fetchedTips.next(this.tips)
      },
        error => {
          console.log(error);
        })
  }


  addTip(newTip) {
    this.loadGif.next(true)
    this.http.post(environment.apiUrl + '/myTips/addTip', newTip)
      .subscribe(
        tip => {
          console.log(tip)
          this.tips.unshift(tip);
          this.tipAdded.next(this.tips);
          this.loadGif.next(false);
        }
        ,
        error => this.serverError.next(error.error.message)
      )
  }

  editTip(editedTip, index) {
    this.loadGif.next(true)
    this.http.put(environment.apiUrl + '/myTips/editTip', { editedTip })
      .subscribe(response => {
        this.tips.splice(index, 1, editedTip)
        this.editSelectedTip.next(this.tips);
        this.loadGif.next(false)
      },
        error => this.serverError.next(error.error.message)
      )

  }

  deleteTip(index,serverTipId) {
    this.loadGif.next(true)
    this.http.delete(environment.apiUrl + '/myTips/deleteTip/' + serverTipId)
      .subscribe(response => {
        this.tips.splice(index, 1);
        this.tipDeleted.next(this.tips);
        this.loadGif.next(false);
      },
        error => this.serverError.next(error.error.message)
      )

  }

}