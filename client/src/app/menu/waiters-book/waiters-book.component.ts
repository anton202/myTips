import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

import { environment } from '../../../environments/environment';
import { WaitrsBookService } from './waiters-book.service';
import { AddTipService } from '../my-tips/add-tip/add-tip.service';
import { Subscription } from 'rxjs/Subscription';
import { HttpClient } from '@angular/common/http';
import { error } from 'util';


@Component({
  selector: 'app-waiters-book',
  templateUrl: './waiters-book.component.html',
  styleUrls: ['./waiters-book.component.css'],
  providers:[WaitrsBookService, AddTipService]
})
export class WaitersBookComponent implements OnInit,OnDestroy {
  waitrsStack = [];
  totalTips;
  totalTime;
  tipPerHour
  barManTip = 0;  
  workersNames;
  todaysDate:string = new Date().toLocaleDateString();
  errorMessageSub: Subscription; 
  errorMessaage: string;
  loadGif = false;
  isDataSendedToServer = false;
  @ViewChild('f') waitrDataForm: NgForm
  

  constructor(private waitrsBookService: WaitrsBookService, private addTipService: AddTipService, private http: HttpClient){}

  ngOnInit() {
    this.waitrsBookService.getWorkersNames()
    .subscribe(workersNames =>{
     this.workersNames = workersNames;
    },
    error => this.errorMessaage = error.message
    )
    this.errorMessageSub = this.waitrsBookService.errorMessage.subscribe(error => this.errorMessaage = error)
    
  }

  addWaitr(waitrData){
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

  deleteWaitr(index){
    if(this.isDataSendedToServer){
      this.loadGif = true;
      this.http.delete(environment.apiUrl+'/waitrsBook/deleteTip/'+JSON.stringify(this.waitrsStack[index]))
      .subscribe(res =>{
        this.waitrsStack.splice(index,1);
        this.loadGif = false;
      },
      error => this.errorMessaage = error.error.message )
      return
    }
    this.waitrsStack.splice(index,1);
  }

  calculateTips(totalTip){
    this.loadGif = true;

    let totalTime = 0;
    let tipPerHour = 0;
    let barManTip = 0;

    //calculate total time worked by waitrs
    for (let i = 0; i < this.waitrsStack.length; i++) {
        totalTime += Number(this.waitrsStack[i].totalTime);
    }

    barManTip = totalTip * 0.1; // 10% to barman
    totalTip -= barManTip;
    tipPerHour = Number((totalTip / totalTime).toFixed(2)); 
    
    //add properties to each waitr inside waitrsStack
    for (let i = 0; i < this.waitrsStack.length; i++ ){
        if(this.waitrsStack.length > 1 && totalTip - this.waitrsStack[i].totalTime * tipPerHour < 0){
            throw console.log('error not enogh tip');
        }
        //add to waitr - totalTip property, perHour property and month property
        this.waitrsStack[i].totalTip = Math.floor(this.waitrsStack[i].totalTime * tipPerHour);
        this.waitrsStack[i].perHour = tipPerHour;
        this.waitrsStack[i].yearMonth = this.addTipService.setYearMonth();
        this.waitrsStack[i].waitrsBook = true;
        
        totalTip -= this.waitrsStack[i].totalTip;
    }

    //initializing properties to show in html file
    this.totalTips = totalTip;
    this.totalTime = totalTime;
    this.tipPerHour = tipPerHour;
    this.barManTip = barManTip;

    // send all tips to server
    this.http.post(environment.apiUrl+'/waitrsBook/saveWaitrsTips',this.waitrsStack)
        .subscribe(()=>{
         this.loadGif = false;
         this.isDataSendedToServer = true;
        },error =>{
            this.errorMessaage = error.error.message
        })  
  }

  ngOnDestroy(){
    this.errorMessageSub.unsubscribe();
    
  }

}
