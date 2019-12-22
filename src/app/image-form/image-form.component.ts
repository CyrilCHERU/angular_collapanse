import { Patient } from './../Models/patient';
import { HttpErrorResponse } from '@angular/common/http';
import { ImageService } from './../services/image.service';
import { Image } from './../Models/image';
import { Intervention } from './../Models/intervention';
import { InterventionService } from './../services/intervention.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';

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

  isSubmited = false;
  create = true;
  error = false;
  intervention: Intervention;
  wound: string;
  patient: Patient;
  image: Image;

  imageForm = new FormGroup({
    date: new FormControl(),
    caption: new FormControl(),
    url: new FormControl(),
    intervention: new FormControl()
  });

  ngOnInit() {
    // Récupération de la route et Analyse de la route
    const url = this.route.snapshot.url;
    if (url[0].path === 'images') {
      const imageId = +url[1];
      this.imageService.find(imageId).subscribe(image => {
        this.image = image;
        this.imageForm.patchValue({
          date: moment(this.image.date).format('YYYY-MM-DD'),
          caption: this.image.caption,
          url: this.image.url,
          intervention: '/api/interventions/' + this.image.intervention.id
        });
        console.log(this.imageForm.value);
        this.patient = image.intervention.care.patient;
        console.log(this.image.intervention.id);
        this.create = false;
      });
    } else if (url[0].path === 'interventions') {
      const interId = +url[1];
      this.interService.find(interId).subscribe(intervention => {
        this.intervention = intervention;
        this.wound = intervention.care.woundType;
        this.patient = intervention.care.patient;
        this.imageForm.patchValue({
          intervention: '/api/interventions/' + this.intervention.id
        });
        this.create = true;
        console.log(this.intervention.id);
      });
    }
    // Création de la date du jour par défaut
    const today = new Date();
    this.imageForm.patchValue({
      date: moment(today).format('YYYY-MM-DD')
    });
  }

  public handleSubmit() {
    this.isSubmited = true;

    if (this.imageForm.invalid) {
      return;
    }

    if (this.image) {
      const updatedImage = this.imageForm.value;
      updatedImage.id = this.image.id;
      console.log(updatedImage);
      this.imageService.update(updatedImage).subscribe(this.onSuccess, this.onError);
      return;
    }

    const image = this.imageForm.value;
    console.log(this.imageForm.value);

    this.imageService.insert(image).subscribe(this.onSuccess, this.onError);
  }

  private onSuccess = (image: Image) => {
    this.error = false;
    if (this.image) {
      this.router.navigateByUrl('/interventions/' + this.image.intervention.id + '/detail');
    } else {
      this.router.navigateByUrl('/interventions/' + this.intervention.id + '/detail');
    }
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

  public cancel(id: number) {
    this.router.navigateByUrl('/interventions/' + id + '/detail');
  }

}
