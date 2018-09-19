import {HttpClient, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {Observable, throwError} from "rxjs";
import {Injectable} from "@angular/core";
import {LocalstorageService} from "./localstorage.service";
import {catchError, map, switchMap, tap} from "rxjs/operators";
import {environment} from "../../../environments/environment";
import {Router} from "@angular/router";

@Injectable({providedIn: "root"})
export class AuthInterceptor implements HttpInterceptor {
  private isRefreshingToken: boolean;
  private refreshUrl = `${environment.baseUrl}/auth/refreshtoken`;


  constructor(private localstorage: LocalstorageService, private httpClient: HttpClient, private router: Router) {
  }


  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    req = req.clone({
      headers: req.headers.set("authorization", `Bearer ${this.localstorage.getAccessKey()}`).set("Mail-Password-Key", this.localstorage.getPasswordKey())
    });

    return next.handle(req)
      .pipe(
        catchError(err => {
          if (err.status === 401 && !this.isRefreshingToken) {
            this.isRefreshingToken = true;
            return this.refreshToken()
              .pipe(
                tap(() => this.isRefreshingToken = false),
                switchMap(() => next.handle(req)),
              );
          }
          return throwError(err);
        })
      );
  }

  refreshToken() {
    return this.httpClient.post<{ access_token: string, refresh_token: string, key: string }>(this.refreshUrl, {refresh_token: this.localstorage.getRefreshKey()})
      .pipe(
        tap(resp => this.localstorage.setKeys(resp.access_token, resp.refresh_token)),
        map(() => {
        }));
  }

}
