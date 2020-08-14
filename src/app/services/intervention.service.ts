import { map } from "rxjs/operators";
import { Intervention } from "../Models/intervention";
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root"
})
export class InterventionService {
  constructor(private http: HttpClient) {}

  public findAll() {
    return this.http
      .get<Intervention>(
        "http://api-collapanse.cyrilcheru.fr/public/api/interventions"
      )
      .pipe(map(response => response["hydra:member"] as Intervention[]));
  }

  public update(inter: Intervention) {
    return this.http.put<Intervention>(
      "http://api-collapanse.cyrilcheru.fr/public/api/interventions/" +
        inter.id,
      inter
    );
  }

  public create(inter: Intervention) {
    return this.http.post<Intervention>(
      "http://api-collapanse.cyrilcheru.fr/public/api/interventions",
      inter
    );
  }

  public find(id: number) {
    return this.http.get<Intervention>(
      "http://api-collapanse.cyrilcheru.fr/public/api/interventions/" + id
    );
  }

  public delete(id: number) {
    return this.http.delete(
      "http://api-collapanse.cyrilcheru.fr/public/api/interventions/" + id
    );
  }
}
