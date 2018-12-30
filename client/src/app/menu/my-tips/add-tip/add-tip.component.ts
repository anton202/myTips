import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';

import { MyTipsService } from '../my-tips.service';
import { NewTipService } from '../new-tip/new-tip.service';
import { AddTipService } from './add-tip.service';

@Component({
  selector: 'app-add-tip',
  templateUrl: './add-tip.component.html',
  styleUrls: ['./add-tip.component.css']
})
export class AddTipComponent implements OnInit, OnDestroy {
  state = 'הוסף טיפ';
  stateSubscription: Subscription;
  editDataSubscription: Subscription;
  serverErrorSubscription: Subscription;
  serverErrorMessage: string;
  editIndex: number;
  serverTipId;

  @ViewChild('f') tipForm: NgForm;

  constructor(
    private MyTipsService: MyTipsService,
    private newTipService: NewTipService,
    private addTipService: AddTipService
  ) { }

  ngOnInit() {

    this.stateSubscription = this.addTipService.formState.subscribe(state => {
      this.state = state;
    })

    this.editDataSubscription = this.newTipService.editData.subscribe(editData => {
      this.serverTipId = editData.tip.id;
      this.editIndex = editData.index;
      this.tipForm.setValue({
        date: editData.tip.date,
        amount: editData.tip.amount,
        startTime: editData.tip.startTime,
        endTime: editData.tip.endTime,
        shiftCategory: editData.tip.shiftCategory
      })
    })

    this.serverErrorSubscription = this.MyTipsService.serverError.subscribe(message => this.serverErrorMessage = message)

  }

  addTip(waitrData) {
    //calculate total hours worked
    const startTime = waitrData.startTime.split(':');
    const endTime = waitrData.endTime.split(':');

    const start = new Date();
    const end = new Date();

    start.setHours(parseInt(startTime[0], 10), parseInt(startTime[1], 10));
    end.setHours(parseInt(endTime[0], 10), parseInt(endTime[1], 10));

    //add - total time,user name, yearMonth and perHour properties to waitrData object.
    //edit date format to dd/mm/yyyy
    waitrData.totalTime = ((end.getTime() - start.getTime()) / (1000 * 60 * 60)).toFixed(2); //(2)
    waitrData.yearMonth = this.addTipService.setYearMonth();
    waitrData.userName = localStorage.getItem('userName');
    waitrData.perHour = Number(waitrData.totalTip / waitrData.totalTime).toFixed(2);
   // waitrData.date = new Date(waitrData.date).getDate().toLocaleString();

    console.log(waitrData);
    //check the state status. in both cases the function calculate or recalculate all the input values.
    if (this.state === 'הוסף טיפ') {
      //send new tip to server
      this.MyTipsService.addTip(waitrData);
    } else if (this.state === 'ערוך טיפ') {
      waitrData.id = this.serverTipId;
      this.MyTipsService.editTip(waitrData,this.editIndex)
      this.state = 'הוסף טים';
    }

     //reset form inputs
     this.tipForm.reset();


    // newTip.id = null;
    // newTip.yearMonth = this.addTipService.setYearMonth();
    // newTip.userName = localStorage.getItem('userName');
    // const totalHour = this.addTipService.calculateTotalHours(newTip.startTime, newTip.endTime);
    // newTip.perHour = Math.floor(newTip.amount / totalHour);
    // newTip.totalHours = totalHour

    // if(this.state === 'הוסף טיפ'){
    // this.MyTipsService.addTip(newTip);
    //  this.tipForm.reset();
    // }else if(this.state === 'edit'){
    //   newTip.id = this.serverTipId
    //   this.MyTipsService.editTip(newTip,this.editIndex)
    //   this.state = 'הוסף טים';
    //   this.tipForm.reset();
    // }
  }



  ngOnDestroy() {
    this.stateSubscription.unsubscribe();
    this.serverErrorSubscription.unsubscribe();
  }
}
