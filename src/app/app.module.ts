import { JwtInterceptor } from './authentication/jwt-auth/jwt.interceptor';
import { JwtAuthModule } from './authentication/jwt-auth/jwt-auth.module';

import { Splitphone } from './pipes/splitphone.pipe';
import { PaginationModule } from './pagination/pagination.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { HomepageComponent } from './homepage/homepage.component';
import { InformationsComponent } from './informations/informations.component';
import { ContactFormComponent } from './contact-form/contact-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserFormComponent } from './user-form/user-form.component';
import { PatientListComponent } from './patient-list/patient-list.component';
import { PatientDetailsComponent } from './patient-details/patient-details.component';
import { LoginFormComponent } from './login-form/login-form.component';
import { PatientFormComponent } from './patient-form/patient-form.component';
import { CareListComponent } from './care-list/care-list.component';
import { CareFormComponent } from './care-form/care-form.component';
import { InterFormComponent } from './inter-form/inter-form.component';
import { InterListComponent } from './inter-list/inter-list.component';
import { CaresPatientListComponent } from './cares-patient-list/cares-patient-list.component';
import { CareShowComponent } from './care-show/care-show.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    HomepageComponent,
    InformationsComponent,
    ContactFormComponent,
    UserFormComponent,
    PatientListComponent,
    Splitphone,
    PatientDetailsComponent,
    LoginFormComponent,
    PatientFormComponent,
    CareListComponent,
    CareFormComponent,
    InterFormComponent,
    InterListComponent,
    CaresPatientListComponent,
    CareShowComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    PaginationModule,
    JwtAuthModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
