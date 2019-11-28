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
  { path: 'patients', component: PatientListComponent },
  { path: 'patients/:id', component: PatientDetailsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
