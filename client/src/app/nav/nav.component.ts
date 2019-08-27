import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { RegisterComponent } from '../auth/register/register.component';
import { SignInComponent } from '../auth/sign-in/sign-in.component';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  date:Date = new Date();
  currentDate = this.date.getDate() + '.' + (this.date.getMonth() + 1) + '.' + this.date.getFullYear();

  constructor(private dialog: MatDialog) { }

  ngOnInit() {
  }

  public register():void{
    this.dialog.open(RegisterComponent);
  }

  public logIn(): void{
    this.dialog.open(SignInComponent)
  }

}
