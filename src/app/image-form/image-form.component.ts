import { HttpErrorResponse } from '@angular/common/http';
import { ImageService } from './../services/image.service';
import { Image } from './../Models/image';
import { Intervention } from './../Models/intervention';
import { InterventionService } from './../services/intervention.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-image-form',
  templateUrl: './image-form.component.html',
  styleUrls: ['./image-form.component.css']
})
export class ImageFormComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private interService: InterventionService,
    private imageService: ImageService,
    private router: Router
  ) { }

  create = true;
  error = false;
  intervention: Intervention;
  wound: string;
  patient: string;
  image: Image;

  imageForm = new FormGroup({
    date: new FormControl(),
    caption: new FormControl(),
    url: new FormControl(),
    intervention: new FormControl()
  });

  ngOnInit() {
    const interId = +this.route.snapshot.paramMap.get('id');
    this.interService.find(interId).subscribe(intervention => {
      this.intervention = intervention;
      this.wound = intervention.care.woundType;
      this.patient = intervention.care.patient.fullName;
      this.imageForm.patchValue({
        intervention: '/api/interventions/' + this.intervention.id
      });
    });

  }

  public handleSubmit() {
    if (this.imageForm.invalid) {
      return;
    }

    const image = this.imageForm.value;
    console.log(this.imageForm.value);

    this.imageService.insert(image).subscribe(this.onSuccess, this.onError);



  }

  private onSuccess = (image: Image) => {
    this.error = false;
    this.router.navigateByUrl('/interventions/' + this.intervention.id + '/detail');
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
      this.imageForm.get(violation.propertyPath).setErrors({
        validation: violation.message
      });
    });
  }

}
