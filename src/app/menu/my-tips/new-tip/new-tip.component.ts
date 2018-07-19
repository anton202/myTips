import { Component, OnInit,Input } from '@angular/core';
import { Tip } from '../tip.model'; 

@Component({
  selector: 'app-new-tip',
  templateUrl: './new-tip.component.html',
  styleUrls: ['./new-tip.component.css']
})
export class NewTipComponent implements OnInit {
@Input() tip: Tip[] = [];
  constructor() { }

  ngOnInit() {
  }

}
