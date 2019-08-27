import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Auth } from '../auth.service';

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

  constructor(private auth: Auth) { }

  ngOnInit() {
  }

 public onSignUp(form: NgForm): void{
    form.value.userName = form.value.userName.toLowerCase();
    console.log(form.value)
    this.auth.register(form.value)
    .subscribe(
      (res) => { 
        this.creatingUser = true;

        setTimeout((form)=>{
          this.userCreated = true;
          console.log(form)
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
          setTimeout(()=>this.sucessfullyLogdIn = true,1500)
         
        },
        error => console.log(error)
      )
  }

}
