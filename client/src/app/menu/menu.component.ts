import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
todaysTips;
isTodaysTips = false;

  constructor(private router: Router,  private http: HttpClient,public dialog: MatDialog) { }

  ngOnInit() {
    this.http.get(environment.apiUrl+'/user/isTokenValid')
    .subscribe(
      response => {},
      error => {
        this.router.navigate(['/home'])
        localStorage.removeItem('token');
        localStorage.removeItem('userName');
      })
    }

  logOut(){
    localStorage.removeItem('token');
    localStorage.removeItem('userName');
    this.router.navigate(['/menu']);
  }

}
