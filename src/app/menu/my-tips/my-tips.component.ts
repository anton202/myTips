import { Component, OnInit, OnDestroy } from '@angular/core';
import { Tip } from './tip.model';
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
  tips: Tip[] = [];
  addTipSubscription: Subscription;
  delteTipSubscription: Subscription;

  constructor(private MyTipsService: MyTipsService) { }

  ngOnInit() {
    this.tips = this.MyTipsService.getTips();
    this.addTipSubscription = this.MyTipsService.tipAdded.subscribe(tips =>{
      this.tips = tips;
    })

    this.delteTipSubscription = this.MyTipsService.tipDeleted.subscribe(tips => {
      this.tips = tips;
    })
  }

  ngOnDestroy(){
    this.addTipSubscription.unsubscribe();
    this.delteTipSubscription.unsubscribe();
  }
  

}
