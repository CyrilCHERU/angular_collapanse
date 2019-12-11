import { HttpErrorResponse } from '@angular/common/http';
import { CareService } from './../services/care.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Intervention } from './../Models/intervention';
import { Component, OnInit } from '@angular/core';
import { Care } from '../Models/care';
import { InterventionService } from '../services/intervention.service';

@Component({
  selector: 'app-inter-form',
  templateUrl: './inter-form.component.html',
  styleUrls: ['./inter-form.component.css']
})
export class InterFormComponent implements OnInit {

  error = false;
  isSubmited = false;
  plus = false;
  cares: Care[] = [];
  inter: Intervention;
  care: Care;

  interForm = new FormGroup({
    date: new FormControl('', Validators.required),
    comment: new FormControl('', Validators.required),
    care: new FormControl()
  });

  constructor(
    private route: ActivatedRoute,
    private careService: CareService,
    private interService: InterventionService,
    private router: Router) { }

  ngOnInit() {
    const careId = +this.route.snapshot.paramMap.get('id');
    this.careService.find(careId).subscribe(response => this.care = response);

  }

  public handleSubmit() {
    this.isSubmited = true;
    if (this.interForm.invalid) {
      return;
    }

    // Extraction des données
    this.interForm.patchValue({
      care: '/api/cares/' + this.care.id
    });
    console.log(this.interForm.value);
    const inter = this.interForm.value;
    // Création de l'intervention
    this.interService.create(inter).subscribe(this.onSuccess, this.onError);

  }

  private onSuccess = (updatedInter: Intervention) => {
    this.error = false;
    this.router.navigateByUrl('/soins/suivi/' + this.care.id + '/detail');
  }

  private onError = (httpError: HttpErrorResponse) => {
    // si ce n'est pas une erreur 400 => message d'alerte
    if (httpError.status !== 400) {
      this.error = true;
      return;
    }
    // si pas de violations sur les champs
    if (!httpError.error.violations) {
      return;
    }

    // apparition des erreurs sur les différents champs
    httpError.error.violations.forEach(violation => {
      this.interForm.get(violation.propertyPath).setErrors({
        validation: violation.message
      });
    });
  }

  public removeButton() {
    this.plus = true;
  }


}
