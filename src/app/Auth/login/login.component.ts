import {Component, OnInit} from "@angular/core";
import {Router} from "@angular/router";
import {UserService} from "../../Infrastructure/api/user.service";
import {Subscription} from "rxjs/index";
import {filter, take, tap} from "rxjs/operators";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})
export class LoginComponent implements OnInit {
  email: string;
  password: string;
  message: string;
  private subscr: Subscription;

  constructor( private router: Router, private user: UserService) {
  }

  ngOnInit() {
    this.user.logout();
    this.subscr = this.user.getCurrentUser()
      .pipe(
        filter(user => !!user),
        take(1)
        )
      .subscribe(user => {if (user) this.router.navigateByUrl('/')})
  }

  ngOnDestroy() {
    this.subscr.unsubscribe();
  }

  // On submit, send a login request to the server
  loginAttempt(email: string, password: string) {
    this.user.login(email, password).subscribe((res) => {}, (err) => this.message = err);
  }
}
