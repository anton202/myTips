import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

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
      console.log(token)
      localStorage.removeItem('userName')
      return;
    }
    this.http.get('http://localhost:8000/api/user/isTokenValid')
    .subscribe(
      response => {this.router.navigate(['/menu'])
    console.log(response)},
      error => {
        console.log(error)
        this.router.navigate(['/sign-in'])
        localStorage.removeItem('token');
        localStorage.removeItem('userName');
      }
    )

  }
}
