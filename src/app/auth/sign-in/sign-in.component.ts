import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Http } from '@angular/http';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {

  constructor(private router: Router, private http:Http) { }

  ngOnInit() {
  }

  onSignIn(form:NgForm){
    this.http.post('http://localhost:8000/api/user/login',form.value)
      .subscribe(
        response => console.log(response),
        error => console.log(error)
      )
  }
}
