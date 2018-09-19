import {Component, OnInit} from "@angular/core";
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {DefaultServerService} from "./default-server.service";
import {IMailAccount} from "../../Domain/IAccount";
import {UserService} from "../api/user.service";
import {Router} from "@angular/router";

@Component({
  selector: "app-add-account",
  templateUrl: "./add-account.component.html",
  styleUrls: ["./add-account.component.css"]
})
export class AddAccountComponent implements OnInit {
  // Different stages in the completion process.
  public stage = 0;
  private outAcc = {server: null, email: null, password: null} as IMailAccount;
  private inAcc = {server: null, email: null, password: null} as IMailAccount;

  constructor(public activeModal: NgbActiveModal,
              private servers: DefaultServerService,
              private user: UserService,
              private router: Router) { }

  ngOnInit() {
  }

  nextServer(pick: string) {
    if (pick === "other") {
      this.stage += 1;
    } else {
      this.outAcc.server = this.servers.get("out", pick);
      this.inAcc.server = this.servers.get("in", pick);
      this.stage += 2;
    }
  }



  backToStage(stage: number) {
    this.stage = stage;
  }

  toAdd(email: string, password: string) {
    this.outAcc.email = email;
    this.inAcc.email = email;
    this.outAcc.password = password;
    this.inAcc.password = password;
    this.addAccounts();
  }

  addAccounts() {
    this.user.addAccount(this.outAcc).subscribe(x => {
      if (x) {
        this.activeModal.close();
        this.user.getUser();
      }
    });
  }
}
