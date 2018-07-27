import { Component, OnInit } from '@angular/core';
import { Tip } from './tip.model';
import { MyTipsService } from './my-tips.service';


@Component({
  selector: 'app-my-tips',
  templateUrl: './my-tips.component.html',
  styleUrls: ['./my-tips.component.css'],
  providers: [MyTipsService]
})
export class MyTipsComponent implements OnInit {
  tips: Tip[] =  []

  constructor(private MyTipsService: MyTipsService) { }

  ngOnInit() {
    this.tips = this.MyTipsService.getTips();
    this.MyTipsService.tipAdded.subscribe(tips =>{
      this.tips = tips;
    })

    this.MyTipsService.tipDeleted.subscribe(tips => {
      this.tips = tips;
    })
  }

  

}
