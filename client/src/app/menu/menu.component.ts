import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  constructor(private http: HttpClient,) { }

  ngOnInit() {
    const isUserExistInLocalStoreage = localStorage.getItem('userName');

    if(!isUserExistInLocalStoreage) return;
    
    this.http.get(environment.apiUrl+'/user/isTokenValid')
    .subscribe(
      response => {},
      error => {
        localStorage.removeItem('token');
        localStorage.removeItem('userName');
      })
    }


}
