import { Component, OnInit } from '@angular/core';

import { HttpClient } from '@angular/common/http';

import { environment } from '../environments/environment'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor( private http: HttpClient) { }

  ngOnInit() {
    const token = localStorage.getItem('token');

    if (!token) {
      localStorage.removeItem('userName')
      return;
    }
    this.http.get(environment.apiUrl + '/user/isTokenValid')
      .subscribe(
        response => {},
        error => {
          localStorage.removeItem('token');
          localStorage.removeItem('userName');
        }
      )

  }
}
