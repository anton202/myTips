import { Component, OnInit, OnDestroy, ViewChild} from '@angular/core';

import { MyTipsService } from '../my-tips.service';
import { Tip } from '../tip.model';
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
    this.MyTipsService.addTip(newTip);
     this.tipForm.reset();
    }else if(this.state === 'edit'){
      this.MyTipsService.editTip(newTip,this.editIndex)
      this.state = 'add tip';
    }
  }

  

  ngOnDestroy(){
    this.stateSubscription.unsubscribe();
  }
}
