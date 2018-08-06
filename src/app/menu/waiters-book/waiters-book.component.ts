import { Component, OnInit } from '@angular/core';
import { WaitrsBookService } from './waiters-book.service';
import { WaitrTip } from './waitr-tip.model'


@Component({
  selector: 'app-waiters-book',
  templateUrl: './waiters-book.component.html',
  styleUrls: ['./waiters-book.component.css'],
  providers:[WaitrsBookService]
})
export class WaitersBookComponent implements OnInit {
  totalTip:number;
  shekelsPerHour: number;
  barmanTip: number;
  initialSubmit: boolean = false;
  todaysDate:string = new Date().toLocaleDateString();
  todaysTips: WaitrTip[] = [];

  constructor(private waitrsBookService: WaitrsBookService) { }

  ngOnInit() {
    this.todaysTips = this.waitrsBookService.waitrsTips;
  }

  calculatePerHour(data){
   this.barmanTip = Math.round((+data.barmanPrecentage / 100) * +data.totalTips);
   this.shekelsPerHour = Math.round((+data.totalTips - this.barmanTip) / +data.totalHours);
   this.totalTip = +data.totalTips - this.barmanTip;
   this.initialSubmit = true;
    
  }

  addWaitrTip(data){
    const waitrTip = {
      date: this.todaysDate,
      name: data.waitrName,
      hours: data.hours,
      tips: this.shekelsPerHour * (+data.hours)
    }
    this.waitrsBookService.addTip(waitrTip);
    this.totalTip = this.totalTip - waitrTip.tips;
  }


}
