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
  waitrsStack = [];
  totalTips;
  totalTime;
  tipPerHour
  barManTip = 0;

  shekelsPerHour: number;
  barmanTip: number;
  initialSubmit: boolean = false;
  todaysDate:string = new Date().toLocaleDateString();
  todaysTips: Tip[] = [];
  subscription: Subscription;
  tipsFetchedSubscription: Subscription;
  //barManTip: boolean = true;
  workersNames;
  errorMessageSub: Subscription; 
  errorMessaage: string;
  @ViewChild('f') waitrDataForm: NgForm
  

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
    // this.subscription = this.waitrsBookService.totalTipsChanged
    // .subscribe(
    //   tip => {
    //     this.totalTip += tip;
    //   }
    // )
  }

  addWaitr(waitrData){
    const startTime = waitrData.startTime.split(':');
    const endTime = waitrData.endTime.split(':');

    const start = new Date();
    const end = new Date();

    start.setHours(parseInt(startTime[0], 10), parseInt(startTime[1], 10));
    end.setHours(parseInt(endTime[0], 10), parseInt(endTime[1], 10));
    
    waitrData.totalTime = ((end.getTime() - start.getTime()) / (1000 * 60 * 60)).toFixed(2); //(2) 
    this.waitrsStack.push(waitrData)

    this.waitrDataForm.reset()
    console.log(this.waitrsStack)
  }

  calculateTips(totalTip){
    let totalTime = 0;
    let tipPerHour = 0;
    let barManTip = 0;

    for (let i = 0; i < this.waitrsStack.length; i++) {
        totalTime += Number(this.waitrsStack[i].totalTime);
    }

    barManTip = totalTip * 0.1; // 10% to barman
    totalTip -= barManTip;
    tipPerHour = Number((totalTip / totalTime).toFixed(2)); 
    
    for (let i = 0; i < this.waitrsStack.length; i++ ){
        if(totalTip - this.waitrsStack[i].totalTime * tipPerHour < 0){
            throw console.log('error not enogh tip');
        }

        this.waitrsStack[i].totalTip = Math.floor(this.waitrsStack[i].totalTime * tipPerHour);
        totalTip -= this.waitrsStack[i].totalTip;
    }

    this.totalTips = totalTip;
    this.totalTime = totalTime;
    this.tipPerHour = tipPerHour;
    this.barManTip = barManTip;

    console.log(totalTime + '\n' + tipPerHour + '\n' + barManTip + '\n' + totalTip)
  }


  // addWaitrTip(data){
   
  //   if(this.barManTip){
  //    return this.addBarManTip(data);
  //   }
  //   const totalHours = this.addTipService.calculateTotalHours(data.startTime,data.endTime);
  //   data.totalTime = totalHours;
  //   data.amount = data.totalTime * this.shekelsPerHour;
  //   data.perHour = this.shekelsPerHour;
  //   data.waitrsBook = true
  //   data.yearMonth = this.addTipService.setYearMonth();
    
  //   this.totalTip = this.totalTip - data.amount;
  //   //this.waitrTipForm.reset()
  //   this.waitrsBookService.addTip(data);
  // }

  // addBarManTip(data){
  //   const totalHours = this.addTipService.calculateTotalHours(data.startTime,data.endTime);
  //   data.amount = this.barmanTip;
  //   data.totalTime = totalHours;
  //   data.perHour = null;
  //   data.waitrsBook = true
  //   data.yearMonth = this.addTipService.setYearMonth();
  //   this.totalTip = this.totalTip - this.barmanTip;
  //   this.barManTip = false;
  //   //this.waitrTipForm.reset();
  //   this.waitrsBookService.addTip(data);
  // }


  ngOnDestroy(){
    this.subscription.unsubscribe();
    this.tipsFetchedSubscription.unsubscribe();
  }

}
