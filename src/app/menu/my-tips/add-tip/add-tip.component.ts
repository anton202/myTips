import { Component, OnInit, OnDestroy, ViewChild} from '@angular/core';

import { MyTipsService } from '../my-tips.service';
import { NewTipService } from '../new-tip/new-tip.service';
import { Subscription } from 'rxjs';
import { NgForm } from '@angular/forms';
import { AddTipService } from './add-tip.service';

@Component({
  selector: 'app-add-tip',
  templateUrl: './add-tip.component.html',
  styleUrls: ['./add-tip.component.css']
})
export class AddTipComponent implements OnInit, OnDestroy{
 state: string = 'add tip';
 stateSubscription: Subscription;
 editDataSubscription: Subscription;
 editIndex: number;

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
      this.editIndex = editData.index;
      this.tipForm.setValue({
        date: editData.tip.date,
        tip: editData.tip.amount,
        startTime: editData.tip.startTime,
        endTime: editData.tip.endTime,
        shift: editData.tip.shiftCategory
      })
    })

  }

  addTip(newTip){
    if(this.state === 'add tip'){
      newTip.yearMonth = this.setYearMonth();
      newTip.userName = localStorage.getItem('userName');
    this.MyTipsService.addTip(newTip);
     this.tipForm.reset();
    }else if(this.state === 'edit'){
      this.MyTipsService.editTip(newTip,this.editIndex)
      this.state = 'add tip';
      this.tipForm.reset();
    }
  }

  setYearMonth(){
    const date = new Date();
    const yearMonth = date.getFullYear() + '-' + '0' + (date.getMonth() + 1);
    return yearMonth.toString();
  }

  ngOnDestroy(){
    this.stateSubscription.unsubscribe();
  }
}
