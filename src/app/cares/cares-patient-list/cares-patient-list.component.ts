import { CareService } from '../../services/care.service';
import { PatientService } from '../../services/patient.service';
import { Patient } from '../../Models/patient';
import { ActivatedRoute } from '@angular/router';
import { Care } from '../../Models/care';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cares-details',
  templateUrl: './cares-patient-list.component.html',
  styleUrls: ['./cares-patient-list.component.css']
})
export class CaresPatientListComponent implements OnInit {

  result: any;
  cares: Care[] = [];
  patient: Patient;

  constructor(
    private route: ActivatedRoute,
    private patientService: PatientService,
    private careService: CareService) { }

  ngOnInit() {
    const id = +this.route.snapshot.paramMap.get('id');

    this.patientService.find(id).subscribe(response => {
      this.cares = response.cares;
      this.patient = response;
    });

    console.log(this.patient);
  }

  public removeCare(id: number) {
    this.careService.delete(id).subscribe(response => {
      this.result = response;
      const deleteCareId = this.cares.findIndex(care => care.id === id);
      this.cares.splice(deleteCareId, 1);
    }
    );
  }

}
