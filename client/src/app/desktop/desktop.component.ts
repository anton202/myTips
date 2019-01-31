import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment'
import { MatDialog } from '@angular/material';

import { ErrorMessageComponenet } from '../material/errorMessage/errorMessage.component'
import { BaseChartDirective } from 'ng2-charts/ng2-charts';
import { ChartColors } from './chartColors';

@Component({
  selector: 'app-desktop',
  templateUrl: './desktop.component.html',
  styleUrls: ['./desktop.component.css']
})
export class DesktopComponent implements OnInit {
  myTotalIncome;
  myTotalPerHourAvrg
  totalPerHourAvrg;
  chartType = 'bar'
  chartLabels = [];
  chartData = [{ data: [] }]
  chartColors = new ChartColors()
  @ViewChild(BaseChartDirective) chart: BaseChartDirective;

  constructor(private http: HttpClient, public dialog: MatDialog) { }

  ngOnInit() {
    this.http.get<{ myTotalIncome, myTotalPerHourAvrg }>(environment.apiUrl + '/stats/myStats/' + localStorage.getItem('userName'))
      .subscribe(stats => {
        this.myTotalIncome = stats.myTotalIncome;
        this.myTotalPerHourAvrg = stats.myTotalPerHourAvrg;
      },
        error => {
          this.dialog.open(ErrorMessageComponenet, {
            width: '300px'
          })
        })

    this.http.get<{ perHourAvrg }>(environment.apiUrl + '/stats/waitrsBookStats')
      .subscribe((stats) => {
        this.totalPerHourAvrg = stats.perHourAvrg;
      },
        error => {
          this.dialog.open(ErrorMessageComponenet, {
            width: '300px'
          })
        })
  }

  onSubmit(form) {
    window.open(environment.apiUrl + '/stats/getExcel/' + form.whosTips + '/' + form.year + '-' + form.month + '/' + localStorage.getItem('userName'))
  }

  getDataForChart(info) {
    const timePeriod = info.timePeriod;
    const whosTips = info.whosTips;
    const userName = localStorage.getItem('userName');

    this.http.get<[{ date, totalTip, name }]>(environment.apiUrl + '/stats/chart/' + whosTips + '/' + timePeriod + '/' + userName)
      .subscribe(tips => {

        let chartData = [];
        this.chartLabels.length = 0;
        for (let i = 0; i < tips.length; i++) {
          if (this.chartLabels.indexOf(tips[i].date) === -1) {
            this.chartLabels.push(tips[i].date)
          }

          let chartDataEl = chartData.find((el) => {
            if (el.label === tips[i].name) {

              return el
            }
          })

          if (chartDataEl) {
            chartDataEl.data.push(tips[i].totalTip)

          } else {
            chartData.push({ data: [tips[i].totalTip], backgroundColor: 'rgba(' + this.chartColors.defaultColors[chartData.length] + ')', label: tips[i].name });
          }
        }

        this.chart.chart.config.data.datasets = chartData
        this.chart.chart.update();
      },
        error => {
          this.dialog.open(ErrorMessageComponenet, {
            width: '300px'
          })
        })
  }



}
