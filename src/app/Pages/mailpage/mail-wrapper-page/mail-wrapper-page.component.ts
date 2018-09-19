import {Component, Input, OnInit} from "@angular/core";
import {IMail} from "../../../Domain/IMail";

@Component({
  selector: 'app-mail-wrapper-page',
  templateUrl: './mail-wrapper-page.component.html',
  styleUrls: ['./mail-wrapper-page.component.css']
})
export class MailWrapperPageComponent implements OnInit {

  @Input() mail: IMail;

  constructor() { }

  ngOnInit() {
  }

}
