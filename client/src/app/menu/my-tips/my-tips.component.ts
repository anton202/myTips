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
  editTipSubscription: Subscription
  delteTipSubscription: Subscription;
  

  constructor(
    private myTipsService: MyTipsService,
    private http:HttpClient,
    private newTipService: NewTipService,
    private addTipService: AddTipService
    ) { }

  ngOnInit() {
   //this.myTipsService.fetchTips();
    this.http.get(environment.apiUrl+'/myTips/getMyTips')
    .subscribe(tips =>{
      console.log(tips)
      this.tips = tips;
    },
    error => {
      console.log(error);
    })
    this.addTipSubscription = this.myTipsService.tipAdded.subscribe(tip =>{
      console.log(tip)
      this.tips.unshift(tip);
    })
    this.editTipSubscription = this.myTipsService.editSelectedTip.subscribe(data =>{
      this.tips[data.index] = data.editedTip
     console.log(data)
    })
    
    this.delteTipSubscription = this.myTipsService.tipDeleted.subscribe(tips => {
      this.tips = tips;
    })
  }

  editDeleteTip(tip, index){
    this.newTipService.editData.next({tip,index});
    this.addTipService.formState.next('ערוך טיפ');
  }


  ngOnDestroy(){
    this.addTipSubscription.unsubscribe();
    this.delteTipSubscription.unsubscribe();
  }
  

}
