import { ActivatedRoute } from '@angular/router';
import { Care } from '../Models/care';
import { CareService } from '../care.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cares-details',
  templateUrl: './cares-patient-list.component.html',
  styleUrls: ['./cares-patient-list.component.css']
})
export class CaresPatientListComponent implements OnInit {

  cares: Care[] = [];
  patient: string;

  constructor(private route: ActivatedRoute, private careService: CareService) { }

  ngOnInit() {
    const id = +this.route.snapshot.paramMap.get('id');

    this.careService.findForOnePatient(id).subscribe(response => this.cares = response);
    this.patient = this.cares.patient.fullName;
    console.log(this.patient);
  }

}
