import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import * as AuthActions from '../auth/store/auth.actions';

@Component({
  selector: 'app-user-area',
  templateUrl: './user-area.component.html',
  styleUrls: ['./user-area.component.scss']
})
export class UserAreaComponent implements OnInit {

  constructor(private router: Router, private store: Store<{auth:{user}}>) { }

  ngOnInit() {
  }

public logOut(){
  this.store.dispatch(new AuthActions.Logout() )
    localStorage.removeItem('token');
    localStorage.removeItem('userName');
    this.router.navigate(['/menu']);
  }
}
