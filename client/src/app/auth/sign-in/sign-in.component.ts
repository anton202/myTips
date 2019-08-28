import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

import { Auth } from '../auth.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {
  errorMessage
  public seccessfullyLogedIn: boolean = false;
  constructor( private auth: Auth, private dialogRef: MatDialogRef<SignInComponent>) { }

  ngOnInit() {
  }

  onSignIn(form: NgForm) {
    form.value.userName = form.value.userName.toLowerCase()
    this.auth.login(form.value)
      .subscribe(
        response => {
          localStorage.setItem('token', response.token);
          localStorage.setItem('userName', form.value.userName);
          this.seccessfullyLogedIn = true;
          setTimeout(()=> this.dialogRef.close(form.value.userName),1500)
        },
        error => this.errorMessage = error.error.message
      )
  }

}
