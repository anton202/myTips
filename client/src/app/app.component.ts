import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

import { environment } from '../environments/environment'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  
  constructor(private router:Router, private http: HttpClient){}

  ngOnInit(){
    const token = localStorage.getItem('token');

    if(!token){
      localStorage.removeItem('userName')
      return;
    }
    this.http.get(environment.apiUrl+'/user/isTokenValid')
    .subscribe(
      response => this.router.navigate(['/menu']),
      error => {
        this.router.navigate(['/menu'])
        localStorage.removeItem('token');
        localStorage.removeItem('userName');
      }
    )

  }
}
