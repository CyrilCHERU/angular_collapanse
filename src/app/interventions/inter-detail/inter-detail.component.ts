import { Image } from "./../../Models/image";
import { ImageService } from "../../services/image.service";
import { Intervention } from "../../Models/intervention";
import { InterventionService } from "../../services/intervention.service";
import { ActivatedRoute } from "@angular/router";
import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-inter-detail",
  templateUrl: "./inter-detail.component.html",
  styleUrls: ["./inter-detail.component.css"]
})
export class InterDetailComponent implements OnInit {
  result: any;
  intervention: Intervention;
  images: Image[] = [];

  constructor(
    private route: ActivatedRoute,
    private interService: InterventionService,
    private imageService: ImageService
  ) {}

  ngOnInit() {
    const id = +this.route.snapshot.paramMap.get("id");

    this.interService.find(id).subscribe(response => {
      this.intervention = response;
      this.images = response.images;
    });
  }

  public remove(id: number) {
    this.interService.delete(id).subscribe(response => {
      this.result = response;
    });
  }

  public removeImage(id: number) {
    this.imageService.delete(id).subscribe(response => {
      this.result = response;
      const deleteImageId = this.images.findIndex(image => image.id === id);
      this.images.splice(deleteImageId, 1);
    });
  }
}
