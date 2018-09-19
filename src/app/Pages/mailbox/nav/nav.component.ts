import { Component, OnInit } from '@angular/core';
import {UserService} from "../../../Infrastructure/api/user.service";

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {


  constructor(public user: UserService) { }

  ngOnInit() {
  }

}
