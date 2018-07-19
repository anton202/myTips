import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { HeaderComponent } from './header/header.component';
import { MenuComponent } from './menu/menu.component';
import { MyTipsComponent } from './menu/my-tips/my-tips.component';
import { WaitersBookComponent } from './menu/waiters-book/waiters-book.component';
import { StatisticsComponent } from './menu/statistics/statistics.component';
import { EditTipComponent } from './menu/my-tips/edit-tip/edit-tip.component';
import { NewTipComponent } from './menu/my-tips/new-tip/new-tip.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    RegisterComponent,
    SignInComponent,
    HeaderComponent,
    MenuComponent,
    MyTipsComponent,
    WaitersBookComponent,
    StatisticsComponent,
    EditTipComponent,
    NewTipComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
