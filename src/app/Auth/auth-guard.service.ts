import {Injectable} from "@angular/core";
import {CanActivate, Router} from "@angular/router";
import {UserService} from "../Infrastructure/api/user.service";
import {map, tap} from "rxjs/operators";


@Injectable({
  providedIn: "root"
})

export class AuthGuardService implements CanActivate {

  constructor(private user: UserService,
              private router: Router) {
  }

  // Guard for user validation: if illegal, redirect to login
  canActivate() {
    return this.user.getCurrentUser().pipe(
      map((x) => !!x),
      tap((x) => {if (!x) {this.router.navigateByUrl("/login"); }}),
    );
  }

}
