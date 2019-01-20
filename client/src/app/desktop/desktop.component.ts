import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-desktop',
  templateUrl: './desktop.component.html',
  styleUrls: ['./desktop.component.css']
})
export class DesktopComponent implements OnInit {

  chartType = 'bar'
  chartLabels = ['1/1','2,1','3/1','4/1','5/1','6/1','7/1'];
  chartData = [{data:[300,540,280,430,370,480,330]}]
  constructor() { }

  ngOnInit() {
  }

  onSubmit(){}

}
