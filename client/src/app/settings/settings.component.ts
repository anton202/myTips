import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material';


import { environment } from '../../environments/environment';
import { ErrorMessageComponenet } from '../material/errorMessage/errorMessage.component'


@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {
 public workersNames: string[];
 public deletedWaitr: string;

  constructor(private http: HttpClient, public dialog: MatDialog) { }

  ngOnInit() {
    this.getNames()
  }

  public deleteWorker(workerName): void{
    this.http.delete(environment.apiUrl + '/user/deleteUser/' + workerName.workers)
      .subscribe(response => {
        this.getNames()
        this.deletedWaitr = workerName.workers;
      },
        error => {
          this.dialog.open(ErrorMessageComponenet, {
            width: '300px'
          })
        })
  }

  private getNames(): void{
    this.http.get<string[]>(environment.apiUrl + '/user/getNames')
      .subscribe(names => {
        this.workersNames = names;
      })
  }

}
