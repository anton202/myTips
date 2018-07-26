import { Tip } from './tip.model';
import { EventEmitter } from '@angular/core';

export class MyTipsService{
    tipAdded = new EventEmitter<Tip[]>();
    tipDeleted = new EventEmitter<Tip[]>();

 private tips: Tip[] =  [new Tip(new Date(2018,7,18), 300, '16:00', '22:00', 'morning shift'),
  new Tip(new Date(2018,7,18), 500, '16:00', '22:00', 'morning shift'),
  new Tip(new Date(2018,7,18), 250, '12:00', '16:00', 'morning shift'),
  new Tip(new Date(2018,7,18), 250, '12:00', '16:00', 'morning shift'),
  new Tip(new Date(2018,7,18), 250, '12:00', '16:00', 'morning shift')];

 getTips(){
     return this.tips.slice();
 }

  addTip(newTip){
      this.tips.unshift(new Tip(newTip, 500, '16:00', '22:00', 'morning shift'))
      this.tipAdded.emit(this.tips.slice());
  }

  deleteTip(id){
     this.tips.splice(id,1);
      this.tipDeleted.emit(this.tips.slice());
  }
}