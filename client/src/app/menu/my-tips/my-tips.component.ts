import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { MyTipsService } from './my-tips.service';
import {  Subscription } from 'rxjs';
import { NewTipService } from './new-tip/new-tip.service';
import { AddTipService } from './add-tip/add-tip.service';



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
  loadGif = false;
  loadGifSubscription: Subscription;
  

  constructor(
    private myTipsService: MyTipsService,
    private http:HttpClient,
    private newTipService: NewTipService,
    private addTipService: AddTipService
    ) { }

  ngOnInit() {
    //loadGift on myTipsService --> loadGift on myTips comp.ts --> html
    this.loadGifSubscription = this.myTipsService.loadGif.subscribe(isLoad => this.loadGif = isLoad)
    //run getTips func to fetch tips from sever 
    this.myTipsService.getTips();
    //listen to observable that sends the tips to this class after they are fetched successfully
    this.myTipsService.fetchedTips.subscribe(tips => {
      this.tips = tips
    })

    this.addTipSubscription = this.myTipsService.tipAdded.subscribe(tips =>{
      //updating the tips array - tips = [{tip},{tip},{tip}....]
      this.tips = tips;
    })
    this.editTipSubscription = this.myTipsService.editSelectedTip.subscribe(tips =>{
      //same procces as with addTipSubscrition
      this.tips = tips
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
