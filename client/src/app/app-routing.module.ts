import { NgModule } from '@angular/core';

import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './auth/register/register.component';
import { SignInComponent } from './auth/sign-in/sign-in.component';
import { MenuComponent } from './menu/menu.component';
import { WaitersBookComponent } from './menu/waiters-book/waiters-book.component';
import { SettingsComponent } from './settings/settings.component';
import { StatisticsComponent } from './menu/statistics/statistics.component';


const appRoutes:Routes = [{path:'',component: MenuComponent},
{path:'statistics', component: StatisticsComponent},
{path:'register', component:RegisterComponent},
{path:'sign-in',component: SignInComponent},
{path:'menu', component: MenuComponent},
{path:'waiters-book', component: WaitersBookComponent},
{path:'settings', component:SettingsComponent},
]


@NgModule({
    imports:[RouterModule.forRoot(appRoutes)],
    exports: [RouterModule]
})
export class AppRoutingModule{

}