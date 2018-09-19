import {Injectable} from "@angular/core";
import {IUser} from "../../Domain/IUser";
import {HttpClient} from "@angular/common/http";
import {catchError, map, tap} from "rxjs/internal/operators";
import {Observable} from "rxjs";
import {ReplaySubject} from "rxjs/internal/ReplaySubject";
import {of} from "rxjs/internal/observable/of";
import {IMailAccount} from "../../Domain/IAccount";
import {environment} from "../../../environments/environment";
import {LocalstorageService} from "./localstorage.service";


@Injectable({
  providedIn: "root"
})
export class UserService {
  private loginUrl = `${environment.baseUrl}/auth/login`;
  private userUrl = `${environment.baseUrl}/user`;
  private addAccountUrl = `${environment.baseUrl}/user/addAccount`;
  private boxesUrl = `${environment.baseUrl}/user/{hold}/boxes`;


  private user = new ReplaySubject<IUser>(1);

  constructor(private httpClient: HttpClient, private localstorage: LocalstorageService) {
    this.getUser();
  }

  public getCurrentUser(): Observable<IUser> {
    return this.user;
  }

  // This function posts a login request to server, and gets the user object back.
  login(email: string, password: string): Observable<void> {
    return this.httpClient.post<{access_token: string, refresh_token: string, key: string}>(this.loginUrl, { username: email, password })
      .pipe(
        tap(resp => this.localstorage.setKeys(resp.access_token, resp.refresh_token, resp.key)),
        map(() => {}),
        tap(() => this.getUser())
      )
  }

  // This function fetches the current user from the server.
  public getUser() {
    this.httpClient.get<IUser>(this.userUrl)
      .pipe(catchError(() => of(null)))
      .subscribe((user) => {
        if (user) {
          this.user.next(user);
        } else {
          this.user.next(null);
        }
    });
  }

  logout(): void {
    this.user.next(null);
    this.localstorage.setRefreshKey(null);
    this.localstorage.setAccessKey(null);
    this.localstorage.setPasswordKey(null);
  }

  addAccount(acc: IMailAccount): Observable<boolean> {
    return this.httpClient.post(this.addAccountUrl, acc)
      .pipe(
        catchError(() => of(false)),
        map(() => true)
      );
  }

}
