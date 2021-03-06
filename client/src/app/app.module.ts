import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StoreModule } from '@ngrx/store';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatStepperModule } from '@angular/material/stepper';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatListModule } from '@angular/material/list';
import { MatTableModule } from '@angular/material/table';
import {MatProgressBarModule} from '@angular/material/progress-bar';




import { AppComponent } from './app.component';
import { RegisterComponent } from './auth/register/register.component';
import { SignInComponent } from './auth/sign-in/sign-in.component';
import { MenuComponent } from './menu/menu.component';
import { WaitersBookComponent } from './menu/waiters-book/waiters-book.component';
import { ErrorMessageComponenet } from './material/errorMessage/errorMessage.component'
import { ConfirmationDialog } from './material/confirmationDailog/confirmationDialog.component';
import { StatisticsComponent } from './menu/statistics/statistics.component';
import { AppRoutingModule } from './app-routing.module';
import { Auth } from './auth/auth.service';
import { AuthInterceptor } from './auth.interceptor';
import { SettingsComponent } from './settings/settings.component';
import { NavComponent } from './nav/nav.component';
import { authReducer } from './auth/store/auth.reducer';
import { UserAreaComponent } from './user-area/user-area.component';

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    SignInComponent,
    MenuComponent,
    WaitersBookComponent,
    SettingsComponent,
    ErrorMessageComponenet,
    ConfirmationDialog,
    NavComponent,
    StatisticsComponent,
    UserAreaComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    RouterModule,
    BrowserAnimationsModule,
    MatDialogModule,
    MatButtonModule,
    MatStepperModule,
    MatInputModule,
    MatSelectModule,
    NgxMaterialTimepickerModule,
    MatProgressSpinnerModule,
    MatListModule,
    MatTableModule,
    MatProgressBarModule,
    StoreModule.forRoot({auth:authReducer})
  ],
  entryComponents: [ErrorMessageComponenet, ConfirmationDialog, RegisterComponent, SignInComponent],
  providers: [Auth, { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },],
  bootstrap: [AppComponent]
})
export class AppModule { }
