import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Auth } from '../auth.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {
  errorMessage
  constructor(private router: Router, private auth: Auth) { }

  ngOnInit() {
  }

  onSignIn(form:NgForm){
   this.auth.login(form.value)
   .subscribe(
    response =>{ 
      console.log(response.token)
      localStorage.setItem('token',response.token)
      localStorage.setItem('userName',form.value.userName)
      this.router.navigate(['/menu']) 
    },
    error => this.errorMessage = error.error.message
  )
  }

}
