import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

export class JwtInterceptor implements HttpInterceptor {

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = window.localStorage.getItem('token');

    if (!token) {
      return next.handle(req);
    }

    const updatedReq = req.clone({
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token
      })
    });

    return next.handle(updatedReq);
  }
}
