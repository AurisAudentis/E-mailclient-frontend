import {Component, OnInit} from "@angular/core";
import {UserService} from "../../../Infrastructure/api/user.service";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {AddAccountComponent} from "../../../Infrastructure/add-account/add-account.component";
import {MailHttpService} from "../../../Infrastructure/api/mail-http.service";
import {Router} from "@angular/router";

@Component({
  selector: "app-sidebar",
  templateUrl: "./sidebar.component.html",
  styleUrls: ["./sidebar.component.css"]
})
export class SidebarComponent implements OnInit {
  public accounts: string[] = [];
  public collapsed = {};
  public accountToBox = {};


  constructor(private user: UserService,
              private mail: MailHttpService,
              private modalService: NgbModal,
              private router: Router
  ) {
  }

  ngOnInit() {
    this.user.getCurrentUser()
      .subscribe(x => {
        this.accounts = x.accounts.map(y => y.email);
        this.accounts.forEach(y => this.collapsed[y] = true);
        x.accounts.forEach(acc => this.accountToBox[acc.email] = acc.boxes);

        if (this.accounts.length > 0) {
          //this.selectBox(this.accounts[0], "INBOX");
          this.collapsed[this.accounts[0]] = false;
        }
      });
  }

  select(acc) {
    this.collapsed[acc] = !this.collapsed[acc];
  }

  selectBox(acc: string, box: string) {
    console.log("what");
    this.router.navigateByUrl("/mailbox/{1}/{2}".replace("{1}", acc).replace("{2}", box));
  }

  addAccount() {
    const modalRef = this.modalService.open(AddAccountComponent);
    modalRef.componentInstance.name = "add account";
  }


}
