import {Component, OnInit} from "@angular/core";
import {Observable, of} from "rxjs";
import {IMail, mailComparator} from "../../../Domain/IMail";
import {map} from "rxjs/internal/operators";
import {ActivatedRoute, Router} from "@angular/router";
import {MailDataService} from "../../../Infrastructure/data/mail-data.service";

@Component({
  selector: "app-listing",
  templateUrl: "./listing.component.html",
  styleUrls: ["./listing.component.css"]
})
export class ListingComponent implements OnInit {

  public mails: Observable<IMail[]> = of([]);

  private account: string;
  private mailbox: string;

  constructor(private mail: MailDataService, private route: ActivatedRoute, private router: Router) {

  }

  ngOnInit() {
    this.route.params.subscribe(sel => {
      if (!sel.box) {
        this.mails = of([]);
        return;
      }
      this.account = sel.acc;
      this.mailbox = sel.box;
      this.refresh();
    });
  }

  displayMail(mail: IMail) {
    this.router.navigateByUrl(`mail/${mail.recip}/${mail.mailbox}/${mail.mailid}`);
  }

  private refresh() {
    this.mails = this.mail.getMailForBox(this.account, this.mailbox).pipe(
      map(mails => Object.values(mails)),
      map(mails => mails.sort(mailComparator))
    );
  }

  private nextPage() {

  }
}
