import { Tip } from './tip.model';
import { Subject } from 'rxjs';

export class MyTipsService{
 tipAdded = new Subject<Tip[]>();
 tipDeleted = new Subject<Tip[]>();
 private tips: Tip[] = [new Tip(new Date(), 347, '12-00','16-00', 'morning shift'),
 new Tip(new Date(), 347, '12-00','16-00', 'morning shift'),
 new Tip(new Date(), 347, '12-00','16-00', 'morning shift'),
 new Tip(new Date(), 347, '12-00','16-00', 'morning shift'),
 new Tip(new Date(), 347, '12-00','16-00', 'morning shift'),
 new Tip(new Date(), 347, '12-00','16-00', 'morning shift'),
 new Tip(new Date(), 347, '12-00','16-00', 'morning shift'),
 new Tip(new Date(), 347, '12-00','16-00', 'morning shift'),
 new Tip(new Date(), 347, '12-00','16-00', 'morning shift'),
 new Tip(new Date(), 347, '12-00','16-00', 'morning shift'),
 new Tip(new Date(), 347, '12-00','16-00', 'morning shift'),
 new Tip(new Date(), 347, '12-00','16-00', 'morning shift'),];
 
 getTips(){
     return this.tips.slice();
 }

  addTip(newTip){
      this.tips.unshift(new Tip(newTip.date, newTip.tip, newTip.startTime, newTip.endTime, newTip.shift))
      this.tipAdded.next(this.tips.slice());
  }

  editTip(editedTip,index){
    this.tips.splice(index,1,new Tip(editedTip.date, editedTip.tip, editedTip.startTime, editedTip.endTime, editedTip.shift))
    this.tipAdded.next(this.tips.slice());
  }

  deleteTip(id){
     this.tips.splice(id,1);
      this.tipDeleted.next(this.tips.slice());
  }
}