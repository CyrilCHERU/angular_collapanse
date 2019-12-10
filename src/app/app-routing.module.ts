import { CareShowComponent } from './care-show/care-show.component';
import { CaresPatientListComponent } from './cares-patient-list/cares-patient-list.component';
import { InterListComponent } from './inter-list/inter-list.component';
import { InterFormComponent } from './inter-form/inter-form.component';
import { CareFormComponent } from './care-form/care-form.component';
import { CareListComponent } from './care-list/care-list.component';
import { PatientFormComponent } from './patient-form/patient-form.component';
import { LoginFormComponent } from './login-form/login-form.component';
import { PatientDetailsComponent } from './patient-details/patient-details.component';
import { PatientListComponent } from './patient-list/patient-list.component';
import { UserFormComponent } from './user-form/user-form.component';
import { ContactFormComponent } from './contact-form/contact-form.component';
import { InformationsComponent } from './informations/informations.component';
import { HomepageComponent } from './homepage/homepage.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  { path: '', component: HomepageComponent },
  { path: 'informations', component: InformationsComponent },
  { path: 'inscription', component: UserFormComponent },
  { path: 'contact', component: ContactFormComponent },
  { path: 'patients/nouveau', component: PatientFormComponent },
  { path: 'patients', component: PatientListComponent },
  { path: 'patients/:id', component: PatientDetailsComponent },
  { path: 'patients/:id/soins/nouveau', component: CareFormComponent },
  { path: 'login', component: LoginFormComponent },
  { path: 'patients/:id/edit', component: PatientFormComponent },
  { path: 'patients/:id/suivi', component: CaresPatientListComponent },
  { path: 'soins/nouveau', component: CareFormComponent },
  { path: 'soins', component: CareListComponent },
  { path: 'soins/suivi/:id/detail', component: CareShowComponent },
  { path: 'soins/:id/edit', component: CareFormComponent },
  { path: 'soins/:id/interventions/nouveau', component: InterFormComponent },
  { path: 'interventions', component: InterListComponent },
  { path: 'interventions/nouveau', component: InterFormComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
