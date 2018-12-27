import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Tip } from './tip.model';
import { MyTipsService } from './my-tips.service';
import {  Subscription } from 'rxjs';
import { NewTipService } from './new-tip/new-tip.service';
import { AddTipService } from './add-tip/add-tip.service';
import { environment } from '../../../environments/environment';


@Component({
  selector: 'app-my-tips',
  templateUrl: './my-tips.component.html',
  styleUrls: ['./my-tips.component.css'],
  providers: [MyTipsService, NewTipService, AddTipService]
})
export class MyTipsComponent implements OnInit, OnDestroy {
  tips;
  addTipSubscription: Subscription;
  delteTipSubscription: Subscription;

  constructor(private myTipsService: MyTipsService, private http:HttpClient) { }

  ngOnInit() {
   //this.myTipsService.fetchTips();
    this.http.get(environment.apiUrl+'/myTips/getMyTips')
    .subscribe(tips =>{
      console.log(tips)
      // for(let i = 0; i < tips.length; i += 1){
      //   tips[i].date = new Date(tips[i].date)
      // }
      this.tips = tips;
    },
    error => {
      console.log(error);
    })
    this.addTipSubscription = this.myTipsService.tipAdded.subscribe(tips =>{
      this.tips = tips;
    })

    this.delteTipSubscription = this.myTipsService.tipDeleted.subscribe(tips => {
      this.tips = tips;
    })
  }

  ngOnDestroy(){
    this.addTipSubscription.unsubscribe();
    this.delteTipSubscription.unsubscribe();
  }
  

}
