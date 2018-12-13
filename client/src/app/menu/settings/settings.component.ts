import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {
workersNames;
errorMessage;

  constructor(private http: HttpClient) { }

  ngOnInit() {
   this.getNames()
  }

  deleteWorker(workerName){
    this.http.delete(environment.apiUrl+'/user/deleteUser/'+workerName.workers)
    .subscribe(response =>{
      this.getNames()
    },
  error => this.errorMessage = error.error.message)
  }

getNames(){
  this.http.get(environment.apiUrl+'/user/getNames')
  .subscribe(names =>{
    this.workersNames = names;
  })
}

}
