import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
} from '@angular/common/http';
import { Observable, tap } from 'rxjs';


export class AuthInterceptor implements HttpInterceptor {


  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const authToken = localStorage.getItem('access_token');;

    if (authToken) {
      // Clone the request and attach the token
      const authReq = req.clone({
        setHeaders: {
          Authorization: `Bearer ${authToken}`
        }
      });
      return next.handle(authReq)
        .pipe(
          tap((res: any) => {
            if (res?.data) {
              localStorage.setItem('access_token', res['data'])
            }
          }),
          // catchError((err) => handleError(err))
)        ;
    }

    // If there is no token, pass the original request
    return next.handle(req);
  }
}
