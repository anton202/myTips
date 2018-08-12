import { Component, OnInit, Input } from '@angular/core';
import { WaitrsBookService } from '../waiters-book.service';
import { WaitrTip } from '../waitr-tip.model';

@Component({
  selector: 'app-new-waitr-tip',
  templateUrl: './new-waitr-tip.component.html',
  styleUrls: ['./new-waitr-tip.component.css']
})
export class NewWaitrTipComponent implements OnInit {
  @Input() waitrData:WaitrTip;
  @Input() index: number;
  
  constructor(private waitrsBookService: WaitrsBookService) { }

  ngOnInit() {
  }

  onDelete(){
    this.waitrsBookService.deleteTip(this.index);
  }
}
