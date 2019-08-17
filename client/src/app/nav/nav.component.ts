import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  date:Date = new Date();
  currentDate = this.date.getDate() + '.' + (this.date.getMonth() + 1) + '.' + this.date.getFullYear();
  constructor() { }

  ngOnInit() {
  }

}
