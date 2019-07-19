import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule,HTTP_INTERCEPTORS} from '@angular/common/http'
import { RouterModule } from '@angular/router';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatDialogModule} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './auth/register/register.component';
import { SignInComponent } from './auth/sign-in/sign-in.component';
import { MenuComponent } from './menu/menu.component';
import { WaitersBookComponent } from './menu/waiters-book/waiters-book.component';
import { ErrorMessageComponenet } from './material/errorMessage/errorMessage.component'
import { DesktopComponent } from './desktop/desktop.component';
import { ConfirmationDialog } from './material/confirmationDailog/confirmationDialog.component';
import { InstructionMessaageComponent } from './material/tipCalculatorInstructionsMessage/instruction.component';
import { NotEnoughTipError } from './material/notEnoughTipError/notEnoughTipError.component'
import { IncorrectTimeInputComponent } from './material/incorrectTimeInputsDialog/incorrectTimeInput.component'


import { EditTipDirective } from './directives/edit-tip.directive';
import { AppRoutingModule} from './app-routing.module';
import { MenuExtendDirective } from './directives/menu-extend.directive';
import { StatisticsModule } from './menu/statistics/statistics.module';
import { Auth } from './auth/auth.service';
import { AuthInterceptor } from './auth.interceptor';
import { SettingsComponent } from './menu/settings/settings.component'; 
import { ReuseblePipe} from './reusblePipe.module';
import { ChartsModule } from '../../node_modules/ng2-charts';
import { NavComponent } from './nav/nav.component';

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
    DesktopComponent,
    ErrorMessageComponenet,
    ConfirmationDialog,
    InstructionMessaageComponent,
    NotEnoughTipError,
    IncorrectTimeInputComponent,
    NavComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    AppRoutingModule,
    StatisticsModule,
    RouterModule,
    ReuseblePipe,
    ChartsModule,
    BrowserAnimationsModule,
    MatDialogModule,
    MatButtonModule
  ],
  entryComponents: [ErrorMessageComponenet,ConfirmationDialog,InstructionMessaageComponent,NotEnoughTipError,IncorrectTimeInputComponent],
  providers: [Auth,{ provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },],
  bootstrap: [AppComponent]
})
export class AppModule { }
