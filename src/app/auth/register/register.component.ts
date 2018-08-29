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
