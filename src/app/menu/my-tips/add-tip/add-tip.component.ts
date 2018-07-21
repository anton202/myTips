import { Component, OnInit,EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-add-tip',
  templateUrl: './add-tip.component.html',
  styleUrls: ['./add-tip.component.css']
})
export class AddTipComponent implements OnInit {
  @Output() emDate = new EventEmitter<string>()
  constructor() { }

  ngOnInit() {
  }

  addTip(newTip){
    this.emDate.emit(newTip)
  }

}
