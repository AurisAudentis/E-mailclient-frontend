import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { NgbModule} from "@ng-bootstrap/ng-bootstrap";

import { AppComponent } from "./app.component";
import { NavComponent } from "./Pages/mailbox/nav/nav.component";
import { LoginComponent } from "./Auth/login/login.component";
import {AppRoutingModule} from "./app-routing.module";
import {FormsModule} from "@angular/forms";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import { MailboxComponent } from "./Pages/mailbox/mailbox.component";
import { SidebarComponent } from "./Pages/mailbox/sidebar/sidebar.component";
import { AddAccountComponent } from "./Infrastructure/add-account/add-account.component";
import { ListingComponent } from "./Pages/mailbox/listing/listing.component";
import { ListingItemComponent } from "./Pages/mailbox/listing/listing-item/listing-item.component";
import { FromnamePipe } from "./Infrastructure/directives/pipes/fromname.pipe";
import { MailpageComponent } from "./Pages/mailpage/mailpage.component";
import {AuthInterceptor} from "./Infrastructure/api/auth-interceptor";
import {UserService} from "./Infrastructure/api/user.service";
import { MailRendererComponent } from './Pages/mailpage/mail-renderer/mail-renderer.component';
import { MailWrapperPageComponent } from './Pages/mailpage/mail-wrapper-page/mail-wrapper-page.component';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    LoginComponent,
    MailboxComponent,
    SidebarComponent,
    AddAccountComponent,
    ListingComponent,
    ListingItemComponent,
    FromnamePipe,
    MailpageComponent,
    MailRendererComponent,
    MailWrapperPageComponent,
  ],
  imports: [
    BrowserModule,
    NgbModule.forRoot(),
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    UserService
  ],
  entryComponents: [
    AddAccountComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
