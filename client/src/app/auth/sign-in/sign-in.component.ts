import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialogRef, MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';

import { Auth } from '../auth.service';
import * as authActions from '../store/auth.actions'
import { RegisterComponent } from '../register/register.component';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {
  errorMessage
  public seccessfullyLogedIn: boolean = false;
  constructor( private auth: Auth, private dialogRef: MatDialogRef<SignInComponent>, private store: Store<{auth:{user}}>, private dialog: MatDialog) { }

  ngOnInit() {
  }

  public onSignIn(form: NgForm): void{
    form.value.userName = form.value.userName.toLowerCase()
    this.auth.login(form.value)
      .subscribe(
        response => {
          localStorage.setItem('token', response.token);
          localStorage.setItem('userName', form.value.userName);
          this.store.dispatch(new authActions.Login(form.value.userName))
          this.seccessfullyLogedIn = true;
          setTimeout(()=> this.dialogRef.close(),1500)
        },
        error => this.errorMessage = error.error.message
      )
  }

public openRegisterDialog(): void{
  this.dialogRef.close();
  this.dialog.open(RegisterComponent)
}

}
