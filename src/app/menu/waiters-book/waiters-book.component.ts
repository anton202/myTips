import { Component, OnInit, OnDestroy } from '@angular/core';

import { WaitrsBookService } from './waiters-book.service';
import { Tip } from '../my-tips/tip.model';
import { Time } from '../../shared/time.service';
import { Subscription } from 'rxjs/Subscription';


@Component({
  selector: 'app-waiters-book',
  templateUrl: './waiters-book.component.html',
  styleUrls: ['./waiters-book.component.css'],
  providers:[WaitrsBookService]
})
export class WaitersBookComponent implements OnInit,OnDestroy {
  totalTip:number;
  shekelsPerHour: number;
  barmanTip: number;
  initialSubmit: boolean = false;
  todaysDate:string = new Date().toLocaleDateString();
  todaysTips: Tip[] = [];
  subscription: Subscription;

  constructor(private waitrsBookService: WaitrsBookService) { }

  ngOnInit() {
    this.todaysTips = this.waitrsBookService.waitrsTips;
    this.subscription = this.waitrsBookService.totalTipsChanged
    .subscribe(
      tip => {
        this.totalTip += tip;
      }
    )
  }

  calculatePerHour(data){
   this.barmanTip = Math.round((+data.barmanPrecentage / 100) * +data.totalTips);
   this.shekelsPerHour = Math.round((+data.totalTips - this.barmanTip) / +data.totalHours);
   this.totalTip = +data.totalTips - this.barmanTip;
   this.initialSubmit = true;
  }

  addWaitrTip(data){
    const time = Time.calculateTime(data.startTime,data.endTime);
    data.date = this.todaysDate;
    data.totalTime = time.endTime - time.startTime;
    data.amount = data.totalTime * this.shekelsPerHour;
    data.perHour = this.shekelsPerHour;
    this.totalTip = this.totalTip - data.amount;
    console.log(data);
    this.waitrsBookService.addTip(data);
    
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

}
