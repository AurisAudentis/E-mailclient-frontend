import {Component, Input, OnInit} from "@angular/core";
import {IMail} from "../../../Domain/IMail";
import {ActivatedRoute} from "@angular/router";
import {MailDataService} from "../../../Infrastructure/data/mail-data.service";
import {DomSanitizer} from "@angular/platform-browser";

@Component({
  selector: 'app-mail-renderer',
  templateUrl: './mail-renderer.component.html',
  styleUrls: ['./mail-renderer.component.css']
})
export class MailRendererComponent implements OnInit {
  @Input() mail: IMail;

  constructor(private route: ActivatedRoute, private mailService: MailDataService,private sanitizer: DomSanitizer) {
  }

  ngOnInit() {
  }

  public transformToUntrustedHTML(mail: IMail) {
    return (mail.email.message.replace(/<style>(.|[\n\r])*<\/style>/,""));
  }

  public transformToTrustedHTML(mail: IMail) {
    return this.sanitizer.bypassSecurityTrustHtml((mail.email.message));
  }

}
