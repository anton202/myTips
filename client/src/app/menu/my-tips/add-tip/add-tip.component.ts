import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';

import { MyTipsService } from '../my-tips.service';
import { NewTipService } from '../new-tip/new-tip.service';
import { AddTipService } from './add-tip.service';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';


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
    private addTipService: AddTipService,
    private http: HttpClient
  ) { }

  ngOnInit() {

    this.stateSubscription = this.addTipService.formState.subscribe(state => {
      this.state = state;
    })

    this.editDataSubscription = this.newTipService.editData.subscribe(editData => {
      this.serverTipId = editData.tip._id;
      this.editIndex = editData.index;
      //split date to change the format 
      const date = editData.tip.date.split('/');
      this.tipForm.setValue({
        // change date format to yyyy-dd-mm
        date: date[2] + '-' + date[1] + '-' + date[0],
        totalTip: editData.tip.totalTip,
        startTime: editData.tip.startTime,
        endTime: editData.tip.endTime,
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
    waitrData.totalTime = ((end.getTime() - start.getTime()) / (1000 * 60 * 60)).toFixed(2); //(2)
    waitrData.yearMonth = this.addTipService.setYearMonth();
    waitrData.userName = localStorage.getItem('userName');
    waitrData.perHour = Number(waitrData.totalTip / waitrData.totalTime).toFixed(2);

    //check the state status. in both cases the function calculate or recalculate all the input values.
    if (this.state === 'הוסף טיפ') {
      //send new tip to server
      this.MyTipsService.addTip(waitrData);
    } else if (this.state === 'ערוך טיפ') {
      waitrData.id = this.serverTipId;
      console.log(waitrData)
      //change date format back to dd/mm/yyyy
      const date = waitrData.date.split('-');
      waitrData.date = date[2] + '/' + date[1] + '/' + date[0];
      //send to server
      this.MyTipsService.editTip(waitrData,this.editIndex)
      this.state = 'הוסף טיפ';
    }
     //reset form inputs
     this.tipForm.reset();
  }

  deleteTip(){
  this.MyTipsService.deleteTip(this.editIndex,this.serverTipId)
  this.state = 'הוסף טיפ'
  this.tipForm.reset();
  }

  ngOnDestroy() {
    this.stateSubscription.unsubscribe();
    this.serverErrorSubscription.unsubscribe();
  }
}
