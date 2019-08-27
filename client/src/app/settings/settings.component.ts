import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material';


import { environment } from '../../environments/environment';
import { ErrorMessageComponenet } from '../material/errorMessage/errorMessage.component'


@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {
workersNames;

  constructor(private http: HttpClient,public dialog: MatDialog) { }

  ngOnInit() {
   this.getNames()
  }

  deleteWorker(workerName){
    this.http.delete(environment.apiUrl+'/user/deleteUser/'+workerName.workers)
    .subscribe(response =>{
      this.getNames()
    },
  error => {
    this.dialog.open(ErrorMessageComponenet,{
      width: '300px'
    })
  })
  }

getNames(){
  this.http.get(environment.apiUrl+'/user/getNames')
  .subscribe(names =>{
    this.workersNames = names;
  })
}

}
