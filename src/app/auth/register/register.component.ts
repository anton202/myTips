import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Auth } from '../auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  userAlreadyExist:boolean = false;
  userCreated :boolean = false
  constructor(private router:Router, private auth: Auth) { }

  ngOnInit() {
  }

  onSignUp(form: NgForm){
    this.auth.register(form.value)
    .subscribe(
      (res) => { 
        this.userCreated = true;
        if(this.userAlreadyExist){
          this.userAlreadyExist = false;
        }
        
        setTimeout(() => {
          this.router.navigate(['/sign-in']);
        }, 1500);
        
      },
      error => {
        this.userAlreadyExist = true;
      }
  )
  }

}
