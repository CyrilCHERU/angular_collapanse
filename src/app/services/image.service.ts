import { Image } from './../Models/image';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  constructor(private http: HttpClient) { }

  public delete(id: number) {
    return this.http.delete('http://localhost:8000/api/images/' + id);
  }

  public insert(img: Image) {
    return this.http.post<Image>('http://localhost:8000/api/images', img);
  }
}