import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './auth/register/register.component';
import { SignInComponent } from './auth/sign-in/sign-in.component';
import { HeaderComponent } from './header/header.component';
import { MenuComponent } from './menu/menu.component';
import { MyTipsComponent } from './menu/my-tips/my-tips.component';
import { WaitersBookComponent } from './menu/waiters-book/waiters-book.component';

import { NewTipComponent } from './menu/my-tips/new-tip/new-tip.component';
import { AddTipComponent } from './menu/my-tips/add-tip/add-tip.component';
import { EditTipDirective } from './directives/edit-tip.directive';
import { AppRoutingModule} from './app-routing.module';
import {StickyModule} from 'ng2-sticky-kit';
import { NewWaitrTipComponent } from './menu/waiters-book/new-waitr-tip/new-waitr-tip.component';
import { WaitrsBookDirective } from './directives/waitrs-book.directive';
import { StatisticsModule } from './menu/statistics/statistics.module';

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
    NewTipComponent,
    AddTipComponent,
    EditTipDirective,
    NewWaitrTipComponent,
    WaitrsBookDirective,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    StickyModule,
    StatisticsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
