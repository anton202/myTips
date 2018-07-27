import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { HeaderComponent } from './header/header.component';
import { MenuComponent } from './menu/menu.component';
import { MyTipsComponent } from './menu/my-tips/my-tips.component';
import { WaitersBookComponent } from './menu/waiters-book/waiters-book.component';
import { StatisticsComponent } from './menu/statistics/statistics.component';
import { NewTipComponent } from './menu/my-tips/new-tip/new-tip.component';
import { AddTipComponent } from './menu/my-tips/add-tip/add-tip.component';
import { EditTipDirective } from './directives/edit-tip.directive';

const appRoutes:Routes = [{path:'',component: HomeComponent},
{path:'register', component:RegisterComponent},
{path:'sign-in',component: SignInComponent},
{path:'home', component: HomeComponent},
{path:'menu', component: MenuComponent},
{path:'my-tips', component: MyTipsComponent},
{path:'statistics', component: StatisticsComponent},
{path:'waiters-book', component: WaitersBookComponent}]

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
    NewTipComponent,
    AddTipComponent,
    EditTipDirective,
   
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
