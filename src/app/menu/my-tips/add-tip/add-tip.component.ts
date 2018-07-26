import { Component, OnInit} from '@angular/core';
import { MyTipsService } from '../my-tips.service';

@Component({
  selector: 'app-add-tip',
  templateUrl: './add-tip.component.html',
  styleUrls: ['./add-tip.component.css']
})
export class AddTipComponent implements OnInit {
 
  constructor(private MyTipsService: MyTipsService) { }

  ngOnInit() {
  }

  addTip(newTip){
    this.MyTipsService.addTip(newTip);
  }

}
