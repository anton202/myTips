import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialog } from '@angular/material';

import { ErrorMessageComponenet } from '../../material/errorMessage/errorMessage.component';
import { environment } from '../../../environments/environment';
import { WaitrsBookService } from './waiters-book.service';
import { HttpClient } from '@angular/common/http';
import { ConfirmationDialog } from '../../material/confirmationDailog/confirmationDialog.component'
import { disableBindings } from '@angular/core/src/render3';


@Component({
  selector: 'app-waiters-book',
  templateUrl: './waiters-book.component.html',
  styleUrls: ['./waiters-book.component.css'],
  providers: [WaitrsBookService]
})
export class WaitersBookComponent implements OnInit, OnDestroy {
  waitrsStack = [];
  totalTips;
  totalTime;
  tipPerHour;
  moneyToGoverment;
  taxPerHour;
  barManTip = 0;
  workersNames;
  todaysDate: string = new Date().toLocaleDateString();
  loadGif = false;
  isDataSendedToServer = false;
  @ViewChild('f') waitrDataForm: NgForm


  constructor(private waitrsBookService: WaitrsBookService, private http: HttpClient, public dialog: MatDialog) { }

  ngOnInit() {
    this.waitrsBookService.getWorkersNames()
      .subscribe(workersNames => {
        this.workersNames = workersNames;
      },
        error => {
          this.dialog.open(ErrorMessageComponenet,{
            width: '300px'
          })
        }
      )
  }

  addWaitr(waitrData) {
    const startTime = waitrData.startTime.split(':');
    const endTime = waitrData.endTime.split(':');

    const start = new Date();
    const end = new Date();

    start.setHours(parseInt(startTime[0], 10), parseInt(startTime[1], 10));
    end.setHours(parseInt(endTime[0], 10), parseInt(endTime[1], 10));

    waitrData.totalTime = ((end.getTime() - start.getTime()) / (1000 * 60 * 60)).toFixed(2);
    this.waitrsStack.push(waitrData)

    this.waitrDataForm.reset()
  }

  openDialog(index){
    const dailogRef = this.dialog.open(ConfirmationDialog,{
      width: '350px'
    })

    dailogRef.afterClosed().subscribe(result =>{
      if(result){
      this.deleteWaitr(index)
    }
    })
  }

  deleteWaitr(index) {
    if (this.isDataSendedToServer) {
      this.loadGif = true;
      this.http.delete(environment.apiUrl + '/waitrsBook/deleteTip/' + JSON.stringify(this.waitrsStack[index]))
        .subscribe(res => {
          this.waitrsStack.splice(index, 1);
          this.loadGif = false;
        },
          error =>{
            this.dialog.open(ErrorMessageComponenet,{
              width: '300px'
            })
          })
      return
    }
    this.waitrsStack.splice(index, 1);
  }

  setYearMonth() {
    const date = new Date();
    const yearMonth = date.getFullYear() + '-' + date.getMonth();
    return yearMonth.toString();
  }

  calculateTips(totalTip) {
    this.loadGif = true;
    let i = 0
    let totalTime = 0;
    let tipPerHour = 0;
    let barManTip = 0;

    function calculateTax(tax, i) {
      this.waitrsStack[i].totalTip = Math.floor(this.waitrsStack[i].totalTime * tipPerHour);
      this.waitrsStack[i].moneyToGoverment = Math.round(this.waitrsStack[i].totalTip * tax);
      this.waitrsStack[i].totalTip -= this.waitrsStack[i].moneyToGoverment;
      this.waitrsStack[i].perHour = Number((this.waitrsStack[i].totalTip / this.waitrsStack[i].totalTime).toFixed(2));
    }

    //calculate total time worked by waitrs
    for (i; i < this.waitrsStack.length; i++) {
      totalTime += Number(this.waitrsStack[i].totalTime);
    }

    barManTip = totalTip * 0.1; // 10% to barman
    totalTip -= barManTip;
    tipPerHour = Number((totalTip / totalTime).toFixed(2));

    //add properties to each waitr inside waitrsStack
    for (let i = 0; i < this.waitrsStack.length; i++) {
      if (this.waitrsStack.length > 1 && totalTip - this.waitrsStack[i].totalTime * tipPerHour < 0) {
        throw console.log('error not enogh tip');
      }
      calculateTax.call(this, 0.2, i);

      this.waitrsStack[i].yearMonth = this.setYearMonth();
      this.waitrsStack[i].waitrsBook = true;

      totalTip -= this.waitrsStack[i].totalTip + this.waitrsStack[i].moneyToGoverment;
    }

    //initializing properties to show in html file
    this.totalTips = totalTip;
    this.totalTime = totalTime;
    this.tipPerHour = tipPerHour;
    this.barManTip = barManTip;

    // send all tips to server
    this.http.post(environment.apiUrl + '/waitrsBook/saveWaitrsTips', this.waitrsStack)
      .subscribe(() => {
        this.loadGif = false;
        this.isDataSendedToServer = true;
      }, error => {
        this.dialog.open(ErrorMessageComponenet,{
          width: '300px'
        })
      })
  }

  ngOnDestroy() {
    
  }

}
