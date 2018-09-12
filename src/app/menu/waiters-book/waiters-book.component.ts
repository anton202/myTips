import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

import { WaitrsBookService } from './waiters-book.service';
import { Tip } from '../my-tips/tip.model';
import { AddTipService } from '../my-tips/add-tip/add-tip.service';
import { Subscription } from 'rxjs/Subscription';


@Component({
  selector: 'app-waiters-book',
  templateUrl: './waiters-book.component.html',
  styleUrls: ['./waiters-book.component.css'],
  providers:[WaitrsBookService, AddTipService]
})
export class WaitersBookComponent implements OnInit,OnDestroy {
  totalTip:number;
  shekelsPerHour: number;
  barmanTip: number;
  initialSubmit: boolean = false;
  todaysDate:string = new Date().toLocaleDateString();
  todaysTips: Tip[] = [];
  subscription: Subscription;
  tipsFetchedSubscription: Subscription;
  barManTip: boolean = true;
  workersNames;
  errorMessageSub: Subscription; 
  errorMessaage: string;
  @ViewChild('fw') waitrTipForm: NgForm
  

  constructor(private waitrsBookService: WaitrsBookService, private addTipService: AddTipService)  {}

  ngOnInit() {
    this.waitrsBookService.getWorkersNames()
    .subscribe(workersNames =>{
     this.workersNames = workersNames;
    },
    error => this.errorMessaage = error.message)
    this.waitrsBookService.getTips();
    this.errorMessageSub = this.waitrsBookService.errorMessage.subscribe(error => this.errorMessaage = error)
    this.tipsFetchedSubscription = this.waitrsBookService.tipsFetched.subscribe(tips => this.todaysTips = tips);
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
   this.totalTip = +data.totalTips;
   this.initialSubmit = true;
  }

  addWaitrTip(data){
   
    if(this.barManTip){
     return this.addBarManTip(data);
    }
    const totalHours = this.addTipService.calculateTotalHours(data.startTime,data.endTime);
    data.date = this.todaysDate;
    data.totalTime = totalHours;
    data.amount = data.totalTime * this.shekelsPerHour;
    data.perHour = this.shekelsPerHour;
    data.waitrsBook = true
    data.yearMonth = this.addTipService.setYearMonth();
    
    this.totalTip = this.totalTip - data.amount;
    this.waitrTipForm.reset()
    this.waitrsBookService.addTip(data);
  }

  addBarManTip(data){
    const totalHours = this.addTipService.calculateTotalHours(data.startTime,data.endTime);
    data.amount = this.barmanTip;
    data.date = this.todaysDate;
    data.totalTime = totalHours;
    data.perHour = null;
    data.waitrsBook = true
    data.yearMonth = this.addTipService.setYearMonth();
    this.totalTip = this.totalTip - this.barmanTip;
    this.barManTip = false;
    this.waitrTipForm.reset();
    this.waitrsBookService.addTip(data);
  }


  ngOnDestroy(){
    this.subscription.unsubscribe();
    this.tipsFetchedSubscription.unsubscribe();
  }

}
