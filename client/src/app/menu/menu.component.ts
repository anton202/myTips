import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../environments/environment';
import { WaitrsBookService } from './waiters-book/waiters-book.service';


@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
todaysTips;
  constructor(private router: Router,  private http: HttpClient) { }

  ngOnInit() {
    this.http.get(environment.apiUrl+'/user/isTokenValid')
    .subscribe(
      response => {},
      error => {
        this.router.navigate(['/home'])
        localStorage.removeItem('token');
        localStorage.removeItem('userName');
      })
      this.http.get(environment.apiUrl+'/waitrsBook/getTodaysTips')
      .subscribe(tips =>{
        this.todaysTips = tips
        console.log(tips)
      },error => console.log(error))
  }

  logOut(){
    localStorage.removeItem('token');
    localStorage.removeItem('userName');
    this.router.navigate(['/home']);
  }

}
