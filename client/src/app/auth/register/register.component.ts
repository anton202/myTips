import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Auth } from '../auth.service';
import { MatDialogRef } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import * as authActions from '../store/auth.actions';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  public userAlreadyExist:boolean = false;
  public creatingUser: boolean = false;
  public userCreated: boolean = false;
  public logingIn: boolean = false;
  public sucessfullyLogdIn: boolean = false;
  public progressBarComplition: number = 0;

  constructor(private auth: Auth, private dialogRef: MatDialogRef<RegisterComponent>, private store: Store<{auth:{user}}>) { }

  ngOnInit() {
  }

 public onSignUp(form: NgForm): void{
    form.value.userName = form.value.userName.toLowerCase();
    this.auth.register(form.value)
    .subscribe(
      (res) => { 
        this.creatingUser = true;
        this.progressBarComplition = 25;
        setTimeout((form)=>{
          this.userCreated = true;
          this.progressBarComplition = 50;
          this.logIn(form);
        },1500,form.value)
        
        if(this.userAlreadyExist){
          this.userAlreadyExist = false;
        }
      },
      error => {
        this.userAlreadyExist = true;
      }
  )}


  private logIn(logInData): void{
    this.auth.login(logInData)
      .subscribe(
        response => {
          localStorage.setItem('token', response.token);
          localStorage.setItem('userName', logInData.userName);
          this.logingIn = true;
          this.progressBarComplition = 75;
          setTimeout(()=>{
            this.sucessfullyLogdIn = true
            this.progressBarComplition = 100;
            this.store.dispatch(new authActions.Login(logInData.userName))
          },1500)
         setTimeout(()=> this.dialogRef.close(),3500)
        },
        error => console.log(error)
      )
  }

}
