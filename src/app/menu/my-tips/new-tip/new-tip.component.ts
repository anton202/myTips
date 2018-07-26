import { Component, OnInit,Input } from '@angular/core';
import { Tip } from '../tip.model'; 
import { MyTipsService } from '../my-tips.service';

@Component({
  selector: 'app-new-tip',
  templateUrl: './new-tip.component.html',
  styleUrls: ['./new-tip.component.css']
})
export class NewTipComponent implements OnInit {
@Input() tip: Tip;
@Input() index: number;
constructor(private MyTipsService: MyTipsService) { }

  ngOnInit() {
  }

  deleteTip(){
    this.MyTipsService.deleteTip(this.index);
  }

}
