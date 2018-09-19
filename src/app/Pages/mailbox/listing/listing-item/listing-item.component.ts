import {Component, Input, OnInit} from "@angular/core";
import {IMail} from "../../../../Domain/IMail";

@Component({
  selector: "app-listing-item",
  templateUrl: "./listing-item.component.html",
  styleUrls: ["./listing-item.component.css"]
})
export class ListingItemComponent implements OnInit {
  @Input() public mail: IMail;

  constructor() { }

  ngOnInit() {

  }

}
