import { Component, OnInit, OnDestroy, ViewChild} from '@angular/core';
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
export class AddTipComponent implements OnInit, OnDestroy{
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
    
   this.stateSubscription = this.addTipService.formState.subscribe(state =>{
      this.state = state;
    }) 

    this.editDataSubscription = this.newTipService.editData.subscribe(editData =>{
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

    this.serverErrorSubscription = this.MyTipsService.serverError.subscribe(message => this.serverErrorMessage = message )

  }

  addTip(newTip){
    newTip.id = null;
    newTip.yearMonth = this.addTipService.setYearMonth();
    newTip.userName = localStorage.getItem('userName');
    const totalHour = this.addTipService.calculateTotalHours(newTip.startTime, newTip.endTime);
    newTip.perHour = Math.floor(newTip.amount / totalHour);
    newTip.totalHours = totalHour

    if(this.state === 'הוסף טיפ'){
    this.MyTipsService.addTip(newTip);
     this.tipForm.reset();
    }else if(this.state === 'edit'){
      newTip.id = this.serverTipId
      this.MyTipsService.editTip(newTip,this.editIndex)
      this.state = 'הוסף טים';
      this.tipForm.reset();
    }
  }

  

  ngOnDestroy(){
    this.stateSubscription.unsubscribe();
    this.serverErrorSubscription.unsubscribe();
  }
}
