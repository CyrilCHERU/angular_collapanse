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
import { HomepageComponent } from './public_pages/homepage/homepage.component';
import { InformationsComponent } from './public_pages/informations/informations.component';
import { ContactFormComponent } from './public_pages/contact-form/contact-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserFormComponent } from './users/user-form/user-form.component';
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
import { NgZorroAntdModule, NZ_I18N, fr_FR } from 'ng-zorro-antd';
import { registerLocaleData } from '@angular/common';
import { NzSelectModule } from 'ng-zorro-antd/select';
import fr from '@angular/common/locales/fr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UserEditComponent } from './users/user-edit/user-edit.component';
import { UserPasswordEditComponent } from './users/user-password-edit/user-password-edit.component';


registerLocaleData(fr);

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
    UserEditComponent,
    UserPasswordEditComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    PaginationModule,
    JwtAuthModule,
    NgZorroAntdModule,
    NzSelectModule,
    BrowserAnimationsModule

  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true
    },
    { provide: NZ_I18N, useValue: fr_FR },

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
