import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatStepperModule } from '@angular/material/stepper';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatListModule } from '@angular/material/list';
import { MatTableModule } from '@angular/material/table';



import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './auth/register/register.component';
import { SignInComponent } from './auth/sign-in/sign-in.component';
import { MenuComponent } from './menu/menu.component';
import { WaitersBookComponent } from './menu/waiters-book/waiters-book.component';
import { ErrorMessageComponenet } from './material/errorMessage/errorMessage.component'
import { ConfirmationDialog } from './material/confirmationDailog/confirmationDialog.component';
import { InstructionMessaageComponent } from './material/tipCalculatorInstructionsMessage/instruction.component';
import { NotEnoughTipError } from './material/notEnoughTipError/notEnoughTipError.component'
import { IncorrectTimeInputComponent } from './material/incorrectTimeInputsDialog/incorrectTimeInput.component'


import { EditTipDirective } from './directives/edit-tip.directive';
import { AppRoutingModule } from './app-routing.module';
import { MenuExtendDirective } from './directives/menu-extend.directive';
import { StatisticsModule } from './menu/statistics/statistics.module';
import { Auth } from './auth/auth.service';
import { AuthInterceptor } from './auth.interceptor';
import { SettingsComponent } from './menu/settings/settings.component';
import { ReuseblePipe } from './reusblePipe.module';
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
    ReactiveFormsModule,
    AppRoutingModule,
    StatisticsModule,
    RouterModule,
    ReuseblePipe,
    ChartsModule,
    BrowserAnimationsModule,
    MatDialogModule,
    MatButtonModule,
    MatStepperModule,
    MatInputModule,
    MatSelectModule,
    NgxMaterialTimepickerModule,
    MatProgressSpinnerModule,
    MatListModule,
    MatTableModule
  ],
  entryComponents: [ErrorMessageComponenet, ConfirmationDialog, InstructionMessaageComponent, NotEnoughTipError, IncorrectTimeInputComponent],
  providers: [Auth, { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },],
  bootstrap: [AppComponent]
})
export class AppModule { }
