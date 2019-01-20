import { NgModule } from '@angular/core';

import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './auth/register/register.component';
import { SignInComponent } from './auth/sign-in/sign-in.component';
import { MenuComponent } from './menu/menu.component';
import { WaitersBookComponent } from './menu/waiters-book/waiters-book.component';
import { SettingsComponent } from './menu/settings/settings.component';
import { DesktopComponent } from './desktop/desktop.component';

const appRoutes:Routes = [{path:'',component: HomeComponent},
{path:'statistics', loadChildren:'./menu/statistics/statistics.module#StatisticsModule'},
{path:'register', component:RegisterComponent},
{path:'sign-in',component: SignInComponent},
{path:'home', component: HomeComponent},
{path:'menu', component: MenuComponent},
{path:'waiters-book', component: WaitersBookComponent},
{path:'settings', component:SettingsComponent},
{path:'desktop', component:DesktopComponent}
]


@NgModule({
    imports:[RouterModule.forRoot(appRoutes)],
    exports: [RouterModule]
})
export class AppRoutingModule{

}