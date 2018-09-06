import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { error } from 'util';

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
    this.http.delete('http://localhost:8000/api/user/deleteUser/'+workerName.workers)
    .subscribe(response =>{
      this.getNames()
    },
  error => this.errorMessage = error.message)
  }

getNames(){
  this.http.get('http://localhost:8000/api/user/getNames')
  .subscribe(names =>{
    this.workersNames = names;
  })
}

}
