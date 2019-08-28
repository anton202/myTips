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
  private date: Date = new Date();
  public currentDate: string = this.date.getDate() + '.' + (this.date.getMonth() + 1) + '.' + this.date.getFullYear();
  public userName = localStorage.getItem('userName');

  constructor(private dialog: MatDialog) { }

  ngOnInit() {
  }

  public register(): void {
    const dialogRef = this.dialog.open(RegisterComponent);
    dialogRef.afterClosed()
      .subscribe(userName => this.userName = userName)
  }

  public logIn(): void {
   const dialogRef = this.dialog.open(SignInComponent);
   dialogRef.afterClosed()
    .subscribe(userName => this.userName = userName)
  }

}
