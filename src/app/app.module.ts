import { AgePipe } from './pipes/age.pipe';
import { JwtInterceptor } from './authentication/jwt-auth/jwt.interceptor';
import { JwtAuthModule } from './authentication/jwt-auth/jwt-auth.module';

import { Splitphone } from './pipes/splitphone.pipe';
import { PaginationModule } from './pagination/pagination.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './partials/navbar/navbar.component';
import { FooterComponent } from './partials/footer/footer.component';
import { HomepageComponent } from './homepage/homepage.component';
import { InformationsComponent } from './informations/informations.component';
import { ContactFormComponent } from './contact-form/contact-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserFormComponent } from './user-form/user-form.component';
import { PatientListComponent } from './patients/patient-list/patient-list.component';
import { PatientDetailsComponent } from './patients/patient-details/patient-details.component';
import { LoginFormComponent } from './login-form/login-form.component';
import { PatientFormComponent } from './patients/patient-form/patient-form.component';
import { CareListComponent } from './cares/care-list/care-list.component';
import { CareFormComponent } from './cares/care-form/care-form.component';
import { InterFormComponent } from './interventions/inter-form/inter-form.component';
import { InterListComponent } from './interventions/inter-list/inter-list.component';
import { CaresPatientListComponent } from './cares/cares-patient-list/cares-patient-list.component';
import { CareShowComponent } from './cares/care-show/care-show.component';
import { InterDetailComponent } from './interventions/inter-detail/inter-detail.component';
import { ImageFormComponent } from './image-form/image-form.component';

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
    AgePipe,
    PatientDetailsComponent,
    LoginFormComponent,
    PatientFormComponent,
    CareListComponent,
    CareFormComponent,
    InterFormComponent,
    InterListComponent,
    CaresPatientListComponent,
    CareShowComponent,
    InterDetailComponent,
    ImageFormComponent,
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
