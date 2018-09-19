import {Component, OnInit} from "@angular/core";
import {filter, switchMap} from "rxjs/operators";
import {ActivatedRoute} from "@angular/router";
import {MailDataService} from "../../Infrastructure/data/mail-data.service";
import {Observable} from "rxjs";
import {IMail} from "../../Domain/IMail";

@Component({
  selector: "app-mailpage",
  templateUrl: "./mailpage.component.html",
  styleUrls: ["./mailpage.component.css"]
})
export class MailpageComponent implements OnInit {
  public mail$: Observable<IMail>;
  constructor(route: ActivatedRoute, mailService: MailDataService) {
    this.mail$ = route.params.pipe(
      switchMap(params => mailService.getMailByUid(params.acc, params.box, params.uid)),
      filter(value => !!value),
    )
  }
  ngOnInit() {}
}
