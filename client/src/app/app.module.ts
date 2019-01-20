import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule,HTTP_INTERCEPTORS} from '@angular/common/http'
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './auth/register/register.component';
import { SignInComponent } from './auth/sign-in/sign-in.component';
import { MenuComponent } from './menu/menu.component';

import { WaitersBookComponent } from './menu/waiters-book/waiters-book.component';

import { EditTipDirective } from './directives/edit-tip.directive';
import { AppRoutingModule} from './app-routing.module';
import { MenuExtendDirective } from './directives/menu-extend.directive';
import { StatisticsModule } from './menu/statistics/statistics.module';
import { Auth } from './auth/auth.service';
import { AuthInterceptor } from './auth.interceptor';
import { SettingsComponent } from './menu/settings/settings.component'; 
import { ReuseblePipe} from './reusblePipe.module';
import { DesktopComponent } from './desktop/desktop.component';
import { ChartsModule } from 'ng2-charts';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    RegisterComponent,
    SignInComponent,
    MenuComponent,
    WaitersBookComponent,
    EditTipDirective,
    MenuExtendDirective,
    SettingsComponent,
    DesktopComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    AppRoutingModule,
    StatisticsModule,
    RouterModule,
    ReuseblePipe,
    ChartsModule
  ],
  providers: [Auth,{ provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },],
  bootstrap: [AppComponent]
})
export class AppModule { }
