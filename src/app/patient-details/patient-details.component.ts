import { Professional } from './../Models/professional';
import { UserService } from '../services/user.service';
import { PatientService } from '../services/patient.service';
import { Patient } from './../Models/patient';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-patient-details',
  templateUrl: './patient-details.component.html',
  styleUrls: ['./patient-details.component.css']
})
export class PatientDetailsComponent implements OnInit {

  patient: Patient;
  doctor: Professional;

  constructor(private patientService: PatientService, private userService: UserService, private route: ActivatedRoute) { }

  ngOnInit() {
    const id = +this.route.snapshot.paramMap.get('id');

    this.patientService.find(id).subscribe(response => {
      this.patient = response;

    });


    console.log(this.patient);
  }

  public removePatient(id: number) {
    alert('Au click, on efface');
  }

}
