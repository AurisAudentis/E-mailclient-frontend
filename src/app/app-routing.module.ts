import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {LoginComponent} from "./Auth/login/login.component";
import {MailboxComponent} from "./Pages/mailbox/mailbox.component";
import {AuthGuardService} from "./Auth/auth-guard.service";
import {MailpageComponent} from "./Pages/mailpage/mailpage.component";

const routes: Routes = [
  {path: "login", component: LoginComponent },
  {path: "", canActivate: [AuthGuardService], component: MailboxComponent, pathMatch: "full" },
  {path: "mailbox/:acc/:box", canActivate: [AuthGuardService], component: MailboxComponent },
  {path: "mail/:acc/:box/:uid", canActivate: [AuthGuardService], component: MailpageComponent },
];



@NgModule({
  imports: [ RouterModule.forRoot(routes), ],
  exports: [ RouterModule, ],
})
export class AppRoutingModule {
  constructor() {

  }
}
