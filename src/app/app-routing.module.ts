import { NgModule } from '@angular/core';

import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { MenuComponent } from './menu/menu.component';
import { MyTipsComponent } from './menu/my-tips/my-tips.component';
import { WaitersBookComponent } from './menu/waiters-book/waiters-book.component';
import { StatisticsComponent } from './menu/statistics/statistics.component';

const appRoutes:Routes = [{path:'',component: HomeComponent},
{path:'register', component:RegisterComponent},
{path:'sign-in',component: SignInComponent},
{path:'home', component: HomeComponent},
{path:'menu', component: MenuComponent},
{path:'my-tips', component: MyTipsComponent},
{path:'statistics', component: StatisticsComponent},
{path:'waiters-book', component: WaitersBookComponent}]


@NgModule({
    imports:[RouterModule.forRoot(appRoutes)],
    exports: [RouterModule]
})
export class AppRoutingModule{

}