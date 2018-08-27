import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import {Http } from '@angular/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  userAlreadyExist:boolean = false;
  userCreated :boolean = false
  constructor(private http: Http, private router:Router) { }

  ngOnInit() {
  }

  onSignUp(form: NgForm){
    this.http.post('http://localhost:8000/api/user/signUp',form.value)
    .subscribe(
      (res) => { 
        this.userAlreadyExist = false;
        this.userCreated = true;
        setTimeout(() => {
          this.router.navigate(['/menu']);
        }, 1000);
        
      },
      (error)=> {
        this.userAlreadyExist = true;
        this.userCreated = false;
       
      }
  )
  }

}
