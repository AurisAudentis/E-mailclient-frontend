import {Component, OnInit} from "@angular/core";
import {UserService} from "../../Infrastructure/api/user.service";

@Component({
  selector: "app-mailbox",
  templateUrl: "./mailbox.component.html",
  styleUrls: ["./mailbox.component.css"]
})
export class MailboxComponent implements OnInit {

  constructor(public user: UserService) {}

  ngOnInit() {
  }

}
