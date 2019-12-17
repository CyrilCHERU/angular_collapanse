import { AuthGuard } from './authentication/auth.guard';
import { ImageFormComponent } from './image-form/image-form.component';
import { InterDetailComponent } from './interventions/inter-detail/inter-detail.component';
import { CareShowComponent } from './cares/care-show/care-show.component';
import { CaresPatientListComponent } from './cares/cares-patient-list/cares-patient-list.component';
import { InterListComponent } from './interventions/inter-list/inter-list.component';
import { InterFormComponent } from './interventions/inter-form/inter-form.component';
import { CareFormComponent } from './cares/care-form/care-form.component';
import { CareListComponent } from './cares/care-list/care-list.component';
import { PatientFormComponent } from './patients/patient-form/patient-form.component';
import { LoginFormComponent } from './login-form/login-form.component';
import { PatientDetailsComponent } from './patients/patient-details/patient-details.component';
import { PatientListComponent } from './patients/patient-list/patient-list.component';
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
  { path: 'patients/nouveau', component: PatientFormComponent, canActivate: [AuthGuard] },
  { path: 'patients', component: PatientListComponent, canActivate: [AuthGuard] },
  { path: 'patients/:id', component: PatientDetailsComponent, canActivate: [AuthGuard] },
  { path: 'patients/:id/soins/nouveau', component: CareFormComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginFormComponent },
  { path: 'patients/:id/edit', component: PatientFormComponent, canActivate: [AuthGuard] },
  { path: 'patients/:id/soins/nouveau', component: CareFormComponent, canActivate: [AuthGuard] },
  { path: 'patients/:id/suivi', component: CaresPatientListComponent, canActivate: [AuthGuard] },
  { path: 'soins/nouveau', component: CareFormComponent, canActivate: [AuthGuard] },
  { path: 'soins', component: CareListComponent, canActivate: [AuthGuard] },
  { path: 'soins/suivi/:id/detail', component: CareShowComponent, canActivate: [AuthGuard] },
  { path: 'soins/:id/edit', component: CareFormComponent, canActivate: [AuthGuard] },
  { path: 'soins/:id/interventions/nouveau', component: InterFormComponent, canActivate: [AuthGuard] },
  { path: 'interventions', component: InterListComponent, canActivate: [AuthGuard] },
  { path: 'interventions/nouveau', component: InterFormComponent, canActivate: [AuthGuard] },
  { path: 'interventions/:id/detail', component: InterDetailComponent, canActivate: [AuthGuard] },
  { path: 'interventions/:id/edition', component: InterFormComponent, canActivate: [AuthGuard] },
  { path: 'interventions/:id/images/ajout', component: ImageFormComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
