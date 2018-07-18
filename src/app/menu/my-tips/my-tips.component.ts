import { Component, OnInit } from '@angular/core';
import { Tip } from './tip.model';


@Component({
  selector: 'app-my-tips',
  templateUrl: './my-tips.component.html',
  styleUrls: ['./my-tips.component.css']
})
export class MyTipsComponent implements OnInit {
  tips: Tip[] =  [new Tip(new Date(2018,7,18), 300, '16:00', '22:00', 'morning shift'),
  new Tip(new Date(2018,7,18), 500, '16:00', '22:00', 'morning shift'),
  new Tip(new Date(2018,7,18), 250, '12:00', '16:00', 'morning shift'),
  new Tip(new Date(2018,7,18), 250, '12:00', '16:00', 'morning shift'),
  new Tip(new Date(2018,7,18), 250, '12:00', '16:00', 'morning shift')];

  constructor() { }
  ngOnInit() {
  }


}
