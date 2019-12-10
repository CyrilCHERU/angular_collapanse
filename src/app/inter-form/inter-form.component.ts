import { HttpErrorResponse } from '@angular/common/http';
import { CareService } from './../services/care.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';
import { Intervention } from './../Models/intervention';
import { Component, OnInit } from '@angular/core';
import { Care } from '../Models/care';

@Component({
  selector: 'app-inter-form',
  templateUrl: './inter-form.component.html',
  styleUrls: ['./inter-form.component.css']
})
export class InterFormComponent implements OnInit {

  error = false;
  isSubmited = false;
  cares: Care[] = [];
  inter: Intervention;
  care: Care;

  interForm = new FormGroup({
    date: new FormControl(),
    comment: new FormControl(),
    care: new FormControl()
  });

  constructor(private route: ActivatedRoute, private careService: CareService, private router: Router) { }

  ngOnInit() {
    const careId = +this.route.snapshot.paramMap.get('id');
    this.careService.find(careId).subscribe(response => this.care = response);
    console.log(this.care);
  }

  public handleSubmit() {
    const careId = +this.route.snapshot.paramMap.get('id');
    this.isSubmited = true;
    if (this.interForm.invalid) {
      return;
    }
    console.log(careId);

    if (careId) {
      this.interForm.patchValue({
        care: '/api/cares/' + careId
      });
      console.log(this.interForm.value);
    }

  }

  private onSuccess = (updatedInter: Intervention) => {
    this.error = false;
    this.router.navigateByUrl('/soins/suivi/' + updatedInter.id + '/detail');
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



}
