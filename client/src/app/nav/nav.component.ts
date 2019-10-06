import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { RegisterComponent } from '../auth/register/register.component';
import { SignInComponent } from '../auth/sign-in/sign-in.component';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {
  private date: Date = new Date();
  public currentDate: string = this.date.getDate() + '.' + (this.date.getMonth() + 1) + '.' + this.date.getFullYear();
  public userName: string;

  constructor(private dialog: MatDialog, private store: Store<{ auth: { user } }>, private router: Router) { }

  ngOnInit() {
    this.store.select('auth')
      .subscribe(user => {
        this.userName = user.user;
      })
  }

  public register(): void {
    this.dialog.open(RegisterComponent);
  }

  public logIn(): void {
    this.dialog.open(SignInComponent);
  }

  public openSettings(){
    if(!this.userName){
      return this.logIn();
    }
    this.router.navigate(['/settings'])
  }

}
