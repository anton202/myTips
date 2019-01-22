import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment'


@Component({
  selector: 'app-desktop',
  templateUrl: './desktop.component.html',
  styleUrls: ['./desktop.component.css']
})
export class DesktopComponent implements OnInit {
  myTotalIncome;
  myTotalPerHourAvrg
  chartType = 'bar'
  //chartColors = [{backgroundColor:'#36a2eb'}]
  chartLabels = ['1/1','2,1','3/1','4/1','5/1','6/1','7/1'];
  chartData = [{data:[300,540,280,430,370,480,330],label:'טיפים'}]

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.http.get<{myTotalIncome,myTotalPerHourAvrg}>(environment.apiUrl + '/stats/myStats/'+localStorage.getItem('userName'))
      .subscribe(stats =>{
        this.myTotalIncome = stats.myTotalIncome;
        this.myTotalPerHourAvrg = stats.myTotalPerHourAvrg;
      },
      error =>{
        console.log(error)
      })
  }

  onSubmit(form){
    console.log(form)
  }

}
