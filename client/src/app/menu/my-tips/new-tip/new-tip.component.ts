import { Component, OnInit,Input } from '@angular/core';
import { Tip } from '../tip.model'; 
import { MyTipsService } from '../my-tips.service';
import { NewTipService } from './new-tip.service';
import { AddTipService } from '../add-tip/add-tip.service';


@Component({
  selector: 'app-new-tip',
  templateUrl: './new-tip.component.html',
  styleUrls: ['./new-tip.component.css']
})
export class NewTipComponent implements OnInit {
@Input() tip: Tip;
@Input() index: number;
editData:{tip:Tip,index:number};

constructor(
  private MyTipsService: MyTipsService, 
  private newTipService: NewTipService,
  private addTipService: AddTipService
  ) {}

  ngOnInit() {
    this.editData = {
      tip: this.tip,
      index: this.index
    };
    console.log(this.tip)
  }

  deleteTip(){
    this.MyTipsService.deleteTip(this.index,this.editData.tip.id);
  }

  editTip(){
    
    this.addTipService.formState.next('ערוך טיפ');
    this.newTipService.editData.next(this.editData);
    
  }
}
