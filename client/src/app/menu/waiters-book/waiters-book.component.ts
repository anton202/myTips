import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

import { environment } from '../../../environments/environment';
import { WaitrsBookService } from './waiters-book.service';
import { Subscription } from 'rxjs/Subscription';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-waiters-book',
  templateUrl: './waiters-book.component.html',
  styleUrls: ['./waiters-book.component.css'],
  providers:[WaitrsBookService]
})
export class WaitersBookComponent implements OnInit,OnDestroy {
  waitrsStack = [];
  totalTips;
  totalTime;
  tipPerHour;
  moneyToGoverment;
  taxPerHour;
  barManTip = 0;  
  workersNames;
  todaysDate:string = new Date().toLocaleDateString();
  errorMessageSub: Subscription; 
  errorMessaage: string;
  loadGif = false;
  isDataSendedToServer = false;
  @ViewChild('f') waitrDataForm: NgForm
  

  constructor(private waitrsBookService: WaitrsBookService, private http: HttpClient){}

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

  setYearMonth(){
    const date = new Date();
    const yearMonth = date.getFullYear()+'-'+date.getMonth();
    return yearMonth.toString();
  }


  calculateTips(totalTip){
    this.loadGif = true;

    let totalTime = 0;
    let tipPerHour = 0;
    let barManTip = 0;
    let taxPerHour = 0;

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

        if(tipPerHour < 50){
          this.waitrsStack[i].totalTip = Math.floor(this.waitrsStack[i].totalTime * tipPerHour);
          this.waitrsStack[i].perHour = tipPerHour;

      }
      if(tipPerHour >= 50 && tipPerHour < 55){
          this.waitrsStack[i].totalTip = Math.floor(this.waitrsStack[i].totalTime * (tipPerHour - 11));
          this.waitrsStack[i].moneyToGoverment = Math.round(this.waitrsStack[i].totalTime * 11);
          this.waitrsStack[i].perHour = Number((tipPerHour - 11).toFixed(2));
          this.waitrsStack[i].taxPerHour = 11;
      }
      if(tipPerHour >= 55 && tipPerHour < 60){
          this.waitrsStack[i].totalTip = Math.floor(this.waitrsStack[i].totalTime * (tipPerHour - 12));
          this.waitrsStack[i].moneyToGoverment = Math.round(this.waitrsStack[i].totalTime * 12);
          this.waitrsStack[i].perHour = Number((tipPerHour - 12).toFixed(2));
          this.waitrsStack[i].taxPerHour = 12;
      }
      if(tipPerHour >= 60 && tipPerHour < 65){
          this.waitrsStack[i].totalTip = Math.floor(this.waitrsStack[i].totalTime * (tipPerHour - 13));
          this.waitrsStack[i].moneyToGoverment = Math.round(this.waitrsStack[i].totalTime * 13);
          this.waitrsStack[i].perHour = Number((tipPerHour - 13).toFixed(2));
          this.waitrsStack[i].taxPerHour = 13;
      }
      if(tipPerHour >= 65 && tipPerHour < 70){
          this.waitrsStack[i].totalTip = Math.floor(this.waitrsStack[i].totalTime * (tipPerHour - 14));
          this.waitrsStack[i].moneyToGoverment = Math.round(this.waitrsStack[i].totalTime * 14);
          this.waitrsStack[i].perHour = Number((tipPerHour - 14).toFixed(2));
          this.waitrsStack[i].taxPerHour = 14;
      }
      if(tipPerHour >= 70 && tipPerHour < 75){
          this.waitrsStack[i].totalTip = Math.floor(this.waitrsStack[i].totalTime * (tipPerHour - 15));
          this.waitrsStack[i].moneyToGoverment = Math.round(this.waitrsStack[i].totalTime * 15);
          this.waitrsStack[i].perHour = Number((tipPerHour - 15).toFixed(2));
          this.waitrsStack[i].taxPerHour = 15;
      }
      if(tipPerHour >= 75 && tipPerHour < 80){
          this.waitrsStack[i].totalTip = Math.floor(this.waitrsStack[i].totalTime * (tipPerHour - 17));
          this.waitrsStack[i].moneyToGoverment = Math.round(this.waitrsStack[i].totalTime * 17);
          this.waitrsStack[i].perHour = Number((tipPerHour - 17).toFixed(2));
          this.waitrsStack[i].taxPerHour = 17;
      }
      if(tipPerHour >= 80 ){
          this.waitrsStack[i].totalTip = Math.floor(this.waitrsStack[i].totalTime * (tipPerHour - 19));
          this.waitrsStack[i].moneyToGoverment = Math.round(this.waitrsStack[i].totalTime * 19);
          this.waitrsStack[i].perHour = Number((tipPerHour - 19).toFixed(2));
          this.waitrsStack[i].taxPerHour = 19;
      }

        this.waitrsStack[i].yearMonth = this.setYearMonth();
        this.waitrsStack[i].waitrsBook = true;
        
        totalTip -= this.waitrsStack[i].totalTip + this.waitrsStack[i].moneyToGoverment;
    }

    //initializing properties to show in html file
    this.totalTips = totalTip;
    this.totalTime = totalTime;
    this.tipPerHour = tipPerHour;
    this.barManTip = barManTip;
    //taking first waitr object from array to initialize tax per hour
    this.taxPerHour = this.waitrsStack[0].taxPerHour;

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
