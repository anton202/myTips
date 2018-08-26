import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import {HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  userAlreadyExist:boolean = false;

  constructor(private http: HttpClient) { }

  ngOnInit() {
  }

  onSignUp(form: NgForm){
    console.log(form.value);
    this.http.post('http://localhost:8000/api/user/sign-up',form.value)
    .subscribe(res => {
      console.log(res);
      this.userAlreadyExist = false;
    },err=>{
      this.userAlreadyExist = true;
    })

  }

}
